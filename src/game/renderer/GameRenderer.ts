import { GameEngine } from '../engine/GameEngine';

import {
  W, H, CANNON_CENTER_X, CANNON_Y,
  CANNON_BARREL_LENGTH, BUBBLE_RADIUS,
  AIM_ANGLE_LIMIT_MIN, AIM_ANGLE_LIMIT_MAX,
  GUIDE_LENGTH, GUIDE_BOUNCES,
  type Particle, type FloatingText,
} from '../constants/GameConstants';
import { CHEMICALS } from '../constants/ChemicalConstants';
import { lighten } from '../constants/GameConstants';
import { useEffect, useRef, useCallback } from 'react';

// ─── Background ───────────────────────────────────────────────────────────────
export function drawBackground(ctx: CanvasRenderingContext2D) {
  const grd = ctx.createLinearGradient(0, 0, 0, H);
  grd.addColorStop(0,   '#020814');
  grd.addColorStop(0.5, '#0f172a');
  grd.addColorStop(1,   '#020617');
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, W, H);

  // Static stars (deterministic, no random each frame)
  ctx.fillStyle = 'rgba(255,255,255,0.14)';
  for (let i = 0; i < 60; i++) {
    const sx = (i * 137.508) % W;
    const sy = (i * 97.333) % (H * 0.78);
    ctx.beginPath();
    ctx.arc(sx, sy, i % 9 === 0 ? 1.2 : 0.7, 0, Math.PI * 2);
    ctx.fill();
  }

  // Death line
  const deathY = CANNON_Y - BUBBLE_RADIUS * 4.5;
  ctx.save();
  ctx.setLineDash([8, 8]);
  ctx.strokeStyle = 'rgba(239,68,68,0.32)';
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(0, deathY); ctx.lineTo(W, deathY); ctx.stroke();
  ctx.setLineDash([]);
  ctx.restore();
}

// ─── Aim Guide ────────────────────────────────────────────────────────────────
export function drawGuide(ctx: CanvasRenderingContext2D, angle: number) {
  const sx = CANNON_CENTER_X + Math.cos(angle) * (CANNON_BARREL_LENGTH + 4);
  const sy = CANNON_Y        + Math.sin(angle) * (CANNON_BARREL_LENGTH + 4);
  let cx = sx, cy = sy, vx = Math.cos(angle), vy = Math.sin(angle);
  let rem = GUIDE_LENGTH, bounces = 0;

  ctx.save();
  ctx.setLineDash([4, 14]);
  ctx.strokeStyle = 'rgba(96,165,250,0.5)';
  ctx.lineWidth = 2;
  ctx.shadowColor = '#60a5fa'; ctx.shadowBlur = 5;
  ctx.beginPath(); ctx.moveTo(cx, cy);

  while (rem > 0 && bounces <= GUIDE_BOUNCES) {
    const tW = vx > 0 ? (W - BUBBLE_RADIUS - cx) / vx : vx < 0 ? (BUBBLE_RADIUS - cx) / vx : Infinity;
    const tT = vy < 0 ? (BUBBLE_RADIUS + 56 - cy) / vy : Infinity;
    const t  = Math.min(tW, tT, rem);
    cx += vx * t; cy += vy * t;
    ctx.lineTo(cx, cy);
    rem -= t;
    if (t === tW && rem > 0) { vx = -vx; bounces++; } else break;
  }
  ctx.stroke(); ctx.restore();
}

// ─── Cannon ───────────────────────────────────────────────────────────────────
export function drawCannon(ctx: CanvasRenderingContext2D, angle: number, ammoFormula: string) {
  const cx = CANNON_CENTER_X, cy = CANNON_Y;
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(angle + Math.PI / 2);

  // Base mount
  const mg = ctx.createLinearGradient(-42, 0, 42, 0);
  mg.addColorStop(0, '#1e3a5f'); mg.addColorStop(0.5, '#2d5d8f'); mg.addColorStop(1, '#1e3a5f');
  ctx.beginPath(); ctx.ellipse(0, 14, 42, 18, 0, 0, Math.PI * 2);
  ctx.fillStyle = mg; ctx.fill();
  ctx.strokeStyle = '#4a90d9'; ctx.lineWidth = 1.5; ctx.stroke();

  // Barrel
  const bg = ctx.createLinearGradient(-18, -100, 18, -100);
  bg.addColorStop(0, '#1a2a4a'); bg.addColorStop(0.5, '#2a5080'); bg.addColorStop(1, '#1a2a4a');
  ctx.beginPath(); ctx.roundRect(-18, -112, 36, 102, [6, 6, 0, 0]);
  ctx.fillStyle = bg; ctx.fill();
  ctx.strokeStyle = '#4a90d9AA'; ctx.lineWidth = 1; ctx.stroke();

  // Inner bore
  ctx.beginPath(); ctx.roundRect(-11, -110, 22, 98, [4, 4, 0, 0]);
  ctx.fillStyle = '#0d1b2e'; ctx.fill();

  ctx.restore();

  // Current ammo in barrel tip
  const chem = CHEMICALS[ammoFormula];
  if (chem) {
    const ax = cx + Math.cos(angle) * (CANNON_BARREL_LENGTH - BUBBLE_RADIUS - 2);
    const ay = cy + Math.sin(angle) * (CANNON_BARREL_LENGTH - BUBBLE_RADIUS - 2);
    const r  = BUBBLE_RADIUS * 0.88;
    const grd = ctx.createRadialGradient(ax - r * 0.25, ay - r * 0.25, r * 0.05, ax, ay, r);
    grd.addColorStop(0, lighten(chem.color, 60)); grd.addColorStop(1, chem.color + 'CC');
    ctx.beginPath(); ctx.arc(ax, ay, r, 0, Math.PI * 2);
    ctx.fillStyle = grd; ctx.fill();
    ctx.strokeStyle = chem.glowColor + 'AA'; ctx.lineWidth = 1.5; ctx.stroke();
    // symbol
    const sym = chem.symbol;
    const fs  = sym.length > 5 ? 8 : sym.length > 3 ? r * 0.52 : r * 0.62;
    ctx.font = `bold ${Math.max(8, fs)}px "Segoe UI", Arial`;
    ctx.fillStyle = chem.textColor; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(sym, ax, ay + 0.5);
  }
}

// ─── HUD ─────────────────────────────────────────────────────────────────────
const MODE_COLORS: Record<string, string> = { ion:'#e63946', metal:'#f59e0b', organic:'#10b981', nonmetal:'#8ac926' };

export function drawHUD(
  ctx: CanvasRenderingContext2D,
  score: number, combo: number, level: number, mode: string, nextQueue: string[],
) {
  ctx.save();

  // ─── Top Bar ───
  const tg = ctx.createLinearGradient(0, 0, 0, 70);
  tg.addColorStop(0, 'rgba(5,8,20,0.95)'); tg.addColorStop(1, 'rgba(5,8,20,0.0)');
  ctx.fillStyle = tg; ctx.fillRect(0, 0, W, 70);

  const ac = MODE_COLORS[mode] ?? '#60a5fa';

  // Level
  ctx.textBaseline = 'top';
  ctx.font = 'bold 11px "Segoe UI", Arial'; ctx.fillStyle = '#64748b'; ctx.textAlign = 'left';
  ctx.fillText('LEVEL', 20, 12);
  ctx.font = 'bold 26px "Segoe UI", Arial'; ctx.fillStyle = '#f0f9ff';
  ctx.fillText(`${level}`, 20, 24);

  // Mode badge
  ctx.font = 'bold 12px "Segoe UI", Arial'; ctx.fillStyle = ac; ctx.textAlign = 'center';
  ctx.fillText(mode.toUpperCase(), W / 2, 12);

  // Score
  ctx.font = 'bold 11px "Segoe UI", Arial'; ctx.fillStyle = '#64748b'; ctx.textAlign = 'right';
  ctx.fillText('SCORE', W - 20, 12);
  ctx.font = 'bold 26px "Segoe UI", Arial'; ctx.fillStyle = '#fbbf24';
  ctx.fillText(score.toLocaleString(), W - 20, 24);

  // ─── Bottom HUD ───
  const bg = ctx.createLinearGradient(0, H - 140, 0, H);
  bg.addColorStop(0, 'rgba(2,8,20,0)'); bg.addColorStop(0.4, 'rgba(2,8,20,0.88)'); bg.addColorStop(1, 'rgba(2,8,20,1)');
  ctx.fillStyle = bg; ctx.fillRect(0, H - 140, W, 140);

  // Combo
  if (combo > 1) {
    const bx = W / 2, by = CANNON_Y - 95;
    ctx.beginPath(); ctx.roundRect(bx - 48, by - 15, 96, 30, 15);
    ctx.fillStyle = 'rgba(251,191,36,0.18)'; ctx.fill();
    ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.font = 'bold 14px "Segoe UI", Arial'; ctx.fillStyle = '#fbbf24';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(`✦ ×${combo} COMBO`, bx, by);
  }

  // Next ammo panel (Right side)
  const panelX = W - 110;
  const panelY = CANNON_Y - 28;
  ctx.beginPath(); ctx.roundRect(panelX, panelY, 90, 56, 12);
  ctx.fillStyle = 'rgba(15,23,42,0.85)'; ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,0.1)'; ctx.lineWidth = 1.5; ctx.stroke();
  
  ctx.font = 'bold 10px "Segoe UI", Arial';
  ctx.fillStyle = '#64748b'; ctx.textAlign = 'center'; ctx.textBaseline = 'top';
  ctx.fillText('NEXT', panelX + 45, panelY + 6);

  nextQueue.slice(0, 2).forEach((formula, i) => {
    const chem = CHEMICALS[formula]; if (!chem) return;
    const nx = panelX + 30 + i * 36;
    const ny = panelY + 32;
    const r  = 16 - i * 3;
    const grd = ctx.createRadialGradient(nx - r * 0.25, ny - r * 0.25, r * 0.05, nx, ny, r);
    grd.addColorStop(0, lighten(chem.color, 50)); grd.addColorStop(1, chem.color + 'BB');
    ctx.beginPath(); ctx.arc(nx, ny, r, 0, Math.PI * 2);
    ctx.fillStyle = grd; ctx.fill();
    ctx.strokeStyle = chem.glowColor + '88'; ctx.lineWidth = 1; ctx.stroke();
    ctx.font = `bold ${chem.symbol.length > 4 ? 8 : 10 - i}px "Segoe UI", Arial`;
    ctx.fillStyle = chem.textColor; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(chem.symbol, nx, ny);
  });

  ctx.restore();
}

// ─── Particles & floating texts ───────────────────────────────────────────────
export function drawParticles(ctx: CanvasRenderingContext2D, particles: Particle[]) {
  particles.forEach(p => {
    ctx.save();
    ctx.globalAlpha = p.opacity;
    ctx.shadowColor = p.color; ctx.shadowBlur = 8;
    ctx.beginPath(); ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = p.color; ctx.fill();
    ctx.restore();
  });
}

export function drawFloatingTexts(ctx: CanvasRenderingContext2D, texts: FloatingText[]) {
  texts.forEach(ft => {
    ctx.save();
    ctx.globalAlpha = ft.opacity;
    
    ctx.font = '900 16px "Segoe UI", Arial';
    ctx.textAlign = 'center'; 
    ctx.textBaseline = 'middle';
    
    // Detect if color is too dark for the background
    const isDark = ft.color === '#333333' || ft.color === '#444444' || ft.color === '#555555';

    // 1. Draw heavy shadow / glow
    ctx.shadowColor = isDark ? '#ffffff' : ft.color;
    ctx.shadowBlur = 10;
    
    // 2. Draw thick stroke outline
    ctx.lineJoin = 'round';
    ctx.lineWidth = 4;
    ctx.strokeStyle = isDark ? '#ffffff' : '#0f172a';
    ctx.strokeText(ft.text, ft.x, ft.y);
    
    // 3. Draw the exact original color on top
    ctx.shadowBlur = 0; // Turn off shadow so fill is crisp
    ctx.fillStyle = ft.color; 
    ctx.fillText(ft.text, ft.x, ft.y);
    
    ctx.restore();
  });
}

// ─── Angle helper ─────────────────────────────────────────────────────────────
export function computeAngle(clientX: number, clientY: number): number {
  const dx = clientX - CANNON_CENTER_X;
  const dy = clientY - CANNON_Y;
  let a = Math.atan2(dy, dx);
  return Math.max(AIM_ANGLE_LIMIT_MIN, Math.min(AIM_ANGLE_LIMIT_MAX, a));
}

// ─── Main render loop hook ────────────────────────────────────────────────────
export function useGameCanvas(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  engineRef: React.RefObject<GameEngine | null>,
  getAngle: () => number,
) {
  const frameRef = useRef(0);

  const render = useCallback((now: number) => {
    const canvas = canvasRef.current;
    const engine = engineRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !engine) { frameRef.current = requestAnimationFrame(render); return; }

    engine.update(now);

    ctx.clearRect(0, 0, W, H);
    drawBackground(ctx);

    engine.getBubbles().forEach((b: any) => b.draw(ctx));

    const state = engine.getState();
    if (!state.gameOver && !state.levelComplete && !state.paused) {
      const angle = getAngle();
      drawGuide(ctx, angle);
      drawCannon(ctx, angle, state.currentAmmo);
    }

    drawParticles(ctx, engine.getParticles());
    drawFloatingTexts(ctx, engine.getFloatingTexts());
    drawHUD(ctx, state.score, state.combo, state.level, state.mode, state.nextAmmoQueue);

    frameRef.current = requestAnimationFrame(render);
  }, [canvasRef, engineRef, getAngle]);

  useEffect(() => {
    frameRef.current = requestAnimationFrame(render);
    return () => cancelAnimationFrame(frameRef.current);
  }, [render]);
}
