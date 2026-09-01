import { BUBBLE_RADIUS, BUBBLE_FONT_SIZE_LARGE, BUBBLE_FONT_SIZE_MEDIUM, BUBBLE_FONT_SIZE_SMALL } from '../constants/GameConstants';
import { CHEMICALS } from '../constants/ChemicalConstants';
import { ORGANIC_CHEMICALS } from '../constants/OrganicChemicals';
import { lighten } from '../constants/GameConstants';
import { drawOrganicStructure } from '../renderer/OrganicRenderer';

export class BubbleEntity {
  x: number;
  y: number;
  formula: string;
  isStatic: boolean;
  vx: number = 0;
  vy: number = 0;
  isFired: boolean = false;
  isFalling: boolean = false;

  constructor(x: number, y: number, formula: string, isStatic: boolean) {
    this.x = x;
    this.y = y;
    this.formula = formula;
    this.isStatic = isStatic;
  }

  get chemData() {
    return ORGANIC_CHEMICALS[this.formula] || CHEMICALS[this.formula];
  }

  get color(): string {
    return this.chemData?.color || '#444';
  }

  get glowColor(): string {
    return this.chemData?.glowColor || '#666';
  }

  get symbol(): string {
    return this.chemData?.symbol || this.formula;
  }

  get textColor(): string {
    return this.chemData?.textColor || '#fff';
  }

  updateFalling(gravity: number, damping: number) {
    this.vy += gravity;
    this.vx *= damping;
    this.vy *= damping;
    this.x += this.vx;
    this.y += this.vy;
  }

  draw(ctx: CanvasRenderingContext2D, alpha: number = 1) {
    if (alpha <= 0) return;
    
    ctx.save();
    ctx.globalAlpha = alpha;
    
    const r = BUBBLE_RADIUS;
    
    // Gradient
    const grd = ctx.createRadialGradient(
      this.x - r * 0.25, this.y - r * 0.25, r * 0.05,
      this.x, this.y, r
    );
    grd.addColorStop(0, lighten(this.color, 60));
    grd.addColorStop(1, this.color + 'CC');
    
    ctx.beginPath();
    ctx.arc(this.x, this.y, r, 0, Math.PI * 2);
    ctx.fillStyle = grd;
    ctx.fill();
    
    // Border
    ctx.strokeStyle = this.glowColor + (this.isStatic ? '88' : 'AA');
    ctx.lineWidth = this.isStatic ? 1 : 1.5;
    ctx.stroke();
    
    // Shadow if falling
    if (this.isFalling) {
      ctx.shadowColor = this.glowColor;
      ctx.shadowBlur = 12;
      ctx.fill();
    }
    
    // Try drawing structural formula first
    const isStructure = drawOrganicStructure(ctx, this.formula, this.x, this.y, r, this.textColor);
    
    // Fallback to normal text symbol if not a structure
    if (!isStructure) {
      const sym = this.symbol;
      let fs = BUBBLE_FONT_SIZE_LARGE; 
      ctx.font = `bold ${fs}px "Segoe UI", Arial`;
      
      // Proportionally scale down if text is too wide
      const maxWidth = r * 1.7;
      const textWidth = ctx.measureText(sym).width;
      if (textWidth > maxWidth) {
        fs = fs * (maxWidth / textWidth);
        ctx.font = `bold ${fs}px "Segoe UI", Arial`;
      }

      ctx.fillStyle = this.textColor;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      ctx.fillText(sym, this.x, this.y + 0.5);
    }
    
    ctx.restore();
  }
}
