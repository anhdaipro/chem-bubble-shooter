import React, { createContext, useContext, useState, useEffect } from 'react';

type Lang = 'en' | 'vi';

const translations = {
  en: {
    // Menu
    ion_title: 'Ion Reaction',
    ion_desc: 'Match cations & anions based on solubility table',
    metal_title: 'Metal Arena',
    metal_desc: 'Metal displacement via activity series',
    organic_title: 'Organic Chem',
    organic_desc: 'Organic reactions — addition, substitution',
    nonmetal_title: 'NonMetal',
    nonmetal_desc: 'Nonmetal reactions — halogens & oxidation',
    offline_edu: '100% Offline · Chemistry Education Game',
    donate: '💖 Support Project',
    donate_title: 'Buy me a coffee ☕',
    donate_desc: 'If you find this game helpful, consider buying the creator a drink via MoMo or VietQR to keep the project alive!',
    donate_desc_mas: 'If you find this game helpful, consider buying the creator a drink to keep the project alive!',
    iap_success: 'Payment successful! Thank you so much! ❤️',
    iap_failed: 'Payment was cancelled or failed.',
    iap_secure: 'Pay securely via official App Store',
    iap_loading: 'Loading...',
    iap_buy: 'Buy me a Coffee',
    iap_thank_you: 'Thank you so much! ❤️',

    // Game
    pause: '⏸ Paused',
    resume: '▶ Resume',
    exit: '← Exit',
    game_over: 'Game Over',
    retry: '🔄 Retry',
    menu: '← Menu',
    level_complete: 'Level Complete!',
    next_level: '▶ Next Level',

    // Tutorial Modal
    tutorial_title: 'How to play',
    got_it: 'Got it',
    ion_tut_title: '🔬 Ion Reaction:',
    ion_tut_1: 'Shoot bubbles to form precipitates, gases or water.',
    metal_tut_title: '⚔️ Metal Displacement:',
    metal_tut_1: 'Stronger metals displace weaker metals from salt solutions.',
    organic_tut_title: '🌿 Organic Reaction:',
    organic_tut_1: 'Shoot the correct reagent into the corresponding organic compounds.',
    nonmetal_tut_title: '💨 NonMetal Reaction:',
    nonmetal_tut_1: 'Match nonmetals and compounds with suitable conditions.',
    how_to_play: '🎯 How to play:',
    tut_tip1: 'Tap or drag to aim.',
    tut_tip2: 'Match correct chemicals to create reactions.',
    tut_tip3: 'Missing shots will drop the ceiling.',
    tut_warning: '* Missing too many times drops the board. Be careful!',

    // Level Select
    level: 'Level',
    select_level: 'Select Level',
    locked: 'Locked',
    endless: 'Endless',
  },
  vi: {
    // Menu
    ion_title: 'Phản ứng Ion',
    ion_desc: 'Ghép anion & cation dựa trên bảng tính tan',
    metal_title: 'Đẩy Kim Loại',
    metal_desc: 'Kim loại mạnh đẩy kim loại yếu theo dãy hoạt động',
    organic_title: 'Hóa Hữu Cơ',
    organic_desc: 'Các phản ứng cộng, thế, oxi hóa khử hữu cơ',
    nonmetal_title: 'Phản ứng Phi Kim',
    nonmetal_desc: 'Ghép Halogen, oxi hóa phi kim',
    offline_edu: '100% Offline · Trò chơi giáo dục Hóa học',
    donate: '💖 Ủng hộ dự án',
    donate_title: 'Mời Tác Giả 1 Ly Nước 🥤',
    donate_desc: 'Nếu bạn thấy trò chơi này giúp ích cho việc học Hóa, hãy quét mã QR bên dưới để ủng hộ tác giả có động lực phát triển thêm nhé!',
    donate_desc_mas: 'Nếu bạn thấy trò chơi này giúp ích cho việc học Hóa, hãy ủng hộ tác giả một ly nước để có động lực phát triển thêm nhé!',
    iap_success: 'Thanh toán thành công! Cảm ơn bạn rất nhiều! ❤️',
    iap_failed: 'Thanh toán bị huỷ hoặc có lỗi xảy ra.',
    iap_secure: 'Thanh toán an toàn qua Cửa hàng Ứng dụng chính thức',
    iap_loading: 'Đang tải...',
    iap_buy: 'Ủng hộ tác giả',
    iap_thank_you: 'Cảm ơn bạn rất nhiều! ❤️',

    // Game
    pause: '⏸ Đã Tạm Dừng',
    resume: '▶ Tiếp tục',
    exit: '← Thoát',
    game_over: 'Thua cuộc',
    retry: '🔄 Chơi lại',
    menu: '← Menu',
    level_complete: 'Hoàn thành!',
    next_level: '▶ Bài tiếp theo',

    // Tutorial Modal
    tutorial_title: 'Hướng dẫn chơi',
    got_it: 'Đã hiểu',
    ion_tut_title: '🔬 Phản ứng Ion:',
    ion_tut_1: 'Bắn bóng để tạo thành chất kết tủa, chất khí hoặc nước.',
    metal_tut_title: '⚔️ Đẩy Kim Loại:',
    metal_tut_1: 'Kim loại mạnh đẩy kim loại yếu hơn ra khỏi dung dịch muối.',
    organic_tut_title: '🌿 Phản ứng Hữu Cơ:',
    organic_tut_1: 'Bắn đúng thuốc thử vào các hợp chất hữu cơ tương ứng.',
    nonmetal_tut_title: '💨 Phản ứng Phi Kim:',
    nonmetal_tut_1: 'Ghép các phi kim và hợp chất với điều kiện thích hợp.',
    how_to_play: '🎯 Cách chơi:',
    tut_tip1: 'Chạm hoặc kéo để ngắm bắn.',
    tut_tip2: 'Ghép đúng chất để tạo phản ứng hóa học.',
    tut_tip3: 'Bắn trượt nhiều lần sẽ làm trần bóng rơi xuống.',
    tut_warning: '* Bắn trượt nhiều lần sẽ làm lưới bóng rơi xuống một bậc. Hãy cẩn thận!',

    // Level Select
    level: 'Bài',
    select_level: 'Chọn Bài Chơi',
    locked: 'Đã khóa',
    endless: 'Vô Tận',
  }
};

type TranslationKey = keyof typeof translations.en;

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  setLang: () => { },
  t: (key) => key,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en');

  useEffect(() => {
    const saved = localStorage.getItem('chem_shooter_lang') as Lang;
    if (saved && (saved === 'en' || saved === 'vi')) {
      setLangState(saved);
    }
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem('chem_shooter_lang', l);
  };

  const t = (key: TranslationKey) => {
    return translations[lang][key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  return useContext(LanguageContext);
}
