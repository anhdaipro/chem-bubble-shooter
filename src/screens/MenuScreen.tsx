import { useState } from 'react';
import type { GameMode } from '../game/constants/LevelConstants';
import { SoundManager } from '../game/utils/SoundManager';
import { useTranslation } from '../i18n';
import { isElectron } from '../game/utils/EnvironmentUtils';
import { DonateModal } from '../components/DonateModal';

interface MenuProps {
  onSelectMode: (mode: GameMode) => void;
}

export default function MenuScreen({ onSelectMode }: MenuProps) {
  const { t, lang, setLang } = useTranslation();
  const [isDonateOpen, setIsDonateOpen] = useState(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState(SoundManager.isSoundEnabled());

  const MODES: { id: GameMode; emoji: string; title: string; desc: string; color: string; glow: string }[] = [
    { id: 'ion', emoji: '⚗️', title: t('ion_title'), desc: t('ion_desc'), color: '#e63946', glow: '#e6394633' },
    { id: 'metal', emoji: '⚔️', title: t('metal_title'), desc: t('metal_desc'), color: '#f59e0b', glow: '#f59e0b33' },
    { id: 'organic', emoji: '🌿', title: t('organic_title'), desc: t('organic_desc'), color: '#10b981', glow: '#10b98133' },
    { id: 'nonmetal', emoji: '💨', title: t('nonmetal_title'), desc: t('nonmetal_desc'), color: '#8ac926', glow: '#8ac92633' },
  ];

  return (
    <div style={styles.root}>
      {/* Animated background */}
      <div style={styles.bg} />
      <div style={styles.bgGlow1} />
      <div style={styles.bgGlow2} />

      {/* Header */}
      <div style={styles.header}>
        {/* Left side: Donate */}
        <div>
          {!isElectron() && (
            <button
              onClick={() => setIsDonateOpen(true)}
              style={styles.donateBtn}
            >
              {t('donate')}
            </button>
          )}
        </div>

        {/* Right side: Controls */}
        <div style={{ display: 'flex', gap: 10 }}>
          {/* Sound Toggle */}
          <button
            onClick={() => {
              const enabled = SoundManager.toggleSound();
              setIsSoundEnabled(enabled);
              if (enabled) SoundManager.play('click');
            }}
            style={styles.iconBtn}
            title={isSoundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'}
          >
            {isSoundEnabled ? '🔊' : '🔇'}
          </button>

          {/* Language Toggle */}
          <button
            onClick={() => setLang(lang === 'en' ? 'vi' : 'en')}
            style={styles.langBtn}
          >
            {lang === 'en' ? '🇻🇳 VI' : '🇬🇧 EN'}
          </button>
        </div>
      </div>

      {/* Stars */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        {Array.from({ length: 80 }, (_, i) => (
          <div key={i} style={{
            position: 'absolute',
            left: `${(i * 137.508) % 100}%`,
            top: `${(i * 97.333) % 100}%`,
            width: i % 7 === 0 ? 2 : 1,
            height: i % 7 === 0 ? 2 : 1,
            background: `rgba(255,255,255,${0.08 + (i % 6) * 0.03})`,
            borderRadius: '50%',
            animation: `twinkle ${2 + (i % 4)}s ease-in-out ${(i % 10) * 0.3}s infinite alternate`,
          }} />
        ))}
      </div>

      <div style={styles.content}>
        {/* Logo / Title */}
        <div style={styles.logoSection}>
          <div style={styles.atomIcon}>⚛</div>
          <h1 style={styles.title}>
            <span style={{ color: '#60a5fa' }}>Chem</span>
            <span style={{ color: '#f0f9ff' }}>Bubble</span>
          </h1>
          <p style={styles.subtitle}>Chemistry Bubble Shooter</p>
          <div style={styles.divider} />
        </div>

        {/* Mode cards */}
        <div style={styles.grid}>
          {MODES.map(m => (
            <button
              key={m.id}
              onClick={() => {
                SoundManager.play('click');
                onSelectMode(m.id);
              }}
              style={{ ...styles.card, borderColor: m.color + '40', boxShadow: `0 4px 32px ${m.glow}` }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = m.color + 'AA';
                e.currentTarget.style.boxShadow = `0 8px 40px ${m.color}44`;
                e.currentTarget.style.transform = 'translateY(-3px) scale(1.01)';
                e.currentTarget.style.background = `rgba(15,23,42,0.92)`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = m.color + '40';
                e.currentTarget.style.boxShadow = `0 4px 32px ${m.glow}`;
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.background = `rgba(15,23,42,0.7)`;
              }}
            >
              {/* Accent bar */}
              <div style={{ ...styles.accentBar, background: m.color }} />

              <div style={styles.cardBody}>
                {/* Emoji icon */}
                <div style={{ ...styles.iconWrap, background: m.color + '18' }}>
                  <span style={{ fontSize: 28 }}>{m.emoji}</span>
                </div>

                {/* Text */}
                <div style={styles.textBlock}>
                  <div style={{ ...styles.cardTitle, color: m.color }}>{m.title}</div>
                  <div style={styles.cardDesc}>{m.desc}</div>
                </div>

                {/* Arrow */}
                <div style={{ color: m.color, fontSize: 22, opacity: 0.9 }}>▶</div>
              </div>
            </button>
          ))}
        </div>

        {/* Download Links (Web only) */}
        {!isElectron() && (
          <div style={{ marginTop: 36, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, width: '100%' }}>

            {/* Desktop Apps */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
              <div style={{ color: '#94a3b8', fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>
                {lang === 'en' ? 'Download Desktop App' : 'Tải Ứng Dụng Desktop'}
              </div>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
                <a href="https://github.com/anhdaipro/chem-bubble-shooter/releases/download/untagged-b19631051abaed148b18/Chem.Bubble.Shooter-1.0.0.AppImage" target="_blank" rel="noreferrer" style={styles.downloadBtn}>
                  🪟 Windows
                </a>
                <a href="https://github.com/anhdaipro/chem-bubble-shooter/releases/download/untagged-b19631051abaed148b18/Chem.Bubble.Shooter-1.0.0.AppImage" target="_blank" rel="noreferrer" style={styles.downloadBtn}>
                  🐧 Ubuntu
                </a>
                <a href="#" target="_blank" rel="noreferrer" style={styles.downloadBtn}>
                  🍎 macOS
                </a>
              </div>
            </div>

            {/* Mobile Apps */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
              <div style={{ color: '#94a3b8', fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>
                {lang === 'en' ? 'Download Mobile App' : 'Tải Ứng Dụng Mobile'}
              </div>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
                <a href="https://play.google.com/store/apps/details?id=com.anhdaipro.chemcalcpro" target="_blank" rel="noreferrer" style={styles.downloadBtn}>
                  🤖 Android
                </a>
                <a href="https://apps.apple.com/app/id6773238485" target="_blank" rel="noreferrer" style={styles.downloadBtn}>
                  📱 iOS
                </a>
              </div>
            </div>

          </div>
        )}

        <p style={styles.footer}>Chemistry Education Game</p>
      </div>

      <DonateModal isOpen={isDonateOpen} onClose={() => setIsDonateOpen(false)} />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
        @keyframes twinkle { from { opacity: 0.4 } to { opacity: 1 } }
        @keyframes float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-8px) } }
        * { box-sizing: border-box; }
      `}</style>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  root: {
    minHeight: '100vh', width: '100%',
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    fontFamily: '"Inter", "Segoe UI", Arial, sans-serif',
    position: 'relative', overflow: 'hidden', overflowY: 'auto',
  },
  bg: {
    position: 'fixed', inset: 0, zIndex: 0,
    background: 'linear-gradient(145deg, #020814 0%, #0a0f1e 35%, #050818 65%, #020617 100%)',
  },
  header: {
    width: '100%',
    padding: '20px 20px 0',
    display: 'flex',
    maxWidth: 560,
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 10,
    position: 'relative',
  },
  donateBtn: {
    background: '#ffdd00', color: '#000000', border: 'none', padding: '6px 12px', borderRadius: 20, cursor: 'pointer', fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', gap: 6, boxShadow: '0 4px 14px rgba(255,221,0,0.4)'
  },
  iconBtn: {
    background: 'rgba(15,23,42,0.8)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', width: 36, height: 36, borderRadius: 18, cursor: 'pointer', fontWeight: 600, fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center'
  },
  langBtn: {
    background: 'rgba(15,23,42,0.8)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', padding: '0 12px', height: 36, borderRadius: 18, cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center'
  },
  bgGlow1: {
    position: 'fixed', top: '-20%', left: '-10%', zIndex: 0,
    width: '50vw', height: '50vw', borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)',
    filter: 'blur(40px)',
  },
  bgGlow2: {
    position: 'fixed', bottom: '-20%', right: '-10%', zIndex: 0,
    width: '50vw', height: '50vw', borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)',
    filter: 'blur(40px)',
  },
  content: {
    position: 'relative', zIndex: 1,
    width: '100%', maxWidth: 560,
    padding: '20px',
    paddingTop: '10px',
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0,
  },
  logoSection: {
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    marginBottom: 36,
  },
  atomIcon: {
    fontSize: 56, marginBottom: 8,
    animation: 'float 3s ease-in-out infinite',
    filter: 'drop-shadow(0 0 20px rgba(96,165,250,0.5))',
  },
  title: {
    margin: 0, fontSize: 42, fontWeight: 800, letterSpacing: '-1px',
    lineHeight: 1.1, textShadow: '0 0 40px rgba(96,165,250,0.3)',
  },
  subtitle: {
    color: '#64748b', fontSize: 14, margin: '8px 0 20px',
    letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600,
  },
  divider: {
    width: 60, height: 2,
    background: 'linear-gradient(90deg, transparent, #3b82f6, transparent)',
    borderRadius: 2,
  },
  grid: {
    width: '100%', display: 'flex', flexDirection: 'column', gap: 14,
  },
  card: {
    width: '100%', display: 'flex', alignItems: 'stretch',
    background: 'rgba(15,23,42,0.7)',
    border: '1.5px solid',
    borderRadius: 16, overflow: 'hidden',
    cursor: 'pointer', transition: 'all 0.22s ease',
    backdropFilter: 'blur(8px)',
    padding: 0, textAlign: 'left',
  },
  accentBar: { width: 5, flexShrink: 0 },
  cardBody: {
    flex: 1, display: 'flex', alignItems: 'center',
    gap: 14, padding: '16px 18px',
  },
  iconWrap: {
    width: 52, height: 52, borderRadius: 12, flexShrink: 0,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  textBlock: { flex: 1 },
  cardTitle: { fontSize: 17, fontWeight: 700, marginBottom: 4 },
  cardDesc: { color: '#64748b', fontSize: 12.5, lineHeight: 1.5 },
  footer: { color: '#334155', fontSize: 12, marginTop: 32, textAlign: 'center' },
  downloadBtn: {
    background: 'rgba(30,41,59,0.7)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: '#f8fafc',
    padding: '8px 16px',
    borderRadius: 8,
    textDecoration: 'none',
    fontSize: 14,
    fontWeight: 600,
    transition: 'all 0.2s',
  }
};
