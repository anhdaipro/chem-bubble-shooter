import React, { useEffect } from 'react';
import { Modal } from './Modal';
import { useTranslation } from '../i18n';

interface DonateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DonateModal({ isOpen, onClose }: DonateModalProps) {
  const { t, lang } = useTranslation();
  const [iapProduct, setIapProduct] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [showCodeInput, setShowCodeInput] = React.useState(false);
  const [inputCode, setInputCode] = React.useState('');
  const [codeError, setCodeError] = React.useState('');

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
        localStorage.setItem('iap_unlocked_all', 'true');
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

  const handleActivateCode = () => {
    const validCodes = ['CHEMBUBBLESHOOTER2026', 'CHEMBUBBLESHOOTERPRO'];
    const cleanCode = inputCode.trim().toUpperCase();
    if (validCodes.includes(cleanCode)) {
      localStorage.setItem('iap_unlocked_all', 'true');
      alert(t('code_success'));
      onClose();
    } else {
      setCodeError(t('code_invalid'));
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('donate_title')} hideFooter>
      <div style={styles.container}>
        <p style={styles.desc}>{isStoreBuild ? t('donate_desc_mas') : t('donate_desc')}</p>

        <div style={{
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(59, 130, 246, 0.15))',
          border: '1px solid rgba(16, 185, 129, 0.4)',
          borderRadius: 12,
          padding: '10px 14px',
          fontSize: 13,
          fontWeight: 600,
          color: '#10b981',
          textAlign: 'center',
          width: '100%',
          boxSizing: 'border-box'
        }}>
          {t('iap_unlock_note')}
        </div>

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
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, width: '100%' }}>
              <img
                src="https://img.vietqr.io/image/BIDV-1471399083-compact.jpg?amount=20000&addInfo=Ung%20ho%20tac%20gia"
                alt="VietQR BIDV"
                style={{ width: '100%', height: 'auto', objectFit: 'contain', borderRadius: 8 }}
              />
              <a
                href="https://ko-fi.com/daipham11322"
                target="_blank"
                style={{ background: '#29abe0', color: '#fff', padding: '12px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', width: '100%', boxSizing: 'border-box' }}
              >
                ☕ {lang === 'vi' ? 'Ủng hộ qua PayPal / Thẻ quốc tế' : 'Donate via PayPal / Card'}
              </a>
            </div>
          )}
        </div>

        {/* Contact info for Web / QR / PayPal donors */}
        {!isStoreBuild && (
          <div style={{
            background: '#0f172a',
            border: '1px solid #1e293b',
            borderRadius: 10,
            padding: '10px 12px',
            fontSize: 12,
            color: '#94a3b8',
            textAlign: 'center',
            width: '100%',
            boxSizing: 'border-box'
          }}>
            <p style={{ margin: '0 0 4px 0', lineHeight: 1.4 }}>{t('donate_contact_note')}</p>
            <p style={{ margin: 0, fontWeight: 700, color: '#38bdf8' }}>{t('support_contact')}</p>
          </div>
        )}

        {/* Enter Activation Code Section (For QR / PayPal donors on web) */}
        {!isStoreBuild && (
          <div style={{ width: '100%', marginTop: 8 }}>
            {!showCodeInput ? (
              <button
                onClick={() => setShowCodeInput(true)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#3b82f6',
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                {t('enter_code_btn')}
              </button>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: 8, width: '100%' }}>
                  <input
                    type="text"
                    placeholder={t('code_placeholder')}
                    value={inputCode}
                    onChange={(e) => { setInputCode(e.target.value); setCodeError(''); }}
                    style={{
                      flex: 1,
                      background: '#0f172a',
                      border: '1px solid #334155',
                      borderRadius: 8,
                      padding: '10px 12px',
                      color: '#f8fafc',
                      fontSize: 14,
                      outline: 'none'
                    }}
                  />
                  <button
                    onClick={handleActivateCode}
                    style={{
                      background: '#10b981',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 8,
                      padding: '10px 16px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    {t('code_activate')}
                  </button>
                </div>
                {codeError && <p style={{ color: '#ef4444', fontSize: 12, margin: 0 }}>{codeError}</p>}
              </div>
            )}
          </div>
        )}

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
