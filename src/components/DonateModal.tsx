import React, { useEffect } from 'react';
import { Modal } from './Modal';
import { useTranslation } from '../i18n';

interface DonateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DonateModal({ isOpen, onClose }: DonateModalProps) {
  const { t } = useTranslation();
  const [iapProduct, setIapProduct] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  // Detect if the app is running inside Mac App Store
  const isStoreBuild = (() => {
    if (!/electron/i.test(navigator.userAgent)) return false;
    try {
      const process = (window as any).require('process');
      return !!(process.mas);
    } catch (e) {
      return false;
    }
  })();

  useEffect(() => {
    if (isStoreBuild && isOpen) {
      const { ipcRenderer } = (window as any).require('electron');

      const fetchProduct = async () => {
        setIsLoading(true);
        try {
          const products = await ipcRenderer.invoke('iap-get-products', ['com.chembubbleshooter.support']);
          if (products && products.length > 0) {
            setIapProduct(products[0]);
          }
        } catch (error) {
          console.error('Failed to fetch product', error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchProduct();

      const handleSuccess = (_event: any) => {
        alert(t('iap_success'));
        onClose();
      };
      const handleFailed = () => {
        alert(t('iap_failed'));
      };

      ipcRenderer.on('iap-success', handleSuccess);
      ipcRenderer.on('iap-failed', handleFailed);

      return () => {
        ipcRenderer.removeListener('iap-success', handleSuccess);
        ipcRenderer.removeListener('iap-failed', handleFailed);
      };
    }
  }, [isStoreBuild, isOpen, onClose, t]);

  const handlePurchase = () => {
    if (isStoreBuild) {
      const { ipcRenderer } = (window as any).require('electron');
      ipcRenderer.send('iap-purchase', 'com.chembubbleshooter.support');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('donate_title')} hideFooter>
      <div style={styles.container}>
        <p style={styles.desc}>{isStoreBuild ? t('donate_desc_mas') : t('donate_desc')}</p>

        <div style={styles.qrContainer}>
          {isStoreBuild ? (
            <div style={styles.iapContainer}>
              <p style={{ color: '#94a3b8', fontSize: 14 }}>{t('iap_secure')}</p>
              <button style={styles.purchaseBtn} onClick={handlePurchase} disabled={isLoading}>
                {isLoading
                  ? t('iap_loading')
                  : (iapProduct ? `${t('iap_buy')} (${iapProduct.formattedPrice})` : t('iap_buy'))}
              </button>
            </div>
          ) : (
            <img
              src="https://img.vietqr.io/image/BIDV-1471399083-compact.jpg?amount=20000&addInfo=Ung%20ho%20tac%20gia"
              alt="VietQR VietinBank"
              style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: 8 }}
            />
          )}
        </div>

        <p style={styles.thankYou}>{t('iap_thank_you')}</p>
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
  },
  iapContainer: {
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, width: '100%'
  },
  purchaseBtn: {
    background: '#10b981', color: '#fff', border: 'none',
    padding: '14px 24px', borderRadius: 12, fontSize: 16, fontWeight: 700,
    cursor: 'pointer', width: '100%', boxShadow: '0 4px 6px -1px rgba(16, 185, 129, 0.4)'
  }
};
