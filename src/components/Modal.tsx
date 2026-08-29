import React from 'react';
import { useTranslation } from '../i18n';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  color?: string;
}

export function Modal({ isOpen, onClose, title, children, color = '#3b82f6' }: ModalProps) {
  const { t } = useTranslation();
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'absolute', inset: 0, background: 'rgba(2,8,20,0.86)', backdropFilter: 'blur(10px)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 100
    }}>
      <div style={{
        background: 'rgba(15,23,42,0.92)', border: `1.5px solid ${color}44`,
        borderRadius: 20, padding: '32px', boxShadow: `0 0 48px ${color}33`,
        display: 'flex', flexDirection: 'column', gap: 16, minWidth: 300, maxWidth: 400
      }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ color: '#f0f9ff', fontSize: 24, margin: 0, fontWeight: 800 }}>{title}</h2>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontSize: 28, cursor: 'pointer', padding: 0, lineHeight: 1 }}>&times;</button>
        </div>

        <div style={{ color: '#cbd5e1', fontSize: 15, lineHeight: 1.6 }}>
          {children}
        </div>

        <button onClick={onClose} style={{
          width: '100%', padding: '12px 0', borderRadius: 12, marginTop: 8,
          background: color + '22', border: `1.5px solid ${color}66`,
          color: '#f0f9ff', fontSize: 15, fontWeight: 700, cursor: 'pointer', transition: 'all 0.18s'
        }}
          onMouseEnter={e => (e.currentTarget.style.background = color + '44')}
          onMouseLeave={e => (e.currentTarget.style.background = color + '22')}
        >{t('got_it')}</button>
      </div>
    </div>
  );
}
