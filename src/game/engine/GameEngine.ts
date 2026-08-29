import { BubbleEntity } from '../entities/Bubble';
import {
  W, H, BUBBLE_RADIUS, HEX_COLS, DIA, ROW_H,
  MAX_GRID_ROWS, ARENA_MARGIN_TOP,
  COLLISION_THRESHOLD, ADJACENT_THRESHOLD, OCCUPANCY_THRESHOLD,
  LANDING_SNAP_THRESHOLD, CANNON_Y, CANNON_CENTER_X, DEATH_LINE_Y,
  CANNON_BARREL_LENGTH, BULLET_SPEED, ARENA_ROW_DROP_INTERVAL,
  SCORE_BASE, NEXT_LEVEL_DELAY, FALLING_DAMPING, FALLING_GRAVITY,
  mkParticles, type Particle, type FloatingText,
} from '../constants/GameConstants';
import { getLevelConfig, type GameMode } from '../constants/LevelConstants';
import { checkReactionForMode, getProductForMode, getRandomFromList } from './ChemistryLogic';

export interface GameState {
  score: number;
  combo: number;
  level: number;
  mode: GameMode;
  currentAmmo: string;
  nextAmmoQueue: string[];
  gameOver: boolean;
  levelComplete: boolean;
  paused: boolean;
}

export type GameEvent =
  | { type: 'SCORE'; points: number }
  | { type: 'COMBO'; val: number }
  | { type: 'GAME_OVER' }
  | { type: 'LEVEL_COMPLETE' }
  | { type: 'AMMO_UPDATE'; cur: string; queue: string[] }
  | { type: 'STATE_UPDATE'; state: GameState }
  | { type: 'FIRE' }
  | { type: 'LAND' }
  | { type: 'POP' };

type EventListener = (e: GameEvent) => void;

function isAdjacent(ax: number, ay: number, bx: number, by: number): boolean {
  return Math.hypot(ax - bx, ay - by) < DIA * ADJACENT_THRESHOLD;
}

export class GameEngine {
  private bubbles: BubbleEntity[] = [];
  private particles: Particle[] = [];
  private floatingTexts: FloatingText[] = [];

  private isFiring = false;
  private isTransitioning = false;
  private dropCount = 0;
  private lastDropTime = 0;

  private state: GameState;
  private listeners: EventListener[] = [];
  private gridCache = new Map<number, { x: number; y: number }[]>();

  constructor(mode: GameMode, level: number) {
    const levelCfg = getLevelConfig(mode, level);
    const firstAmmo = getRandomFromList(levelCfg.chemicals);
    this.state = {
      score: 0, combo: 0, level, mode,
      currentAmmo: firstAmmo,
      nextAmmoQueue: [getRandomFromList(levelCfg.chemicals), getRandomFromList(levelCfg.chemicals)],
      gameOver: false, levelComplete: false, paused: false,
    };
  }

  on(fn: EventListener) { this.listeners.push(fn); }
  off(fn: EventListener) { this.listeners = this.listeners.filter(l => l !== fn); }
  private emit(e: GameEvent) { this.listeners.forEach(l => l(e)); }

  getState(): GameState { return { ...this.state }; }
  getBubbles(): BubbleEntity[] { return this.bubbles; }
  getParticles(): Particle[] { return this.particles; }
  getFloatingTexts(): FloatingText[] { return this.floatingTexts; }

  private getGridSlots(drops: number): { x: number; y: number }[] {
    if (this.gridCache.has(drops)) return this.gridCache.get(drops)!;
    const out: { x: number; y: number }[] = [];
    const gridWidth = (HEX_COLS - 1) * DIA + BUBBLE_RADIUS * 2;
    const marginX = (W - gridWidth) / 2;
    for (let i = 0; i < MAX_GRID_ROWS; i++) {
      const odd = Math.abs(i - drops) % 2 === 1;
      const sx = marginX + BUBBLE_RADIUS + (odd ? DIA / 2 : 0);
      const cols = odd ? HEX_COLS - 1 : HEX_COLS;
      const y = ARENA_MARGIN_TOP + i * ROW_H;
      for (let c = 0; c < cols; c++) out.push({ x: sx + c * DIA, y });
    }
    this.gridCache.set(drops, out);
    return out;
  }

  init() {
    this.bubbles = [];
    this.particles = [];
    this.floatingTexts = [];
    this.isFiring = false;
    this.isTransitioning = false;
    this.dropCount = 0;
    this.lastDropTime = performance.now();
    this.gridCache.clear();

    const levelCfg = getLevelConfig(this.state.mode, this.state.level);
    const slots = this.getGridSlots(0).slice(0, HEX_COLS * levelCfg.rows);
    slots.forEach(p => this.bubbles.push(new BubbleEntity(p.x, p.y, getRandomFromList(levelCfg.chemicals), true)));

    const firstAmmo = getRandomFromList(levelCfg.chemicals);
    this.state = {
      ...this.state, score: 0, combo: 0,
      currentAmmo: firstAmmo,
      nextAmmoQueue: [getRandomFromList(levelCfg.chemicals), getRandomFromList(levelCfg.chemicals)],
      gameOver: false, levelComplete: false,
    };
    this.emit({ type: 'STATE_UPDATE', state: this.getState() });
  }

  fire(angle: number) {
    if (this.isFiring || this.state.gameOver || this.state.paused) return;
    this.isFiring = true;
    this.emit({ type: 'FIRE' });

    const levelCfg = getLevelConfig(this.state.mode, this.state.level);
    const startX = CANNON_CENTER_X + Math.cos(angle) * CANNON_BARREL_LENGTH;
    const startY = CANNON_Y + Math.sin(angle) * CANNON_BARREL_LENGTH;
    const b = new BubbleEntity(startX, startY, this.state.currentAmmo, false);
    b.vx = Math.cos(angle) * BULLET_SPEED;
    b.vy = Math.sin(angle) * BULLET_SPEED;
    this.bubbles.push(b);

    // Update ammo
    const newQueue = [...this.state.nextAmmoQueue];
    const nextCur = newQueue.shift() || getRandomFromList(levelCfg.chemicals);
    newQueue.push(getRandomFromList(levelCfg.chemicals));
    this.state.currentAmmo = nextCur;
    this.state.nextAmmoQueue = newQueue;
    this.emit({ type: 'AMMO_UPDATE', cur: nextCur, queue: newQueue });
  }

  update(now: number) {
    if (this.state.gameOver || this.state.levelComplete || this.state.paused) return;

    const firedBubble = this.bubbles.find(b => !b.isStatic && !b.isFalling);

    if (firedBubble) {
      // Wall bounce
      if (firedBubble.x < BUBBLE_RADIUS) { firedBubble.x = BUBBLE_RADIUS; firedBubble.vx = Math.abs(firedBubble.vx); }
      if (firedBubble.x > W - BUBBLE_RADIUS) { firedBubble.x = W - BUBBLE_RADIUS; firedBubble.vx = -Math.abs(firedBubble.vx); }
      firedBubble.x += firedBubble.vx;
      firedBubble.y += firedBubble.vy;

      const statics = this.bubbles.filter(b => b.isStatic);
      const marginTop = ARENA_MARGIN_TOP;
      const tooHigh = firedBubble.y - BUBBLE_RADIUS < marginTop;
      const colliding = statics.some(b => Math.hypot(firedBubble.x - b.x, firedBubble.y - b.y) < DIA * COLLISION_THRESHOLD);

      if (tooHigh || colliding) {
        this.landBubble(firedBubble);
      }
    }

    // Falling bubbles
    for (let i = this.bubbles.length - 1; i >= 0; i--) {
      const b = this.bubbles[i];
      if (!b.isFalling) continue;
      b.updateFalling(FALLING_GRAVITY, FALLING_DAMPING);
      if (b.y > H + 60) this.bubbles.splice(i, 1);
    }

    // Particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx; p.y += p.vy; p.vy += 0.12; p.opacity -= 0.025; p.life -= 1;
      if (p.life <= 0 || p.opacity <= 0) this.particles.splice(i, 1);
    }

    // Floating texts
    for (let i = this.floatingTexts.length - 1; i >= 0; i--) {
      const ft = this.floatingTexts[i];
      if (ft.direction === 'down') ft.y += ft.vy; else ft.y -= ft.vy;
      ft.opacity -= 0.016;
      if (ft.opacity <= 0) this.floatingTexts.splice(i, 1);
    }

    // Game over check (only when not firing)
    if (!this.isFiring && !this.isTransitioning) {
      const statics = this.bubbles.filter(b => b.isStatic);
      
      const isOver = statics.some(b => {
        return (b.y + BUBBLE_RADIUS) >= DEATH_LINE_Y;
      });
      if (isOver) {
        this.state.gameOver = true;
        this.emit({ type: 'GAME_OVER' });
        this.emit({ type: 'STATE_UPDATE', state: this.getState() });
        return;
      }

      // Row drop timer
      const levelCfg = getLevelConfig(this.state.mode, this.state.level);
      const dropInterval = ARENA_ROW_DROP_INTERVAL / (levelCfg.speedMultiplier || 1);
      if (now - this.lastDropTime > dropInterval) {
        this.lastDropTime = now;
        this.dropRow();
      }
    }
  }

  private landBubble(firedBubble: BubbleEntity) {
    const statics = this.bubbles.filter(b => b !== firedBubble && b.isStatic);
    const currentSlots = this.getGridSlots(this.dropCount);
    const occupied = (slot: { x: number; y: number }) =>
      statics.some(b => Math.hypot(b.x - slot.x, b.y - slot.y) < DIA * OCCUPANCY_THRESHOLD);

    const isTopRow = (y: number) => Math.abs(y - ARENA_MARGIN_TOP) < LANDING_SNAP_THRESHOLD;

    const candidateSlots = currentSlots.filter(s =>
      !occupied(s) && (isTopRow(s.y) || statics.length === 0 || statics.some(b => isAdjacent(s.x, s.y, b.x, b.y)))
    );

    let bestSlot = candidateSlots[0] ?? currentSlots.find(s => !occupied(s)) ?? currentSlots[0];
    let minD = Infinity;
    for (const s of candidateSlots) {
      const d = Math.hypot(s.x - firedBubble.x, s.y - firedBubble.y);
      if (d < minD) { minD = d; bestSlot = s; }
    }

    // Check reactions
    let reacted = false;
    for (const sb of statics) {
      if (!isAdjacent(bestSlot.x, bestSlot.y, sb.x, sb.y)) continue;
      if (!checkReactionForMode(this.state.mode, firedBubble.formula, sb.formula)) continue;

      // Chain reaction with same formula
      const toRemove = new Set<BubbleEntity>([sb]);
      const queue = [sb];
      while (queue.length > 0) {
        const curr = queue.shift()!;
        for (const n of statics) {
          if (!toRemove.has(n) && n.formula === sb.formula && isAdjacent(curr.x, curr.y, n.x, n.y)) {
            toRemove.add(n); queue.push(n);
          }
        }
      }

      // Particles & text
      toRemove.forEach(b => {
        if (this.particles.length < 80) this.particles.push(...mkParticles(b.x, b.y, b.color, b.glowColor));
      });
      if (this.particles.length < 80) this.particles.push(...mkParticles(bestSlot.x, bestSlot.y, firedBubble.color, firedBubble.glowColor));

      const product = getProductForMode(this.state.mode, firedBubble.formula, sb.formula);
      if (product) {
        this.floatingTexts.push({
          id: Math.random().toString(), x: bestSlot.x, y: bestSlot.y,
          text: product.text, color: product.color, opacity: 1,
          vy: 1.5 + Math.random(), direction: product.text.includes('↓') ? 'down' : 'up',
        });
      }

      // Remove reacted bubbles + fired
      this.bubbles = this.bubbles.filter(b => b !== firedBubble && !toRemove.has(b));

      // Update score
      const combo = this.state.combo + 1;
      const pts = SCORE_BASE * toRemove.size * combo;
      this.state.score += pts;
      this.state.combo = combo;
      this.emit({ type: 'SCORE', points: pts });
      this.emit({ type: 'COMBO', val: combo });
      this.emit({ type: 'POP' });

      // Cascade: drop unconnected bubbles
      this.dropOrphans();

      reacted = true;
      break;
    }

    if (!reacted) {
      // Snap into grid
      firedBubble.x = bestSlot.x;
      firedBubble.y = bestSlot.y;
      firedBubble.vx = 0; firedBubble.vy = 0;
      firedBubble.isStatic = true;
      firedBubble.isFired = false;
      this.state.combo = 0;
      this.emit({ type: 'LAND' });
    }

    // Level complete check
    const levelCfg = getLevelConfig(this.state.mode, this.state.level);
    const staticCount = this.bubbles.filter(b => b.isStatic).length;
    const isEndless = levelCfg.targetScore === Infinity;
    if (!this.isTransitioning && !isEndless && (this.state.score >= levelCfg.targetScore || staticCount === 0)) {
      this.isTransitioning = true;
      setTimeout(() => {
        this.state.levelComplete = true;
        this.emit({ type: 'LEVEL_COMPLETE' });
        this.emit({ type: 'STATE_UPDATE', state: this.getState() });
      }, NEXT_LEVEL_DELAY);
    }

    this.isFiring = false;
    this.emit({ type: 'STATE_UPDATE', state: this.getState() });
  }

  private dropOrphans() {
    const statics = this.bubbles.filter(b => b.isStatic);
    if (statics.length === 0) return;

    const ceilingY = ARENA_MARGIN_TOP + 10;
    const connected = new Set<BubbleEntity>();
    const queue: BubbleEntity[] = statics.filter(b => b.y <= ceilingY);
    queue.forEach(b => connected.add(b));
    while (queue.length > 0) {
      const curr = queue.shift()!;
      for (const n of statics) {
        if (!connected.has(n) && isAdjacent(curr.x, curr.y, n.x, n.y)) {
          connected.add(n); queue.push(n);
        }
      }
    }
    statics.forEach(b => {
      if (!connected.has(b)) {
        b.isFalling = true;
        b.isStatic = false;
        b.vx = (Math.random() - 0.5) * 2;
        b.vy = 8;
        if (this.particles.length < 80) this.particles.push(...mkParticles(b.x, b.y, b.color, b.glowColor));
      }
    });
  }

  private dropRow() {
    this.dropCount++;
    const levelCfg = getLevelConfig(this.state.mode, this.state.level);
    // Shift all statics down
    this.bubbles.filter(b => b.isStatic).forEach(b => { b.y += ROW_H; });
    // Add new row at top
    const slots = this.getGridSlots(this.dropCount);
    const odd = Math.abs(-this.dropCount) % 2 === 1;
    const cols = odd ? HEX_COLS - 1 : HEX_COLS;
    for (let c = 0; c < cols; c++) {
      const p = slots[c];
      this.bubbles.push(new BubbleEntity(p.x, p.y, getRandomFromList(levelCfg.chemicals), true));
    }
  }

  nextLevel() {
    this.state.level += 1;
    this.state.levelComplete = false;
    this.isTransitioning = false;
    this.init();
  }

  restart() {
    this.state.gameOver = false;
    this.state.levelComplete = false;
    this.isTransitioning = false;
    this.init();
  }

  setPaused(paused: boolean) {
    this.state.paused = paused;
    this.emit({ type: 'STATE_UPDATE', state: this.getState() });
  }
}
