import { Modal } from './Modal';
import type { GameMode } from '../game/constants/LevelConstants';
import { useTranslation } from '../i18n';

interface TutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: GameMode;
}

export function TutorialModal({ isOpen, onClose, mode }: TutorialModalProps) {
  const { t } = useTranslation();

  const instructions = {
    ion: (
      <>
        <p>{t('ion_tut_title')}</p>
        <ul style={{ paddingLeft: 20, margin: '8px 0' }}>
          <li>{t('ion_tut_1')}</li>
          <li>VD: <code>Ba²⁺ + SO₄²⁻ ➔ BaSO₄↓</code></li>
        </ul>
      </>
    ),
    metal: (
      <>
        <p>{t('metal_tut_title')}</p>
        <ul style={{ paddingLeft: 20, margin: '8px 0' }}>
          <li>{t('metal_tut_1')}</li>
          <li>VD: <code>Fe + Cu²⁺ ➔ Fe²⁺ + Cu↓</code></li>
        </ul>
      </>
    ),
    organic: (
      <>
        <p>{t('organic_tut_title')}</p>
        <ul style={{ paddingLeft: 20, margin: '8px 0' }}>
          <li>{t('organic_tut_1')}</li>
          <li>VD: <code>C₂H₄ + Br₂ ➔ C₂H₄Br₂</code></li>
        </ul>
      </>
    ),
    nonmetal: (
      <>
        <p>{t('nonmetal_tut_title')}</p>
        <ul style={{ paddingLeft: 20, margin: '8px 0' }}>
          <li>{t('nonmetal_tut_1')}</li>
          <li>VD: <code>H₂ + Cl₂ ➔ 2HCl (askt)</code></li>
        </ul>
      </>
    )
  };

  const colors = {
    ion: '#e63946', metal: '#f59e0b', organic: '#10b981', nonmetal: '#8ac926',
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('tutorial_title')} color={colors[mode]}>
      {instructions[mode]}
      <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <p style={{ margin: 0 }}>{t('how_to_play')}</p>
        <ul style={{ paddingLeft: 20, margin: '8px 0', fontSize: 14 }}>
          <li>{t('tut_tip1')}</li>
          <li>{t('tut_tip2')}</li>
          <li>{t('tut_tip3')}</li>
        </ul>
      </div>
    </Modal>
  );
}
