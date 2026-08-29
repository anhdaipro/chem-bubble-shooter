import { useState, useEffect } from 'react';
import type { GameMode } from '../game/constants/LevelConstants';
import { getLevelsForMode } from '../game/constants/LevelConstants';
import { SoundManager } from '../game/utils/SoundManager';
import { useTranslation } from '../i18n';
import { TutorialModal } from '../components/TutorialModal';

interface LevelSelectProps {
  mode: GameMode;
  onSelect: (level: number) => void;
  onBack: () => void;
}

export default function LevelSelectScreen({ mode, onSelect, onBack }: LevelSelectProps) {
  const { t, lang } = useTranslation();
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);
  const [unlockedLevel, setUnlockedLevel] = useState(1);

  useEffect(() => {
    const saved = localStorage.getItem(`unlocked_${mode}`);
    if (saved) {
      setUnlockedLevel(parseInt(saved, 10));
    } else {
      setUnlockedLevel(1);
    }
  }, [mode]);

  const MODE_META: Record<GameMode, { emoji: string; name: string; color: string; desc: string }> = {
    ion: { emoji: '⚗️', name: t('ion_title'), color: '#e63946', desc: t('ion_desc') },
    metal: { emoji: '⚔️', name: t('metal_title'), color: '#f59e0b', desc: t('metal_desc') },
    organic: { emoji: '🌿', name: t('organic_title'), color: '#10b981', desc: t('organic_desc') },
    nonmetal: { emoji: '💨', name: t('nonmetal_title'), color: '#8ac926', desc: t('nonmetal_desc') },
  };

  const levels = getLevelsForMode(mode);
  const meta = MODE_META[mode];

  return (
    <div style={styles.container}>
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0,
        background: 'linear-gradient(135deg, #020814 0%, #0f172a 50%, #020617 100%)',
      }} />

      <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
        {Array.from({ length: 50 }, (_, i) => (
          <div key={i} style={{
            position: 'absolute',
            left: `${(i * 137.5) % 100}%`,
            top: `${(i * 97.3) % 100}%`,
            width: Math.random() > 0.7 ? 2 : 1,
            height: Math.random() > 0.7 ? 2 : 1,
            background: `rgba(255,255,255,${0.1 + (i % 5) * 0.04})`,
            borderRadius: '50%',
          }} />
        ))}
      </div>

      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 540, margin: '0 auto' }}>
        <div style={styles.header}>
          <button onClick={() => { SoundManager.play('click'); onBack(); }} style={styles.backBtn}>{t('menu')}</button>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 36 }}>{meta.emoji}</div>
            <h1 style={{ ...styles.title, color: meta.color }}>{meta.name}</h1>
            <p style={styles.desc}>{meta.desc}</p>
          </div>
          <button onClick={() => { SoundManager.play('click'); setIsTutorialOpen(true); }} style={{ ...styles.backBtn, padding: '8px 12px' }}>
            ❓
          </button>
        </div>

        <div style={styles.grid}>
          {levels.map((lvl) => {
            const isEndless = lvl.targetScore === Infinity;
            const isLocked = lvl.id > unlockedLevel;
            return (
              <button
                key={lvl.id}
                onClick={() => {
                  if (isLocked) return;
                  SoundManager.play('click');
                  onSelect(lvl.id);
                }}
                style={{ 
                  ...styles.levelCard, 
                  borderColor: meta.color + (isLocked ? '22' : '44'), 
                  boxShadow: isLocked ? 'none' : `0 0 16px ${meta.color}22`,
                  opacity: isLocked ? 0.6 : 1,
                  cursor: isLocked ? 'not-allowed' : 'pointer'
                }}
                onMouseEnter={e => {
                  if (isLocked) return;
                  e.currentTarget.style.borderColor = meta.color + 'AA';
                  e.currentTarget.style.boxShadow = `0 0 28px ${meta.color}44`;
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={e => {
                  if (isLocked) return;
                  e.currentTarget.style.borderColor = meta.color + '44';
                  e.currentTarget.style.boxShadow = `0 0 16px ${meta.color}22`;
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{ ...styles.levelNum, background: meta.color + '22', color: meta.color }}>
                  {isLocked ? '🔒' : lvl.id}
                </div>
                <div style={styles.levelInfo}>
                  <div style={styles.levelTitle}>{lang === 'en' ? lvl.titleEn : lvl.title}</div>
                  <div style={styles.levelScore}>
                    {isEndless ? `♾ ${t('endless') || 'Endless'}` : `🎯 ${(lvl.targetScore / 1000).toFixed(0)}K pts`}
                    {' · '}⚡ ×{lvl.speedMultiplier.toFixed(1)}
                  </div>
                </div>
                <div style={{ color: meta.color, fontSize: 18, opacity: isLocked ? 0.3 : 0.8 }}>
                  {isLocked ? '🔒' : '▶'}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <TutorialModal isOpen={isTutorialOpen} onClose={() => setIsTutorialOpen(false)} mode={mode} />
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh', width: '100%', overflowY: 'auto',
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    padding: '0 16px 40px', boxSizing: 'border-box',
    fontFamily: '"Segoe UI", Arial, sans-serif',
  },
  header: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '24px 0 20px', width: '100%',
  },
  backBtn: {
    background: 'rgba(30,41,59,0.8)', border: '1px solid rgba(255,255,255,0.1)',
    color: '#94a3b8', borderRadius: 10, padding: '8px 16px',
    cursor: 'pointer', fontSize: 14, fontWeight: 600,
  },
  title: { margin: '4px 0', fontSize: 24, fontWeight: 800 },
  desc: { color: '#64748b', fontSize: 13, margin: 0 },
  grid: { display: 'flex', flexDirection: 'column', gap: 10, width: '100%' },
  levelCard: {
    display: 'flex', alignItems: 'center', gap: 14,
    background: 'rgba(15,23,42,0.75)',
    border: '1.5px solid',
    borderRadius: 14, padding: '14px 18px',
    cursor: 'pointer', transition: 'all 0.2s ease',
    backdropFilter: 'blur(6px)',
  },
  levelNum: {
    width: 40, height: 40, borderRadius: 10,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontWeight: 800, fontSize: 16, flexShrink: 0,
  },
  levelInfo: { flex: 1, textAlign: 'left' },
  levelTitle: { color: '#f0f9ff', fontWeight: 700, fontSize: 15, marginBottom: 3 },
  levelScore: { color: '#64748b', fontSize: 12 },
};
