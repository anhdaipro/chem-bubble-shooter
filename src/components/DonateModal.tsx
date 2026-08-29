import React from 'react';
import { Modal } from './Modal';
import { useTranslation } from '../i18n';

interface DonateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DonateModal({ isOpen, onClose }: DonateModalProps) {
  const { t } = useTranslation();

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('donate_title')}>
      <div style={styles.container}>
        <p style={styles.desc}>{t('donate_desc')}</p>

        {/* Placeholder for QR Code */}
        <div style={styles.qrContainer}>
          <div style={styles.qrPlaceholder}>
            [ CHÈN ẢNH MÃ QR VÀO ĐÂY ]<br /><br />
            Hoặc thông tin STK Ngân Hàng
          </div>
        </div>

        <p style={styles.thankYou}>Cảm ơn bạn rất nhiều! ❤️</p>
      </div>
    </Modal>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
    color: '#e2e8f0', textAlign: 'center'
  },
  desc: {
    fontSize: 15, lineHeight: 1.5, color: '#94a3b8', margin: 0
  },
  qrContainer: {
    width: '100%',
    maxWidth: 240,
    aspectRatio: '1/1',
    background: '#1e293b',
    border: '2px dashed #475569',
    borderRadius: 16,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    boxSizing: 'border-box'
  },
  qrPlaceholder: {
    color: '#64748b',
    fontSize: 14,
    fontWeight: 600
  },
  thankYou: {
    fontSize: 16, fontWeight: 700, color: '#f87171', margin: 0
  },
  closeBtn: {
    marginTop: 8,
    background: '#3b82f6', color: '#fff', border: 'none',
    padding: '10px 24px', borderRadius: 12, fontSize: 15, fontWeight: 600,
    cursor: 'pointer', width: '100%'
  }
};
