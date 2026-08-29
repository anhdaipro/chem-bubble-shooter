export interface LevelConfig {
  id: number;
  title: string;
  titleEn: string;
  rows: number;
  chemicals: string[];
  speedMultiplier: number;
  targetScore: number;
}

// ── ION REACTION LEVELS ──
export const ION_LEVELS: LevelConfig[] = [
  { id: 1, title: 'Trung Hòa', titleEn: 'The Neutralizer', rows: 4, chemicals: ['Ag+', 'H+', 'CO32-', 'OH-', 'S2-'], speedMultiplier: 1.2, targetScore: 20000 },
  { id: 2, title: 'Vỏ Bọc Nặng', titleEn: 'Heavy Shells', rows: 4, chemicals: ['Pb2+', 'Ca2+', 'CO32-', 'PO43-', 'S2-'], speedMultiplier: 1.4, targetScore: 40000 },
  { id: 3, title: 'Đồng Iot', titleEn: 'Copper Iodide', rows: 4, chemicals: ['Pb2+', 'Cu2+', 'OH-', 'I-', 'SO32-'], speedMultiplier: 1.6, targetScore: 60000 },
  { id: 4, title: 'Sắt & Đồng', titleEn: 'Iron-Copper Quest', rows: 4, chemicals: ['Ni2+', 'Fe2+', 'CO32-', 'PO43-', 'S2-'], speedMultiplier: 1.8, targetScore: 80000 },
  { id: 5, title: 'Lõi Magie', titleEn: 'Magnesium Core', rows: 4, chemicals: ['Mn2+', 'Mg2+', 'CO32-', 'PO43-', 'S2-'], speedMultiplier: 1.8, targetScore: 100000 },
  { id: 6, title: 'Bazơ Lưỡng Tính', titleEn: 'Amphoteric Base', rows: 4, chemicals: ['Zn2+', 'Cr3+', 'CO32-', 'OH-', 'PO43-'], speedMultiplier: 2.0, targetScore: 120000 },
  { id: 7, title: 'Bẫy Halogen', titleEn: 'Halogen Trap', rows: 4, chemicals: ['Ag+', 'Pb2+', 'Br-', 'I-', 'Cl-'], speedMultiplier: 2.0, targetScore: 140000 },
  { id: 8, title: 'Bari & Amoniac', titleEn: 'Barium & Ammonia', rows: 4, chemicals: ['Ba2+', 'NH4+', 'SO42-', 'CO32-', 'OH-'], speedMultiplier: 2.0, targetScore: 160000 },
  { id: 9, title: 'Bạc Silicat', titleEn: 'Silver Silicate', rows: 4, chemicals: ['Ag+', 'Ba2+', 'PO43-', 'SO32-'], speedMultiplier: 2.0, targetScore: 180000 },
  { id: 10, title: 'Sắt(III) Silicat', titleEn: 'Ferric Silicate', rows: 4, chemicals: ['Mn2+', 'Fe3+', 'OH-', 'SO32-', 'CrO42-'], speedMultiplier: 2.0, targetScore: 200000 },
  { id: 11, title: 'Sunfua Hoạt Động', titleEn: 'Active Sulfides', rows: 4, chemicals: ['Zn2+', 'Al3+', 'S2-', 'SO32-', 'CrO42-'], speedMultiplier: 2.0, targetScore: 220000 },
  { id: 12, title: 'Nước Cứng Axit', titleEn: 'Acidic Hard Water', rows: 4, chemicals: ['Ca2+', 'Mg2+', 'H+', 'SO32-', 'OH-'], speedMultiplier: 2.0, targetScore: 240000 },
  { id: 13, title: 'Hỗn Hợp Silicat', titleEn: 'Silicate Mix', rows: 4, chemicals: ['Mn2+', 'Ni2+', 'Mg2+', 'SiO32-', 'F-'], speedMultiplier: 2.2, targetScore: Infinity },
];

// ── METAL LEVELS ──
export const METAL_LEVELS: LevelConfig[] = [
  { id: 1, title: 'Khởi Động', titleEn: 'Warm Up', rows: 4, chemicals: ['Mg', 'Zn', 'Al3+', 'Fe2+'], speedMultiplier: 1.1, targetScore: 15000 },
  { id: 2, title: 'Bắt Đầu', titleEn: 'Getting Started', rows: 4, chemicals: ['Al', 'Zn', 'Ni2+', 'Pb2+'], speedMultiplier: 1.2, targetScore: 30000 },
  { id: 3, title: 'Trận Chiến Nhỏ', titleEn: 'Local Battle', rows: 4, chemicals: ['Fe', 'Pb', 'Ni2+', 'Cu2+'], speedMultiplier: 1.4, targetScore: 50000 },
  { id: 4, title: 'Áp Lực Tăng', titleEn: 'Rising Pressure', rows: 4, chemicals: ['Mg', 'Al', 'Zn', 'Fe2+', 'Ni2+', 'Pb2+'], speedMultiplier: 1.6, targetScore: 70000 },
  { id: 5, title: 'Kiểm Soát', titleEn: 'Control', rows: 4, chemicals: ['Zn', 'Fe', 'Ni', 'Pb2+', 'Cu2+', 'Ag+'], speedMultiplier: 1.8, targetScore: 90000 },
  { id: 6, title: 'Nghệ Thuật Chọn', titleEn: 'Art of Choice', rows: 4, chemicals: ['Mg', 'Zn', 'Ni', 'Al3+', 'Fe2+', 'Pb2+'], speedMultiplier: 2.0, targetScore: 110000 },
  { id: 7, title: 'Tính Toán Nhanh', titleEn: 'Smart Calc', rows: 4, chemicals: ['Fe', 'Cu', 'Pb', 'Ni2+', 'Cu2+', 'Ag+'], speedMultiplier: 2.0, targetScore: 130000 },
  { id: 8, title: 'Dây Chuyền', titleEn: 'Chain Reaction', rows: 4, chemicals: ['Al', 'Fe', 'Cu', 'Zn2+', 'Ni2+', 'Ag+'], speedMultiplier: 2.0, targetScore: 150000 },
  { id: 9, title: 'Chiến Dịch Dài', titleEn: 'Long Campaign', rows: 4, chemicals: ['Mg', 'Ni', 'Pb', 'Al3+', 'Cu2+', 'Ag+'], speedMultiplier: 2.0, targetScore: 170000 },
  { id: 10, title: 'Bậc Thầy', titleEn: 'Reaction Master', rows: 4, chemicals: ['Al', 'Cu', 'Fe2+', 'Pb2+', 'Ag+'], speedMultiplier: 2.2, targetScore: Infinity },
];

// ── ORGANIC LEVELS ──
export const ORGANIC_LEVELS: LevelConfig[] = [
  { id: 1, title: 'Mở Đầu Hữu Cơ', titleEn: 'Organic Start', rows: 4, chemicals: ['C2H4', 'H2O', 'CH4', 'Cl2_askt'], speedMultiplier: 1.2, targetScore: 15000 },
  { id: 2, title: 'Axit & Kết Tủa', titleEn: 'Acid & Precipitate', rows: 4, chemicals: ['C2H4', 'HCl', 'C2H2', 'AgNO3_NH3'], speedMultiplier: 1.4, targetScore: 30000 },
  { id: 3, title: 'Cộng & Khử', titleEn: 'Add & Reduce', rows: 4, chemicals: ['CH3COCH3', 'CH3CHO', 'C2H4', 'H2_Ni', 'CH3COOH', 'Na'], speedMultiplier: 1.6, targetScore: 45000 },
  { id: 4, title: 'Thế Thơm', titleEn: 'Aromatic Subst.', rows: 4, chemicals: ['C6H5CH3', 'Br2_Fe', 'CH3COOH', 'NaOH', 'C2H5OH', 'Na'], speedMultiplier: 1.8, targetScore: 60000 },
  { id: 5, title: 'Thủy Phân', titleEn: 'Hydrolysis', rows: 4, chemicals: ['HCOOCH3', 'HCOOH', 'C2H5Cl', 'NaOH_t', 'AgNO3_NH3'], speedMultiplier: 2.0, targetScore: 75000 },
  { id: 6, title: 'Bão Hydro', titleEn: 'Hydrogen Storm', rows: 4, chemicals: ['CH3COCH3', 'C2H4', 'C6H5OH', 'H2_Ni', 'Br2'], speedMultiplier: 2.0, targetScore: 90000 },
  { id: 7, title: 'Sáng & Tối', titleEn: 'Light & Dark', rows: 4, chemicals: ['CH4', 'Cl2_askt', 'C6H6', 'Br2_Fe'], speedMultiplier: 2.0, targetScore: 110000 },
  { id: 8, title: 'Đa Chức', titleEn: 'Multi-Function', rows: 4, chemicals: ['C6H5OH', 'C2H4', 'CH3COOH', 'Br2', 'NaOH'], speedMultiplier: 2.0, targetScore: 130000 },
  { id: 9, title: 'Lựa Chọn Khó', titleEn: 'Critical Choice', rows: 4, chemicals: ['C6H5CH3', 'C6H6', 'CH3COOH', 'KMnO4_t', 'Br2_Fe', 'NaOH'], speedMultiplier: 2.0, targetScore: 150000 },
  { id: 10, title: 'Chuỗi Cuối Cùng', titleEn: 'Final Chain', rows: 4, chemicals: ['CH4', 'C2H4', 'Br2', 'CH3COOH', 'NaOH'], speedMultiplier: 2.2, targetScore: Infinity },
];

// ── NONMETAL LEVELS ──
export const NONMETAL_LEVELS: LevelConfig[] = [
  { id: 1, title: 'Phản Ứng Cơ Bản', titleEn: 'Basic Reactions', rows: 4, chemicals: ['H2', 'O2', 'Cl2', 'Na'], speedMultiplier: 1.2, targetScore: 12000 },
  { id: 2, title: 'Dãy Halogen', titleEn: 'Halogen Series', rows: 4, chemicals: ['Cl2', 'Br2', 'I2', 'Na', 'Ca'], speedMultiplier: 1.4, targetScore: 28000 },
  { id: 3, title: 'Trận Chiến Oxit', titleEn: 'Oxide Battle', rows: 4, chemicals: ['O2', 'C', 'S', 'P', 'Na'], speedMultiplier: 1.6, targetScore: 44000 },
  { id: 4, title: 'Kim Loại Gặp Khí', titleEn: 'Metal Meets Gas', rows: 4, chemicals: ['H2', 'Cl2', 'O2', 'Fe', 'Cu', 'Al'], speedMultiplier: 1.8, targetScore: 60000 },
  { id: 5, title: 'Đẩy Nhau', titleEn: 'Displacement', rows: 4, chemicals: ['Cl2', 'Br2', 'I2', 'Br-', 'I-', 'Na', 'Mg'], speedMultiplier: 2.0, targetScore: 80000 },
  { id: 6, title: 'Hỗn Hợp Phi Kim', titleEn: 'Mixed NonMetal', rows: 4, chemicals: ['H2', 'O2', 'N2', 'S', 'C', 'Cl2'], speedMultiplier: 2.0, targetScore: 100000 },
  { id: 7, title: 'Combo Nâng Cao', titleEn: 'Advanced Combo', rows: 4, chemicals: ['H2', 'Cl2', 'Br2', 'I2', 'O2', 'Na', 'Zn'], speedMultiplier: 2.0, targetScore: 120000 },
  { id: 8, title: 'Phản Ứng Dung Dịch', titleEn: 'Solution React', rows: 4, chemicals: ['Cl2', 'H2O', 'NaOH', 'Br2', 'I2'], speedMultiplier: 2.0, targetScore: 140000 },
  { id: 9, title: 'Toàn Diện', titleEn: 'Full Spectrum', rows: 4, chemicals: ['H2', 'O2', 'Cl2', 'Br2', 'I2', 'S', 'Na', 'Fe'], speedMultiplier: 2.0, targetScore: 160000 },
  { id: 10, title: 'Đại Kiện Tướng', titleEn: 'Grandmaster', rows: 4, chemicals: ['Cl2', 'Br2', 'I2', 'O2', 'H2', 'S', 'C', 'P', 'Na', 'Fe'], speedMultiplier: 2.2, targetScore: Infinity },
];

export type GameMode = 'ion' | 'metal' | 'organic' | 'nonmetal';

export function getLevelsForMode(mode: GameMode): LevelConfig[] {
  switch (mode) {
    case 'ion': return ION_LEVELS;
    case 'metal': return METAL_LEVELS;
    case 'organic': return ORGANIC_LEVELS;
    case 'nonmetal': return NONMETAL_LEVELS;
  }
}

export function getLevelConfig(mode: GameMode, level: number): LevelConfig {
  const levels = getLevelsForMode(mode);
  return levels[(level - 1) % levels.length];
}
