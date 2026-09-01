export const H = 780;

export const HEX_COLS = 9;
export const BUBBLE_RADIUS = 28;
export const DIA = BUBBLE_RADIUS * 2;
export const W = (HEX_COLS * DIA) + 16;
export const ROW_H = DIA * 0.866; // hex math (sqrt(3)/2 * d)
export const MAX_GRID_ROWS = 25;

export const ARENA_MARGIN_TOP = 80;

export const COLLISION_THRESHOLD = 0.9;
export const ADJACENT_THRESHOLD = 1.1;
export const OCCUPANCY_THRESHOLD = 0.5;
export const LANDING_SNAP_THRESHOLD = 15;

export const CANNON_Y = H - 70;
export const CANNON_CENTER_X = W / 2;
export const CANNON_BARREL_LENGTH = 55;
export const DEATH_LINE_Y = CANNON_Y - BUBBLE_RADIUS * 4.5;

export const AIM_ANGLE_LIMIT_MIN = -Math.PI;
export const AIM_ANGLE_LIMIT_MAX = 0;

export const BULLET_SPEED = 24;
export const FALLING_GRAVITY = 0.4;
export const FALLING_DAMPING = 0.98;

export const ARENA_ROW_DROP_INTERVAL = 15000;
export const SCORE_BASE = 100;
export const NEXT_LEVEL_DELAY = 3000;

export const GUIDE_LENGTH = 400;
export const GUIDE_BOUNCES = 5;

// Color utils for canvas rendering
export function lighten(color: string, amount: number) {
  let hex = color.replace('#', '');
  if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
  let r = parseInt(hex.substring(0, 2), 16) + amount;
  let g = parseInt(hex.substring(2, 4), 16) + amount;
  let b = parseInt(hex.substring(4, 6), 16) + amount;
  r = Math.min(255, Math.max(0, r));
  g = Math.min(255, Math.max(0, g));
  b = Math.min(255, Math.max(0, b));
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

export interface Particle {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  life: number;
  opacity: number;
}

export function mkParticles(x: number, y: number, color: string, glowColor: string, count = 12): Particle[] {
  return Array.from({ length: count }, () => {
    const angle = Math.random() * Math.PI * 2;
    const speed = 2 + Math.random() * 6;
    return {
      id: Math.random().toString(),
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 2,
      radius: 2 + Math.random() * 4,
      color: Math.random() > 0.5 ? color : glowColor,
      life: 30 + Math.random() * 20,
      opacity: 1,
    };
  });
}

export interface FloatingText {
  id: string;
  x: number;
  y: number;
  text: string;
  color: string;
  vy: number;
  opacity: number;
  direction: 'up' | 'down';
}
