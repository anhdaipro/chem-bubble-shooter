import { useEffect, useRef, useState, useCallback } from 'react';
import { GameEngine } from '../game/engine/GameEngine';
import type { GameEvent } from '../game/engine/GameEngine';
import { useGameCanvas, computeAngle } from '../game/renderer/GameRenderer';
import { SoundManager } from '../game/utils/SoundManager';
import { YouTubeIntegration } from '../game/utils/YouTubeIntegration';
import { W, H, AIM_ANGLE_LIMIT_MIN } from '../game/constants/GameConstants';
import type { GameMode } from '../game/constants/LevelConstants';
import { useTranslation } from '../i18n';

interface GameScreenProps {
  mode: GameMode;
  level: number;
  onExit: () => void;
  onLevelSelect: () => void;
}

type Overlay = 'none' | 'paused' | 'gameover' | 'levelwin';

const MODE_COLORS: Record<GameMode, string> = {
  ion: '#e63946', metal: '#f59e0b', organic: '#10b981', nonmetal: '#8ac926',
};

export default function GameScreen({ mode, level, onExit, onLevelSelect }: GameScreenProps) {
  const { t } = useTranslation();
  
  const MODE_NAMES: Record<GameMode, string> = {
    ion: '⚗️ ' + t('ion_title'), metal: '⚔️ ' + t('metal_title'), organic: '🌿 ' + t('organic_title'), nonmetal: '💨 ' + t('nonmetal_title'),
  };
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<GameEngine | null>(null);
  const angleRef  = useRef(AIM_ANGLE_LIMIT_MIN / 2);  // mutable, NO setState
  const [overlay, setOverlay]     = useState<Overlay>('none');
  const [finalScore, setFinalScore] = useState(0);
  const accentColor = MODE_COLORS[mode];

  // Init engine
  useEffect(() => {
    const engine = new GameEngine(mode, level);
    engineRef.current = engine;
    engine.init();

    const handler = (e: GameEvent) => {
      if (e.type === 'GAME_OVER') {
        SoundManager.play('gameover');
        setFinalScore(engine.getState().score); setOverlay('gameover');
      }
      if (e.type === 'LEVEL_COMPLETE') {
        SoundManager.play('win');
        setFinalScore(engine.getState().score); setOverlay('levelwin');

        // Unlock next level
        const saved = localStorage.getItem(`unlocked_${mode}`);
        const currentUnlocked = saved ? parseInt(saved, 10) : 1;
        if (level + 1 > currentUnlocked) {
          localStorage.setItem(`unlocked_${mode}`, String(level + 1));
        }
      }
      if (e.type === 'FIRE')  SoundManager.play('fire', 0.6);
      if (e.type === 'LAND')  SoundManager.play('land', 0.5);
      if (e.type === 'POP')   SoundManager.play('pop', 0.8);
      if (e.type === 'COMBO') SoundManager.play('combo');
    };
    engine.on(handler);

    YouTubeIntegration.onPause(() => engine.setPaused(true));
    YouTubeIntegration.onResume(() => engine.setPaused(false));

    return () => { engine.off(handler); engineRef.current = null; };
  }, [mode, level]);

  // getAngle callback — stable ref, no re-render
  const getAngle = useCallback(() => angleRef.current, []);

  // Canvas render loop
  useGameCanvas(canvasRef, engineRef, getAngle);

  // Pointer events — update angleRef only, NO setState
  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (overlay !== 'none') return;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    angleRef.current = computeAngle(e.clientX - rect.left, e.clientY - rect.top);
  }, [overlay]);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (overlay !== 'none') return;
    e.preventDefault();
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    angleRef.current = computeAngle(e.touches[0].clientX - rect.left, e.touches[0].clientY - rect.top);
  }, [overlay]);

  const onFire = useCallback(() => {
    if (overlay !== 'none') return;
    engineRef.current?.fire(angleRef.current);
  }, [overlay]);

  const handleRestart  = () => { engineRef.current?.restart();   setOverlay('none'); };
  const handleNextLevel = () => { engineRef.current?.nextLevel(); setOverlay('none'); };
  const handlePause    = () => { engineRef.current?.setPaused(true);  setOverlay('paused'); };
  const handleResume   = () => { engineRef.current?.setPaused(false); setOverlay('none');   };

  return (
    <div style={{ width: W, height: H, margin: '0 auto', position: 'relative', overflow: 'hidden', background: '#020814', userSelect: 'none' }}>
      <canvas
        ref={canvasRef} width={W} height={H}
        style={{ display: 'block', touchAction: 'none' }}
        onMouseMove={onMouseMove}
        onTouchMove={onTouchMove}
        onClick={onFire}
        onTouchEnd={onFire}
      />

      {overlay === 'none' && (
        <button onClick={handlePause} style={btnStyles.pause}>⏸</button>
      )}

      {overlay === 'paused' && (
        <OverlayBox color={accentColor}>
          <h2 style={ov.title}>{t('pause')}</h2>
          <p style={ov.sub}>{MODE_NAMES[mode]} · {t('level')} {level}</p>
          <OvBtn color={accentColor} onClick={handleResume}>{t('resume')}</OvBtn>
          <OvBtn color="#475569"     onClick={onExit}>{t('exit')}</OvBtn>
        </OverlayBox>
      )}

      {overlay === 'gameover' && (
        <OverlayBox color="#ef4444">
          <div style={{ fontSize: 52, marginBottom: 6 }}>💥</div>
          <h2 style={ov.title}>{t('game_over')}</h2>
          <p style={ov.score}>{finalScore.toLocaleString()}</p>
          <OvBtn color="#ef4444" onClick={handleRestart}>{t('retry')}</OvBtn>
          <OvBtn color="#475569" onClick={onLevelSelect}>{t('menu')}</OvBtn>
        </OverlayBox>
      )}

      {overlay === 'levelwin' && (
        <OverlayBox color={accentColor}>
          <div style={{ fontSize: 56, marginBottom: 6 }}>🏆</div>
          <h2 style={ov.title}>{t('level_complete')}</h2>
          <p style={ov.score}>{finalScore.toLocaleString()}</p>
          <OvBtn color={accentColor} onClick={handleNextLevel}>{t('next_level')}</OvBtn>
          <OvBtn color="#334155"     onClick={handleRestart}>{t('retry')}</OvBtn>
          <OvBtn color="#475569"     onClick={onLevelSelect}>{t('menu')}</OvBtn>
        </OverlayBox>
      )}
    </div>
  );
}

// ─── Sub-components ────────────────────────────────────────────────────────────
function OverlayBox({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <div style={{ position:'absolute', inset:0, background:'rgba(2,8,20,0.86)', backdropFilter:'blur(10px)',
      display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
      <div style={{ background:'rgba(15,23,42,0.92)', border:`1.5px solid ${color}44`,
        borderRadius:20, padding:'36px 44px', boxShadow:`0 0 48px ${color}33`,
        display:'flex', flexDirection:'column', alignItems:'center', gap:12, minWidth:280 }}>
        {children}
      </div>
    </div>
  );
}

function OvBtn({ children, color, onClick }: { children: React.ReactNode; color: string; onClick: () => void }) {
  return (
    <button onClick={onClick} style={{ width:'100%', padding:'12px 0', borderRadius:12,
      background:color+'22', border:`1.5px solid ${color}66`,
      color:'#f0f9ff', fontSize:15, fontWeight:700, cursor:'pointer', transition:'all 0.18s' }}
      onMouseEnter={e => (e.currentTarget.style.background = color+'44')}
      onMouseLeave={e => (e.currentTarget.style.background = color+'22')}
    >{children}</button>
  );
}

const ov = {
  title: { color:'#f0f9ff', fontSize:28, margin:0, fontWeight:800 } as React.CSSProperties,
  sub:   { color:'#64748b', fontSize:13, margin:'4px 0 8px' } as React.CSSProperties,
  score: { color:'#fbbf24', fontSize:22, fontWeight:800, margin:'4px 0 12px' } as React.CSSProperties,
};
const btnStyles = {
  pause: { position:'absolute', top:14, left:'50%', transform:'translateX(-50%)',
    background:'rgba(15,23,42,0.72)', border:'1px solid rgba(255,255,255,0.12)',
    borderRadius:20, padding:'5px 18px', cursor:'pointer', color:'#94a3b8',
    backdropFilter:'blur(4px)', fontSize:16 } as React.CSSProperties,
};
