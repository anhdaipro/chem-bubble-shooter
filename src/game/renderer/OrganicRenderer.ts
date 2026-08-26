export function drawOrganicStructure(
  ctx: CanvasRenderingContext2D,
  formula: string,
  x: number,
  y: number,
  r: number,
  textColor: string
): boolean {
  if (formula === 'C6H6' || formula === 'C6H5CH3' || formula === 'C6H5OH') {
    const ringRadius = r * 0.45;
    const yOffset = (formula === 'C6H5CH3' || formula === 'C6H5OH') ? 8 : 0;
    
    ctx.save();
    ctx.translate(x, y + yOffset);
    
    // Hexagon
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 180) * (60 * i - 30);
      const px = ringRadius * Math.cos(angle);
      const py = ringRadius * Math.sin(angle);
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.strokeStyle = textColor;
    ctx.lineWidth = 1.5;
    ctx.stroke();
    
    // Inner circle
    ctx.beginPath();
    ctx.arc(0, 0, ringRadius * 0.55, 0, Math.PI * 2);
    ctx.lineWidth = 1;
    ctx.stroke();
    
    // Top bond & group
    if (formula === 'C6H5CH3' || formula === 'C6H5OH') {
      ctx.beginPath();
      ctx.moveTo(0, -ringRadius);
      ctx.lineTo(0, -ringRadius - 3);
      ctx.lineWidth = 1.5;
      ctx.stroke();
      
      const groupText = formula === 'C6H5CH3' ? 'CH3' : 'OH';
      ctx.font = 'bold 10px "Segoe UI", Arial';
      ctx.fillStyle = textColor;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';
      ctx.fillText(groupText, 0, -ringRadius - 4);
    }
    
    ctx.restore();
    return true;
  }

  if (formula === 'CH3COCH3') {
    ctx.save();
    ctx.translate(x, y + 4);
    
    // Zigzag
    ctx.beginPath();
    ctx.moveTo(-8, 4);
    ctx.lineTo(0, -4);
    ctx.lineTo(8, 4);
    ctx.strokeStyle = textColor;
    ctx.lineWidth = 1.5;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.stroke();
    
    // Double bond
    ctx.beginPath();
    ctx.moveTo(-1.5, -4); ctx.lineTo(-1.5, -12);
    ctx.moveTo(1.5, -4); ctx.lineTo(1.5, -12);
    ctx.stroke();
    
    // O
    ctx.font = 'bold 10px "Segoe UI", Arial';
    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillText('O', 0, -13);
    
    ctx.restore();
    return true;
  }

  if (formula === 'CH3COOH') {
    ctx.save();
    const totalW = 16 + 14; 
    const startX = x - totalW / 2;
    ctx.translate(startX, y + 4);
    
    // Zigzag
    ctx.beginPath();
    ctx.moveTo(0, 4);
    ctx.lineTo(8, -4);
    ctx.lineTo(16, 4);
    ctx.strokeStyle = textColor;
    ctx.lineWidth = 1.5;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.stroke();
    
    // Double bond
    ctx.beginPath();
    ctx.moveTo(6.5, -4); ctx.lineTo(6.5, -12);
    ctx.moveTo(9.5, -4); ctx.lineTo(9.5, -12);
    ctx.stroke();
    
    // Text
    ctx.font = 'bold 10px "Segoe UI", Arial';
    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillText('O', 8, -13);
    
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'left';
    ctx.fillText('OH', 18, 4);
    
    ctx.restore();
    return true;
  }

  return false;
}
