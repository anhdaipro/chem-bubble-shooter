export type IonType = 'cation' | 'anion' | 'metal' | 'nonmetal' | 'compound';

export interface ChemicalEntity {
  id: string;        // ID định danh (ví dụ: 'Ba2+')
  symbol: string;    // Ký hiệu hiển thị (ví dụ: 'Ba²⁺')
  rawSymbol: string; // Ký hiệu gốc để tra bảng (ví dụ: 'Ba')
  type: IonType;
  color: string;
  glowColor: string;
  textColor: string;
}

export const CHEMICALS: Record<string, ChemicalEntity> = {
  // --- Cations (Dương) ---
  'H+': { id: 'H+', symbol: 'H⁺', rawSymbol: 'H', type: 'cation', color: '#B31217', glowColor: '#E63946', textColor: '#FFFFFF' },
  'Na+': { id: 'Na+', symbol: 'Na⁺', rawSymbol: 'Na', type: 'cation', color: '#FFFFFF', glowColor: '#F8F9FA', textColor: '#1A1C1E' },
  'K+': { id: 'K+', symbol: 'K⁺', rawSymbol: 'K', type: 'cation', color: '#E0E1DD', glowColor: '#FFFFFF', textColor: '#1A1C1E' },
  'NH4+': { id: 'NH4+', symbol: 'NH₄⁺', rawSymbol: 'NH4', type: 'cation', color: '#F1F1F1', glowColor: '#FFFFFF', textColor: '#1A1C1E' },
  'Ba2+': { id: 'Ba2+', symbol: 'Ba²⁺', rawSymbol: 'Ba', type: 'cation', color: '#F8F9FA', glowColor: '#DEE2E6', textColor: '#1A1C1E' },
  'Ca2+': { id: 'Ca2+', symbol: 'Ca²⁺', rawSymbol: 'Ca', type: 'cation', color: '#FFFFFF', glowColor: '#F1F1F1', textColor: '#1A1C1E' },
  'Mg2+': { id: 'Mg2+', symbol: 'Mg²⁺', rawSymbol: 'Mg', type: 'cation', color: '#C0C0C0', glowColor: '#E8E8E8', textColor: '#1A1C1E' },
  'Cu2+': { id: 'Cu2+', symbol: 'Cu²⁺', rawSymbol: 'Cu', type: 'cation', color: '#007FFF', glowColor: '#00BFFF', textColor: '#FFFFFF' },
  'Fe2+': { id: 'Fe2+', symbol: 'Fe²⁺', rawSymbol: 'Fe', type: 'cation', color: '#00A86B', glowColor: '#4AD66D', textColor: '#FFFFFF' },
  'Ag+': { id: 'Ag+', symbol: 'Ag⁺', rawSymbol: 'Ag', type: 'cation', color: '#A8B0B8', glowColor: '#E0E1DD', textColor: '#1A1C1E' },
  'Al3+': { id: 'Al3+', symbol: 'Al³⁺', rawSymbol: 'Al', type: 'cation', color: '#7EB2DD', glowColor: '#A9D1EE', textColor: '#1A1C1E' },
  'Zn2+': { id: 'Zn2+', symbol: 'Zn²⁺', rawSymbol: 'Zn', type: 'cation', color: '#F5F5F5', glowColor: '#E8E8E8', textColor: '#1A1C1E' },
  'Pb2+': { id: 'Pb2+', symbol: 'Pb²⁺', rawSymbol: 'Pb', type: 'cation', color: '#666666', glowColor: '#999999', textColor: '#FFFFFF' },
  'Sn2+': { id: 'Sn2+', symbol: 'Sn²⁺', rawSymbol: 'Sn', type: 'cation', color: '#D3D3D3', glowColor: '#E8E8E8', textColor: '#1A1C1E' },
  'Fe3+': { id: 'Fe3+', symbol: 'Fe³⁺', rawSymbol: 'Fe', type: 'cation', color: '#8B4513', glowColor: '#A0522D', textColor: '#FFFFFF' },
  'Ni2+': { id: 'Ni2+', symbol: 'Ni²⁺', rawSymbol: 'Ni', type: 'cation', color: '#32CD32', glowColor: '#90EE90', textColor: '#1A1C1E' },
  'Cr3+': { id: 'Cr3+', symbol: 'Cr³⁺', rawSymbol: 'Cr', type: 'cation', color: '#9370DB', glowColor: '#BA55D3', textColor: '#FFFFFF' },
  'Mn2+': { id: 'Mn2+', symbol: 'Mn²⁺', rawSymbol: 'Mn', type: 'cation', color: '#FFB6C1', glowColor: '#FFC0CB', textColor: '#1A1C1E' },

  // --- Anions (Âm) ---
  'OH-': { id: 'OH-', symbol: 'OH⁻', rawSymbol: 'OH', type: 'anion', color: '#0F52BA', glowColor: '#4895EF', textColor: '#FFFFFF' },
  'Cl-': { id: 'Cl-', symbol: 'Cl⁻', rawSymbol: 'Cl', type: 'anion', color: '#B5E48C', glowColor: '#D9ED92', textColor: '#1A1C1E' },
  'Br-': { id: 'Br-', symbol: 'Br⁻', rawSymbol: 'Br', type: 'anion', color: '#F4A261', glowColor: '#E76F51', textColor: '#1A1C1E' },
  'I-': { id: 'I-', symbol: 'I⁻', rawSymbol: 'I', type: 'anion', color: '#9D4EDD', glowColor: '#C77DFF', textColor: '#FFFFFF' },
  'NO3-': { id: 'NO3-', symbol: 'NO₃⁻', rawSymbol: 'NO3', type: 'anion', color: '#FFFFFF', glowColor: '#F8F9FA', textColor: '#1A1C1E' },
  'CO32-': { id: 'CO32-', symbol: 'CO₃²⁻', rawSymbol: 'CO3', type: 'anion', color: '#E5E5E5', glowColor: '#F8F9FA', textColor: '#1A1C1E' },
  'SO42-': { id: 'SO42-', symbol: 'SO₄²⁻', rawSymbol: 'SO4', type: 'anion', color: '#4A4E69', glowColor: '#9A8C98', textColor: '#FFFFFF' },
  'SO32-': { id: 'SO32-', symbol: 'SO₃²⁻', rawSymbol: 'SO3', type: 'anion', color: '#8D99AE', glowColor: '#EDF2F4', textColor: '#1A1C1E' },
  'PO43-': { id: 'PO43-', symbol: 'PO₄³⁻', rawSymbol: 'PO4', type: 'anion', color: '#FF9F1C', glowColor: '#FFBF69', textColor: '#1A1C1E' },
  'S2-': { id: 'S2-', symbol: 'S²⁻', rawSymbol: 'S', type: 'anion', color: '#2D3142', glowColor: '#4F5D75', textColor: '#FFFFFF' },
  'CH3COO-': { id: 'CH3COO-', symbol: 'CH₃COO⁻', rawSymbol: 'CH3COO', type: 'anion', color: '#A5A58D', glowColor: '#DDBEA9', textColor: '#1A1C1E' },
  'CrO42-': { id: 'CrO42-', symbol: 'CrO₄²⁻', rawSymbol: 'CrO4', type: 'anion', color: '#FFD700', glowColor: '#FFFF00', textColor: '#1A1C1E' },
  'Cr2O72-': { id: 'Cr2O72-', symbol: 'Cr₂O₇²⁻', rawSymbol: 'Cr2O7', type: 'anion', color: '#FF8C00', glowColor: '#FFA500', textColor: '#FFFFFF' },
  'MnO4-': { id: 'MnO4-', symbol: 'MnO₄⁻', rawSymbol: 'MnO4', type: 'anion', color: '#800080', glowColor: '#9932CC', textColor: '#FFFFFF' },
  'F-': { id: 'F-', symbol: 'F⁻', rawSymbol: 'F', type: 'anion', color: '#E0FFFF', glowColor: '#F0FFFF', textColor: '#1A1C1E' },
  'SiO32-': { id: 'SiO32-', symbol: 'SiO₃²⁻', rawSymbol: 'SiO3', type: 'anion', color: '#6B7280', glowColor: '#9CA3AF', textColor: '#FFFFFF' },
  'HCO3-': { id: 'HCO3-', symbol: 'HCO₃⁻', rawSymbol: 'HCO3', type: 'anion', color: '#D1D5DB', glowColor: '#E5E7EB', textColor: '#1A1C1E' },
  'HSO4-': { id: 'HSO4-', symbol: 'HSO₄⁻', rawSymbol: 'HSO4', type: 'anion', color: '#4B5563', glowColor: '#6B7280', textColor: '#FFFFFF' },
  'H2PO4-': { id: 'H2PO4-', symbol: 'H₂PO₄⁻', rawSymbol: 'H2PO4', type: 'anion', color: '#F59E0B', glowColor: '#FBBF24', textColor: '#1A1C1E' },
  // --- Metals (Kim loại) ---
  'K': { id: 'K', symbol: 'K', rawSymbol: 'K', type: 'metal', color: '#DDA0DD', glowColor: '#EBA8EB', textColor: '#1A1C1E' }, // Violet hint
  'Ba': { id: 'Ba', symbol: 'Ba', rawSymbol: 'Ba', type: 'metal', color: '#B4E0B4', glowColor: '#C8E6C9', textColor: '#1A1C1E' }, // Green hint
  'Ca': { id: 'Ca', symbol: 'Ca', rawSymbol: 'Ca', type: 'metal', color: '#FFBCA5', glowColor: '#FFDAB9', textColor: '#1A1C1E' }, // Brick-red hint
  'Na': { id: 'Na', symbol: 'Na', rawSymbol: 'Na', type: 'metal', color: '#FDE047', glowColor: '#FEF08A', textColor: '#1A1C1E' }, // Yellow hint
  'Mg': { id: 'Mg', symbol: 'Mg', rawSymbol: 'Mg', type: 'metal', color: '#F8F9FA', glowColor: '#FFFFFF', textColor: '#1A1C1E' }, // Bright white
  'Al': { id: 'Al', symbol: 'Al', rawSymbol: 'Al', type: 'metal', color: '#B0C4DE', glowColor: '#D3D3D3', textColor: '#1A1C1E' }, // Classic Light Steel Blue
  'Zn': { id: 'Zn', symbol: 'Zn', rawSymbol: 'Zn', type: 'metal', color: '#A5C2D6', glowColor: '#B0E0E6', textColor: '#1A1C1E' }, // Bluish-white
  'Fe': { id: 'Fe', symbol: 'Fe', rawSymbol: 'Fe', type: 'metal', color: '#606A70', glowColor: '#708090', textColor: '#FFFFFF' }, // Dark iron grey
  'Ni': { id: 'Ni', symbol: 'Ni', rawSymbol: 'Ni', type: 'metal', color: '#A3B19B', glowColor: '#C4D4BC', textColor: '#1A1C1E' }, // Greenish-grey
  'Pb': { id: 'Pb', symbol: 'Pb', rawSymbol: 'Pb', type: 'metal', color: '#4A555C', glowColor: '#5A6B73', textColor: '#FFFFFF' }, // Dark lead grey
  'Sn': { id: 'Sn', symbol: 'Sn', rawSymbol: 'Sn', type: 'metal', color: '#D1D5DB', glowColor: '#E5E7EB', textColor: '#1A1C1E' }, // Bright tin silver
  'Cu': { id: 'Cu', symbol: 'Cu', rawSymbol: 'Cu', type: 'metal', color: '#B87333', glowColor: '#CD7F32', textColor: '#FFFFFF' }, // Copper
  'Ag': { id: 'Ag', symbol: 'Ag', rawSymbol: 'Ag', type: 'metal', color: '#E0E0E0', glowColor: '#F5F5F5', textColor: '#1A1C1E' }, // Shiny Silver

  // --- Non-Metals (Phi kim) ---
  'Cl2': { id: 'Cl2', symbol: 'Cl₂', rawSymbol: 'Cl2', type: 'nonmetal', color: '#8AC926', glowColor: '#B5E48C', textColor: '#1A1C1E' },
  'Br2': { id: 'Br2', symbol: 'Br₂', rawSymbol: 'Br2', type: 'nonmetal', color: '#D62828', glowColor: '#F77F00', textColor: '#FFFFFF' },
  'I2': { id: 'I2', symbol: 'I₂', rawSymbol: 'I2', type: 'nonmetal', color: '#7209B7', glowColor: '#B5179E', textColor: '#FFFFFF' },
  'O2': { id: 'O2', symbol: 'O₂', rawSymbol: 'O2', type: 'nonmetal', color: '#0EA5E9', glowColor: '#38BDF8', textColor: '#FFFFFF' },
  'H2': { id: 'H2', symbol: 'H₂', rawSymbol: 'H2', type: 'nonmetal', color: '#F87171', glowColor: '#FCA5A5', textColor: '#FFFFFF' },
  'N2': { id: 'N2', symbol: 'N₂', rawSymbol: 'N2', type: 'nonmetal', color: '#3B82F6', glowColor: '#60A5FA', textColor: '#FFFFFF' },
  'S': { id: 'S', symbol: 'S', rawSymbol: 'S', type: 'nonmetal', color: '#EAB308', glowColor: '#FDE047', textColor: '#1A1C1E' },
  'C': { id: 'C', symbol: 'C', rawSymbol: 'C', type: 'nonmetal', color: '#374151', glowColor: '#4B5563', textColor: '#FFFFFF' },
  'P': { id: 'P', symbol: 'P', rawSymbol: 'P', type: 'nonmetal', color: '#DC2626', glowColor: '#EF4444', textColor: '#FFFFFF' },

  // Level 2 Non-Metals
  'N': { id: 'N', symbol: 'N', rawSymbol: 'N', type: 'nonmetal', color: '#60A5FA', glowColor: '#93C5FD', textColor: '#1A1C1E' },
  'O': { id: 'O', symbol: 'O', rawSymbol: 'O', type: 'nonmetal', color: '#0EA5E9', glowColor: '#38BDF8', textColor: '#FFFFFF' },
  'F': { id: 'F', symbol: 'F', rawSymbol: 'F', type: 'nonmetal', color: '#FEF08A', glowColor: '#FEF9C3', textColor: '#1A1C1E' },
  'Cl': { id: 'Cl', symbol: 'Cl', rawSymbol: 'Cl', type: 'nonmetal', color: '#A3E635', glowColor: '#BEF264', textColor: '#1A1C1E' },
  'Br': { id: 'Br', symbol: 'Br', rawSymbol: 'Br', type: 'nonmetal', color: '#EA580C', glowColor: '#F97316', textColor: '#FFFFFF' },
  'I': { id: 'I', symbol: 'I', rawSymbol: 'I', type: 'nonmetal', color: '#7C3AED', glowColor: '#8B5CF6', textColor: '#FFFFFF' },
  'Si': { id: 'Si', symbol: 'Si', rawSymbol: 'Si', type: 'nonmetal', color: '#4B5563', glowColor: '#6B7280', textColor: '#FFFFFF' },

  // Level 3 Metals
  'Au': { id: 'Au', symbol: 'Au', rawSymbol: 'Au', type: 'metal', color: '#D97706', glowColor: '#F59E0B', textColor: '#FFFFFF' },
  'Hg': { id: 'Hg', symbol: 'Hg', rawSymbol: 'Hg', type: 'metal', color: '#9CA3AF', glowColor: '#D1D5DB', textColor: '#1A1C1E' },
  'Pt': { id: 'Pt', symbol: 'Pt', rawSymbol: 'Pt', type: 'metal', color: '#E5E7EB', glowColor: '#F3F4F6', textColor: '#1A1C1E' },
  'Cr': { id: 'Cr', symbol: 'Cr', rawSymbol: 'Cr', type: 'metal', color: '#6B7280', glowColor: '#9CA3AF', textColor: '#FFFFFF' },
  'Mn': { id: 'Mn', symbol: 'Mn', rawSymbol: 'Mn', type: 'metal', color: '#8B5CF6', glowColor: '#A78BFA', textColor: '#FFFFFF' },

  // Level 13 Elements
  'Li': { id: 'Li', symbol: 'Li', rawSymbol: 'Li', type: 'metal', color: '#FCA5A5', glowColor: '#FECACA', textColor: '#1A1C1E' },
  'Be': { id: 'Be', symbol: 'Be', rawSymbol: 'Be', type: 'metal', color: '#E5E7EB', glowColor: '#F3F4F6', textColor: '#1A1C1E' },
  'B': { id: 'B', symbol: 'B', rawSymbol: 'B', type: 'nonmetal', color: '#D1D5DB', glowColor: '#E5E7EB', textColor: '#1A1C1E' },
  'He': { id: 'He', symbol: 'He', rawSymbol: 'He', type: 'nonmetal', color: '#FDE047', glowColor: '#FEF08A', textColor: '#1A1C1E' },
  'Ne': { id: 'Ne', symbol: 'Ne', rawSymbol: 'Ne', type: 'nonmetal', color: '#F87171', glowColor: '#FCA5A5', textColor: '#FFFFFF' },
  'Ar': { id: 'Ar', symbol: 'Ar', rawSymbol: 'Ar', type: 'nonmetal', color: '#C084FC', glowColor: '#D8B4FE', textColor: '#FFFFFF' },
  'Kr': { id: 'Kr', symbol: 'Kr', rawSymbol: 'Kr', type: 'nonmetal', color: '#818CF8', glowColor: '#A5B4FC', textColor: '#FFFFFF' },
  'Xe': { id: 'Xe', symbol: 'Xe', rawSymbol: 'Xe', type: 'nonmetal', color: '#60A5FA', glowColor: '#93C5FD', textColor: '#FFFFFF' },
  'Rb': { id: 'Rb', symbol: 'Rb', rawSymbol: 'Rb', type: 'metal', color: '#F87171', glowColor: '#FCA5A5', textColor: '#FFFFFF' },
  'Cs': { id: 'Cs', symbol: 'Cs', rawSymbol: 'Cs', type: 'metal', color: '#60A5FA', glowColor: '#93C5FD', textColor: '#FFFFFF' },
  'Sr': { id: 'Sr', symbol: 'Sr', rawSymbol: 'Sr', type: 'metal', color: '#EF4444', glowColor: '#F87171', textColor: '#FFFFFF' },
  'Ti': { id: 'Ti', symbol: 'Ti', rawSymbol: 'Ti', type: 'metal', color: '#9CA3AF', glowColor: '#D1D5DB', textColor: '#1A1C1E' },
  'V': { id: 'V', symbol: 'V', rawSymbol: 'V', type: 'metal', color: '#A78BFA', glowColor: '#C4B5FD', textColor: '#1A1C1E' },
  'Co': { id: 'Co', symbol: 'Co', rawSymbol: 'Co', type: 'metal', color: '#3B82F6', glowColor: '#60A5FA', textColor: '#FFFFFF' },


  // --- Compounds (Hợp chất đặc biệt) ---
  'H2O': { id: 'H2O', symbol: 'H₂O', rawSymbol: 'H2O', type: 'compound', color: '#38BDF8', glowColor: '#7DD3FC', textColor: '#FFFFFF' },
  'NaOH': { id: 'NaOH', symbol: 'NaOH', rawSymbol: 'NaOH', type: 'compound', color: '#F472B6', glowColor: '#FBCFE8', textColor: '#1A1C1E' },
  'HCl': { id: 'HCl', symbol: 'HCl', rawSymbol: 'HCl', type: 'compound', color: '#22C55E', glowColor: '#86EFAC', textColor: '#1A1C1E' },
  'CO2': { id: 'CO2', symbol: 'CO₂', rawSymbol: 'CO2', type: 'compound', color: '#9CA3AF', glowColor: '#D1D5DB', textColor: '#1A1C1E' },

  // Level 6 Compounds
  'SO2': { id: 'SO2', symbol: 'SO₂', rawSymbol: 'SO2', type: 'compound', color: '#9CA3AF', glowColor: '#D1D5DB', textColor: '#1A1C1E' },
  'H2SO4': { id: 'H2SO4', symbol: 'H₂SO₄', rawSymbol: 'H2SO4', type: 'compound', color: '#EF4444', glowColor: '#F87171', textColor: '#FFFFFF' },
  'Ca(OH)2': { id: 'Ca(OH)2', symbol: 'Ca(OH)₂', rawSymbol: 'Ca(OH)2', type: 'compound', color: '#E5E7EB', glowColor: '#F3F4F6', textColor: '#1A1C1E' },
  'NaCl': { id: 'NaCl', symbol: 'NaCl', rawSymbol: 'NaCl', type: 'compound', color: '#FFFFFF', glowColor: '#F9FAFB', textColor: '#1A1C1E' },
  'CaCO3': { id: 'CaCO3', symbol: 'CaCO₃', rawSymbol: 'CaCO3', type: 'compound', color: '#F3F4F6', glowColor: '#FFFFFF', textColor: '#1A1C1E' },
  'CuO': { id: 'CuO', symbol: 'CuO', rawSymbol: 'CuO', type: 'compound', color: '#1F2937', glowColor: '#374151', textColor: '#FFFFFF' },
  'Fe2O3': { id: 'Fe2O3', symbol: 'Fe₂O₃', rawSymbol: 'Fe2O3', type: 'compound', color: '#9A3412', glowColor: '#C2410C', textColor: '#FFFFFF' },
  'NH3': { id: 'NH3', symbol: 'NH₃', rawSymbol: 'NH3', type: 'compound', color: '#60A5FA', glowColor: '#93C5FD', textColor: '#1A1C1E' },
  'CH4': { id: 'CH4', symbol: 'CH₄', rawSymbol: 'CH4', type: 'compound', color: '#34D399', glowColor: '#6EE7B7', textColor: '#1A1C1E' },
  'C2H4': { id: 'C2H4', symbol: 'C₂H₄', rawSymbol: 'C2H4', type: 'compound', color: '#10B981', glowColor: '#34D399', textColor: '#FFFFFF' },
  'C2H2': { id: 'C2H2', symbol: 'C₂H₂', rawSymbol: 'C2H2', type: 'compound', color: '#059669', glowColor: '#10B981', textColor: '#FFFFFF' },
  'C6H6': { id: 'C6H6', symbol: 'C₆H₆', rawSymbol: 'C6H6', type: 'compound', color: '#2563EB', glowColor: '#3B82F6', textColor: '#FFFFFF' },
  // --- Auto-added missing compounds ---
  'KMnO4': { id: 'KMnO4', symbol: 'KMnO₄', rawSymbol: 'KMnO4', type: 'compound', color: '#8B5CF6', glowColor: '#A78BFA', textColor: '#FFFFFF' },
  'KClO3': { id: 'KClO3', symbol: 'KClO₃', rawSymbol: 'KClO3', type: 'compound', color: '#E2E8F0', glowColor: '#F1F5F9', textColor: '#1A1C1E' },
  'MnO2': { id: 'MnO2', symbol: 'MnO₂', rawSymbol: 'MnO2', type: 'compound', color: '#1F2937', glowColor: '#374151', textColor: '#FFFFFF' },
  'Al2O3': { id: 'Al2O3', symbol: 'Al₂O₃', rawSymbol: 'Al2O3', type: 'compound', color: '#E5E7EB', glowColor: '#F3F4F6', textColor: '#1A1C1E' },
  'ZnO': { id: 'ZnO', symbol: 'ZnO', rawSymbol: 'ZnO', type: 'compound', color: '#F8F9FA', glowColor: '#FFFFFF', textColor: '#1A1C1E' },
  'MgO': { id: 'MgO', symbol: 'MgO', rawSymbol: 'MgO', type: 'compound', color: '#F1F5F9', glowColor: '#F8FAFC', textColor: '#1A1C1E' },
  'BaSO4': { id: 'BaSO4', symbol: 'BaSO₄', rawSymbol: 'BaSO4', type: 'compound', color: '#E2E8F0', glowColor: '#F1F5F9', textColor: '#1A1C1E' },
  'AgCl': { id: 'AgCl', symbol: 'AgCl', rawSymbol: 'AgCl', type: 'compound', color: '#CBD5E1', glowColor: '#E2E8F0', textColor: '#1A1C1E' },
  'CuSO4': { id: 'CuSO4', symbol: 'CuSO₄', rawSymbol: 'CuSO4', type: 'compound', color: '#3B82F6', glowColor: '#60A5FA', textColor: '#FFFFFF' },
  'FeCl2': { id: 'FeCl2', symbol: 'FeCl₂', rawSymbol: 'FeCl2', type: 'compound', color: '#A7F3D0', glowColor: '#6EE7B7', textColor: '#1A1C1E' },
  'FeCl3': { id: 'FeCl3', symbol: 'FeCl₃', rawSymbol: 'FeCl3', type: 'compound', color: '#D97706', glowColor: '#F59E0B', textColor: '#FFFFFF' },
  'AlCl3': { id: 'AlCl3', symbol: 'AlCl₃', rawSymbol: 'AlCl3', type: 'compound', color: '#FEF3C7', glowColor: '#FEF9C3', textColor: '#1A1C1E' },
  'K2Cr2O7': { id: 'K2Cr2O7', symbol: 'K₂Cr₂O₇', rawSymbol: 'K2Cr2O7', type: 'compound', color: '#EA580C', glowColor: '#FB923C', textColor: '#FFFFFF' },
  'K2CrO4': { id: 'K2CrO4', symbol: 'K₂CrO₄', rawSymbol: 'K2CrO4', type: 'compound', color: '#FACC15', glowColor: '#FEF08A', textColor: '#1A1C1E' },
  'HNO3': { id: 'HNO3', symbol: 'HNO₃', rawSymbol: 'HNO3', type: 'compound', color: '#FEF9C3', glowColor: '#FEFCE8', textColor: '#1A1C1E' },
  'H3PO4': { id: 'H3PO4', symbol: 'H₃PO₄', rawSymbol: 'H3PO4', type: 'compound', color: '#F1F5F9', glowColor: '#F8FAFC', textColor: '#1A1C1E' },
  'AgNO3': { id: 'AgNO3', symbol: 'AgNO₃', rawSymbol: 'AgNO3', type: 'compound', color: '#F8F9FA', glowColor: '#FFFFFF', textColor: '#1A1C1E' },
  'BaCl2': { id: 'BaCl2', symbol: 'BaCl₂', rawSymbol: 'BaCl2', type: 'compound', color: '#E5E7EB', glowColor: '#F3F4F6', textColor: '#1A1C1E' },
  'KNO3': { id: 'KNO3', symbol: 'KNO₃', rawSymbol: 'KNO3', type: 'compound', color: '#E2E8F0', glowColor: '#F1F5F9', textColor: '#1A1C1E' },
  'Na2CO3': { id: 'Na2CO3', symbol: 'Na₂CO₃', rawSymbol: 'Na2CO3', type: 'compound', color: '#F8FAFC', glowColor: '#FFFFFF', textColor: '#1A1C1E' },
  'Fe3O4': { id: 'Fe3O4', symbol: 'Fe₃O₄', rawSymbol: 'Fe3O4', type: 'compound', color: '#111827', glowColor: '#1F2937', textColor: '#FFFFFF' },
  'SiO2': { id: 'SiO2', symbol: 'SiO₂', rawSymbol: 'SiO2', type: 'compound', color: '#FDE68A', glowColor: '#FEF08A', textColor: '#1A1C1E' },
  'P2O5': { id: 'P2O5', symbol: 'P₂O₅', rawSymbol: 'P2O5', type: 'compound', color: '#F9FAFB', glowColor: '#FFFFFF', textColor: '#1A1C1E' },
  'CaO': { id: 'CaO', symbol: 'CaO', rawSymbol: 'CaO', type: 'compound', color: '#F3F4F6', glowColor: '#F9FAFB', textColor: '#1A1C1E' },
  'NH4Cl': { id: 'NH4Cl', symbol: 'NH₄Cl', rawSymbol: 'NH4Cl', type: 'compound', color: '#F8F9FA', glowColor: '#FFFFFF', textColor: '#1A1C1E' },
  'NH4NO3': { id: 'NH4NO3', symbol: 'NH₄NO₃', rawSymbol: 'NH4NO3', type: 'compound', color: '#E2E8F0', glowColor: '#F1F5F9', textColor: '#1A1C1E' },
  '(NH2)2CO': { id: '(NH2)2CO', symbol: '(NH₂)₂CO', rawSymbol: '(NH2)2CO', type: 'compound', color: '#F1F5F9', glowColor: '#F8FAFC', textColor: '#1A1C1E' },
  'FeS2': { id: 'FeS2', symbol: 'FeS₂', rawSymbol: 'FeS2', type: 'compound', color: '#FBBF24', glowColor: '#FDE047', textColor: '#1A1C1E' },
  'AgBr': { id: 'AgBr', symbol: 'AgBr', rawSymbol: 'AgBr', type: 'compound', color: '#FEF08A', glowColor: '#FEF9C3', textColor: '#1A1C1E' },
  'AgI': { id: 'AgI', symbol: 'AgI', rawSymbol: 'AgI', type: 'compound', color: '#FACC15', glowColor: '#FDE047', textColor: '#1A1C1E' },
  'Na2SiO3': { id: 'Na2SiO3', symbol: 'Na₂SiO₃', rawSymbol: 'Na2SiO3', type: 'compound', color: '#E5E7EB', glowColor: '#F3F4F6', textColor: '#1A1C1E' },
  'HF': { id: 'HF', symbol: 'HF', rawSymbol: 'HF', type: 'compound', color: '#F8FAFC', glowColor: '#FFFFFF', textColor: '#1A1C1E' },
  'O3': { id: 'O3', symbol: 'O₃', rawSymbol: 'O3', type: 'compound', color: '#93C5FD', glowColor: '#BFDBFE', textColor: '#1A1C1E' },
  'CO': { id: 'CO', symbol: 'CO', rawSymbol: 'CO', type: 'compound', color: '#CBD5E1', glowColor: '#E2E8F0', textColor: '#1A1C1E' },
  'NO': { id: 'NO', symbol: 'NO', rawSymbol: 'NO', type: 'compound', color: '#94A3B8', glowColor: '#CBD5E1', textColor: '#1A1C1E' },
  'NO2': { id: 'NO2', symbol: 'NO₂', rawSymbol: 'NO2', type: 'compound', color: '#9A3412', glowColor: '#C2410C', textColor: '#FFFFFF' },
  'N2O': { id: 'N2O', symbol: 'N₂O', rawSymbol: 'N2O', type: 'compound', color: '#E2E8F0', glowColor: '#F1F5F9', textColor: '#1A1C1E' },
  'H2S': { id: 'H2S', symbol: 'H₂S', rawSymbol: 'H2S', type: 'compound', color: '#FEF9C3', glowColor: '#FEFCE8', textColor: '#1A1C1E' },
  'SO3': { id: 'SO3', symbol: 'SO₃', rawSymbol: 'SO3', type: 'compound', color: '#F8F9FA', glowColor: '#FFFFFF', textColor: '#1A1C1E' },
  'Al(OH)3': { id: 'Al(OH)3', symbol: 'Al(OH)₃', rawSymbol: 'Al(OH)3', type: 'compound', color: '#F1F5F9', glowColor: '#F8FAFC', textColor: '#1A1C1E' },
  'NaHCO3': { id: 'NaHCO3', symbol: 'NaHCO₃', rawSymbol: 'NaHCO3', type: 'compound', color: '#F3F4F6', glowColor: '#F9FAFB', textColor: '#1A1C1E' },
  'Ca(HCO3)2': { id: 'Ca(HCO3)2', symbol: 'Ca(HCO₃)₂', rawSymbol: 'Ca(HCO3)2', type: 'compound', color: '#E2E8F0', glowColor: '#F1F5F9', textColor: '#1A1C1E' },
  'Ba(OH)2': { id: 'Ba(OH)2', symbol: 'Ba(OH)₂', rawSymbol: 'Ba(OH)2', type: 'compound', color: '#F8F9FA', glowColor: '#FFFFFF', textColor: '#1A1C1E' },
  'Fe(OH)2': { id: 'Fe(OH)2', symbol: 'Fe(OH)₂', rawSymbol: 'Fe(OH)2', type: 'compound', color: '#86EFAC', glowColor: '#BBF7D0', textColor: '#1A1C1E' },
  'Fe(OH)3': { id: 'Fe(OH)3', symbol: 'Fe(OH)₃', rawSymbol: 'Fe(OH)3', type: 'compound', color: '#B45309', glowColor: '#D97706', textColor: '#FFFFFF' },
  'Cu(OH)2': { id: 'Cu(OH)2', symbol: 'Cu(OH)₂', rawSymbol: 'Cu(OH)2', type: 'compound', color: '#60A5FA', glowColor: '#93C5FD', textColor: '#FFFFFF' },
  'Mg(OH)2': { id: 'Mg(OH)2', symbol: 'Mg(OH)₂', rawSymbol: 'Mg(OH)2', type: 'compound', color: '#F1F5F9', glowColor: '#F8FAFC', textColor: '#1A1C1E' },
  'Zn(OH)2': { id: 'Zn(OH)2', symbol: 'Zn(OH)₂', rawSymbol: 'Zn(OH)2', type: 'compound', color: '#F8F9FA', glowColor: '#FFFFFF', textColor: '#1A1C1E' },
  'Cr2O3': { id: 'Cr2O3', symbol: 'Cr₂O₃', rawSymbol: 'Cr2O3', type: 'compound', color: '#10B981', glowColor: '#34D399', textColor: '#FFFFFF' },
  'Cr(OH)3': { id: 'Cr(OH)3', symbol: 'Cr(OH)₃', rawSymbol: 'Cr(OH)3', type: 'compound', color: '#6EE7B7', glowColor: '#A7F3D0', textColor: '#1A1C1E' },
  'CrO3': { id: 'CrO3', symbol: 'CrO₃', rawSymbol: 'CrO3', type: 'compound', color: '#991B1B', glowColor: '#DC2626', textColor: '#FFFFFF' },
  'Na3AlF6': { id: 'Na3AlF6', symbol: 'Na₃AlF₆', rawSymbol: 'Na3AlF6', type: 'compound', color: '#F1F5F9', glowColor: '#F8FAFC', textColor: '#1A1C1E' },
  'Ca3(PO4)2': { id: 'Ca3(PO4)2', symbol: 'Ca₃(PO₄)₂', rawSymbol: 'Ca3(PO4)2', type: 'compound', color: '#E2E8F0', glowColor: '#F1F5F9', textColor: '#1A1C1E' },
  'FeCO3': { id: 'FeCO3', symbol: 'FeCO₃', rawSymbol: 'FeCO3', type: 'compound', color: '#78350F', glowColor: '#92400E', textColor: '#FFFFFF' },
  'CuS': { id: 'CuS', symbol: 'CuS', rawSymbol: 'CuS', type: 'compound', color: '#1F2937', glowColor: '#374151', textColor: '#FFFFFF' },
  'PbS': { id: 'PbS', symbol: 'PbS', rawSymbol: 'PbS', type: 'compound', color: '#374151', glowColor: '#4B5563', textColor: '#FFFFFF' },
  'K2CO3': { id: 'K2CO3', symbol: 'K₂CO₃', rawSymbol: 'K2CO3', type: 'compound', color: '#F1F5F9', glowColor: '#F8FAFC', textColor: '#1A1C1E' },
  'BaCO3': { id: 'BaCO3', symbol: 'BaCO₃', rawSymbol: 'BaCO3', type: 'compound', color: '#F8F9FA', glowColor: '#FFFFFF', textColor: '#1A1C1E' },
  'CaF2': { id: 'CaF2', symbol: 'CaF₂', rawSymbol: 'CaF2', type: 'compound', color: '#C084FC', glowColor: '#D8B4FE', textColor: '#FFFFFF' },
  'KCl': { id: 'KCl', symbol: 'KCl', rawSymbol: 'KCl', type: 'compound', color: '#F3F4F6', glowColor: '#F9FAFB', textColor: '#1A1C1E' },
  'C2H6': { id: 'C2H6', symbol: 'C₂H₆', rawSymbol: 'C2H6', type: 'compound', color: '#A5F3FC', glowColor: '#CFFAFE', textColor: '#1A1C1E' },
  'C3H8': { id: 'C3H8', symbol: 'C₃H₈', rawSymbol: 'C3H8', type: 'compound', color: '#67E8F9', glowColor: '#A5F3FC', textColor: '#1A1C1E' },
  'C4H10': { id: 'C4H10', symbol: 'C₄H₁₀', rawSymbol: 'C4H10', type: 'compound', color: '#22D3EE', glowColor: '#67E8F9', textColor: '#1A1C1E' },
  'C5H12': { id: 'C5H12', symbol: 'C₅H₁₂', rawSymbol: 'C5H12', type: 'compound', color: '#06B6D4', glowColor: '#22D3EE', textColor: '#FFFFFF' },
  'C3H6': { id: 'C3H6', symbol: 'C₃H₆', rawSymbol: 'C3H6', type: 'compound', color: '#93C5FD', glowColor: '#BFDBFE', textColor: '#1A1C1E' },
  'CH3Cl': { id: 'CH3Cl', symbol: 'CH₃Cl', rawSymbol: 'CH3Cl', type: 'compound', color: '#E9D5FF', glowColor: '#F3E8FF', textColor: '#1A1C1E' },
  'CHCl3': { id: 'CHCl3', symbol: 'CHCl₃', rawSymbol: 'CHCl3', type: 'compound', color: '#D8B4FE', glowColor: '#E9D5FF', textColor: '#1A1C1E' },
  'CH3COCH3': { id: 'CH3COCH3', symbol: 'CH₃COCH₃', rawSymbol: 'CH3COCH3', type: 'compound', color: '#FBCFE8', glowColor: '#FDF2F8', textColor: '#1A1C1E' },
  'C7H8': { id: 'C7H8', symbol: 'C₇H₈', rawSymbol: 'C7H8', type: 'compound', color: '#FDE047', glowColor: '#FEF08A', textColor: '#1A1C1E' },
  'C8H8': { id: 'C8H8', symbol: 'C₈H₈', rawSymbol: 'C8H8', type: 'compound', color: '#FACC15', glowColor: '#FDE047', textColor: '#1A1C1E' },
  'CH3OH': { id: 'CH3OH', symbol: 'CH₃OH', rawSymbol: 'CH3OH', type: 'compound', color: '#FECDD3', glowColor: '#FFE4E6', textColor: '#1A1C1E' },
  'C2H5OH': { id: 'C2H5OH', symbol: 'C₂H₅OH', rawSymbol: 'C2H5OH', type: 'compound', color: '#FDA4AF', glowColor: '#FECDD3', textColor: '#1A1C1E' },
  'C6H5OH': { id: 'C6H5OH', symbol: 'C₆H₅OH', rawSymbol: 'C6H5OH', type: 'compound', color: '#FB7185', glowColor: '#FDA4AF', textColor: '#FFFFFF' },
  'HCHO': { id: 'HCHO', symbol: 'HCHO', rawSymbol: 'HCHO', type: 'compound', color: '#D9F99D', glowColor: '#ECFCCB', textColor: '#1A1C1E' },
  'CH3CHO': { id: 'CH3CHO', symbol: 'CH₃CHO', rawSymbol: 'CH3CHO', type: 'compound', color: '#BEF264', glowColor: '#D9F99D', textColor: '#1A1C1E' },
  'HCOOH': { id: 'HCOOH', symbol: 'HCOOH', rawSymbol: 'HCOOH', type: 'compound', color: '#A7F3D0', glowColor: '#D1FAE5', textColor: '#1A1C1E' },
  'CH3COOH': { id: 'CH3COOH', symbol: 'CH₃COOH', rawSymbol: 'CH3COOH', type: 'compound', color: '#6EE7B7', glowColor: '#A7F3D0', textColor: '#1A1C1E' },
  'C3H5(OH)3': { id: 'C3H5(OH)3', symbol: 'C₃H₅(OH)₃', rawSymbol: 'C3H5(OH)3', type: 'compound', color: '#FDE68A', glowColor: '#FEF3C7', textColor: '#1A1C1E' },
  'CH3COOC2H5': { id: 'CH3COOC2H5', symbol: 'CH₃COOC₂H₅', rawSymbol: 'CH3COOC2H5', type: 'compound', color: '#DDD6FE', glowColor: '#EDE9FE', textColor: '#1A1C1E' },
  'HCOOCH3': { id: 'HCOOCH3', symbol: 'HCOOCH₃', rawSymbol: 'HCOOCH3', type: 'compound', color: '#C4B5FD', glowColor: '#DDD6FE', textColor: '#1A1C1E' },
  'C6H12O6': { id: 'C6H12O6', symbol: 'C₆H₁₂O₆', rawSymbol: 'C6H12O6', type: 'compound', color: '#FEF08A', glowColor: '#FEF9C3', textColor: '#1A1C1E' },
  'C12H22O11': { id: 'C12H22O11', symbol: 'C₁₂H₂₂O₁₁', rawSymbol: 'C12H22O11', type: 'compound', color: '#FDE047', glowColor: '#FEF08A', textColor: '#1A1C1E' },
  '(C6H10O5)n': { id: '(C6H10O5)n', symbol: '(C₆H₁₀O₅)n', rawSymbol: '(C6H10O5)n', type: 'compound', color: '#FEF3C7', glowColor: '#FFFBEB', textColor: '#1A1C1E' },
  'CH3NH2': { id: 'CH3NH2', symbol: 'CH₃NH₂', rawSymbol: 'CH3NH2', type: 'compound', color: '#FED7AA', glowColor: '#FFEDD5', textColor: '#1A1C1E' },
  'C2H5NH2': { id: 'C2H5NH2', symbol: 'C₂H₅NH₂', rawSymbol: 'C2H5NH2', type: 'compound', color: '#FDBA74', glowColor: '#FED7AA', textColor: '#1A1C1E' },
  'C6H5NH2': { id: 'C6H5NH2', symbol: 'C₆H₅NH₂', rawSymbol: 'C6H5NH2', type: 'compound', color: '#FB923C', glowColor: '#FDBA74', textColor: '#FFFFFF' },
  'Gly': { id: 'Gly', symbol: 'Gly', rawSymbol: 'Gly', type: 'compound', color: '#99F6E4', glowColor: '#CCFBF1', textColor: '#1A1C1E' },
  'Ala': { id: 'Ala', symbol: 'Ala', rawSymbol: 'Ala', type: 'compound', color: '#5EEAD4', glowColor: '#99F6E4', textColor: '#1A1C1E' },
  'Val': { id: 'Val', symbol: 'Val', rawSymbol: 'Val', type: 'compound', color: '#2DD4BF', glowColor: '#5EEAD4', textColor: '#1A1C1E' },
  'Lys': { id: 'Lys', symbol: 'Lys', rawSymbol: 'Lys', type: 'compound', color: '#14B8A6', glowColor: '#2DD4BF', textColor: '#FFFFFF' },

  // Level 14 Compounds
  'H2O2': { id: 'H2O2', symbol: 'H₂O₂', rawSymbol: 'H2O2', type: 'compound', color: '#93C5FD', glowColor: '#BFDBFE', textColor: '#1A1C1E' },
  'KCN': { id: 'KCN', symbol: 'KCN', rawSymbol: 'KCN', type: 'compound', color: '#FCA5A5', glowColor: '#FECACA', textColor: '#1A1C1E' },
  'HCN': { id: 'HCN', symbol: 'HCN', rawSymbol: 'HCN', type: 'compound', color: '#F87171', glowColor: '#FCA5A5', textColor: '#FFFFFF' },
  'NH4OH': { id: 'NH4OH', symbol: 'NH₄OH', rawSymbol: 'NH4OH', type: 'compound', color: '#A7F3D0', glowColor: '#D1FAE5', textColor: '#1A1C1E' },
  'H2CO3': { id: 'H2CO3', symbol: 'H₂CO₃', rawSymbol: 'H2CO3', type: 'compound', color: '#D1D5DB', glowColor: '#E5E7EB', textColor: '#1A1C1E' },
  'HClO': { id: 'HClO', symbol: 'HClO', rawSymbol: 'HClO', type: 'compound', color: '#FDE047', glowColor: '#FEF08A', textColor: '#1A1C1E' },
  'HClO4': { id: 'HClO4', symbol: 'HClO₄', rawSymbol: 'HClO4', type: 'compound', color: '#FACC15', glowColor: '#FDE047', textColor: '#1A1C1E' },
  'Na2SO4': { id: 'Na2SO4', symbol: 'Na₂SO₄', rawSymbol: 'Na2SO4', type: 'compound', color: '#F3F4F6', glowColor: '#F9FAFB', textColor: '#1A1C1E' },
  'K2SO4': { id: 'K2SO4', symbol: 'K₂SO₄', rawSymbol: 'K2SO4', type: 'compound', color: '#E5E7EB', glowColor: '#F3F4F6', textColor: '#1A1C1E' },
  'MgSO4': { id: 'MgSO4', symbol: 'MgSO₄', rawSymbol: 'MgSO4', type: 'compound', color: '#E2E8F0', glowColor: '#F1F5F9', textColor: '#1A1C1E' },
  'FeSO4': { id: 'FeSO4', symbol: 'FeSO₄', rawSymbol: 'FeSO4', type: 'compound', color: '#86EFAC', glowColor: '#BBF7D0', textColor: '#1A1C1E' },
  'Fe2(SO4)3': { id: 'Fe2(SO4)3', symbol: 'Fe₂(SO₄)₃', rawSymbol: 'Fe2(SO4)3', type: 'compound', color: '#F59E0B', glowColor: '#FBBF24', textColor: '#1A1C1E' },
  'CuCl2': { id: 'CuCl2', symbol: 'CuCl₂', rawSymbol: 'CuCl2', type: 'compound', color: '#38BDF8', glowColor: '#7DD3FC', textColor: '#FFFFFF' },
  'ZnCl2': { id: 'ZnCl2', symbol: 'ZnCl₂', rawSymbol: 'ZnCl2', type: 'compound', color: '#F8FAFC', glowColor: '#FFFFFF', textColor: '#1A1C1E' },
  'Pb(NO3)2': { id: 'Pb(NO3)2', symbol: 'Pb(NO₃)₂', rawSymbol: 'Pb(NO3)2', type: 'compound', color: '#CBD5E1', glowColor: '#E2E8F0', textColor: '#1A1C1E' },

  // Level 15 (Alkali/Alkaline Earth Salts & Hydrides)
  'LiCl': { id: 'LiCl', symbol: 'LiCl', rawSymbol: 'LiCl', type: 'compound', color: '#E2E8F0', glowColor: '#F1F5F9', textColor: '#1A1C1E' },
  'Li2SO4': { id: 'Li2SO4', symbol: 'Li₂SO₄', rawSymbol: 'Li2SO4', type: 'compound', color: '#F3F4F6', glowColor: '#F9FAFB', textColor: '#1A1C1E' },
  'BeCl2': { id: 'BeCl2', symbol: 'BeCl₂', rawSymbol: 'BeCl2', type: 'compound', color: '#E5E7EB', glowColor: '#F3F4F6', textColor: '#1A1C1E' },
  'BeO': { id: 'BeO', symbol: 'BeO', rawSymbol: 'BeO', type: 'compound', color: '#F8FAFC', glowColor: '#FFFFFF', textColor: '#1A1C1E' },
  'MgF2': { id: 'MgF2', symbol: 'MgF₂', rawSymbol: 'MgF2', type: 'compound', color: '#FFFFFF', glowColor: '#F8FAFC', textColor: '#1A1C1E' },
  'CaBr2': { id: 'CaBr2', symbol: 'CaBr₂', rawSymbol: 'CaBr2', type: 'compound', color: '#FEF08A', glowColor: '#FEF9C3', textColor: '#1A1C1E' },
  'SrCl2': { id: 'SrCl2', symbol: 'SrCl₂', rawSymbol: 'SrCl2', type: 'compound', color: '#FCA5A5', glowColor: '#FECACA', textColor: '#1A1C1E' },
  'Sr(NO3)2': { id: 'Sr(NO3)2', symbol: 'Sr(NO₃)₂', rawSymbol: 'Sr(NO3)2', type: 'compound', color: '#F87171', glowColor: '#FCA5A5', textColor: '#FFFFFF' },
  'BaBr2': { id: 'BaBr2', symbol: 'BaBr₂', rawSymbol: 'BaBr2', type: 'compound', color: '#FDE047', glowColor: '#FEF08A', textColor: '#1A1C1E' },
  'BaI2': { id: 'BaI2', symbol: 'BaI₂', rawSymbol: 'BaI2', type: 'compound', color: '#FACC15', glowColor: '#FDE047', textColor: '#1A1C1E' },
  'NaH': { id: 'NaH', symbol: 'NaH', rawSymbol: 'NaH', type: 'compound', color: '#E5E7EB', glowColor: '#F3F4F6', textColor: '#1A1C1E' },
  'KH': { id: 'KH', symbol: 'KH', rawSymbol: 'KH', type: 'compound', color: '#D1D5DB', glowColor: '#E5E7EB', textColor: '#1A1C1E' },
  'CaH2': { id: 'CaH2', symbol: 'CaH₂', rawSymbol: 'CaH2', type: 'compound', color: '#9CA3AF', glowColor: '#D1D5DB', textColor: '#1A1C1E' },
  'LiAlH4': { id: 'LiAlH4', symbol: 'LiAlH₄', rawSymbol: 'LiAlH4', type: 'compound', color: '#CBD5E1', glowColor: '#E2E8F0', textColor: '#1A1C1E' },
  'NaBH4': { id: 'NaBH4', symbol: 'NaBH₄', rawSymbol: 'NaBH4', type: 'compound', color: '#94A3B8', glowColor: '#CBD5E1', textColor: '#1A1C1E' },

  // Level 16 (Transition Metal Compounds)
  'TiCl4': { id: 'TiCl4', symbol: 'TiCl₄', rawSymbol: 'TiCl4', type: 'compound', color: '#FCD34D', glowColor: '#FDE68A', textColor: '#1A1C1E' },
  'TiO2': { id: 'TiO2', symbol: 'TiO₂', rawSymbol: 'TiO2', type: 'compound', color: '#F8FAFC', glowColor: '#FFFFFF', textColor: '#1A1C1E' },
  'V2O5': { id: 'V2O5', symbol: 'V₂O₅', rawSymbol: 'V2O5', type: 'compound', color: '#F97316', glowColor: '#FB923C', textColor: '#FFFFFF' },
  'CrCl3': { id: 'CrCl3', symbol: 'CrCl₃', rawSymbol: 'CrCl3', type: 'compound', color: '#A78BFA', glowColor: '#C4B5FD', textColor: '#FFFFFF' },
  'K2MnO4': { id: 'K2MnO4', symbol: 'K₂MnO₄', rawSymbol: 'K2MnO4', type: 'compound', color: '#16A34A', glowColor: '#22C55E', textColor: '#FFFFFF' },
  'MnSO4': { id: 'MnSO4', symbol: 'MnSO₄', rawSymbol: 'MnSO4', type: 'compound', color: '#FCA5A5', glowColor: '#FECACA', textColor: '#1A1C1E' },
  'FeBr3': { id: 'FeBr3', symbol: 'FeBr₃', rawSymbol: 'FeBr3', type: 'compound', color: '#9A3412', glowColor: '#C2410C', textColor: '#FFFFFF' },
  'CoCl2': { id: 'CoCl2', symbol: 'CoCl₂', rawSymbol: 'CoCl2', type: 'compound', color: '#60A5FA', glowColor: '#93C5FD', textColor: '#FFFFFF' },
  'Co(NO3)2': { id: 'Co(NO3)2', symbol: 'Co(NO₃)₂', rawSymbol: 'Co(NO3)2', type: 'compound', color: '#F472B6', glowColor: '#FBCFE8', textColor: '#1A1C1E' },
  'NiCl2': { id: 'NiCl2', symbol: 'NiCl₂', rawSymbol: 'NiCl2', type: 'compound', color: '#4ADE80', glowColor: '#86EFAC', textColor: '#1A1C1E' },
  'NiSO4': { id: 'NiSO4', symbol: 'NiSO₄', rawSymbol: 'NiSO4', type: 'compound', color: '#22C55E', glowColor: '#4ADE80', textColor: '#FFFFFF' },
  'PdCl2': { id: 'PdCl2', symbol: 'PdCl₂', rawSymbol: 'PdCl2', type: 'compound', color: '#9CA3AF', glowColor: '#D1D5DB', textColor: '#1A1C1E' },
  'PtCl4': { id: 'PtCl4', symbol: 'PtCl₄', rawSymbol: 'PtCl4', type: 'compound', color: '#6B7280', glowColor: '#9CA3AF', textColor: '#FFFFFF' },
  'CuBr2': { id: 'CuBr2', symbol: 'CuBr₂', rawSymbol: 'CuBr2', type: 'compound', color: '#1E3A8A', glowColor: '#1E40AF', textColor: '#FFFFFF' },
  'Ag2S': { id: 'Ag2S', symbol: 'Ag₂S', rawSymbol: 'Ag2S', type: 'compound', color: '#1F2937', glowColor: '#374151', textColor: '#FFFFFF' },

  // Level 17 (P-block Compounds)
  'B2H6': { id: 'B2H6', symbol: 'B₂H₆', rawSymbol: 'B2H6', type: 'compound', color: '#D1D5DB', glowColor: '#E5E7EB', textColor: '#1A1C1E' },
  'H3BO3': { id: 'H3BO3', symbol: 'H₃BO₃', rawSymbol: 'H3BO3', type: 'compound', color: '#F3F4F6', glowColor: '#F9FAFB', textColor: '#1A1C1E' },
  'Na2B4O7': { id: 'Na2B4O7', symbol: 'Na₂B₄O₇', rawSymbol: 'Na2B4O7', type: 'compound', color: '#F8FAFC', glowColor: '#FFFFFF', textColor: '#1A1C1E' },
  'Al2(SO4)3': { id: 'Al2(SO4)3', symbol: 'Al₂(SO₄)₃', rawSymbol: 'Al2(SO4)3', type: 'compound', color: '#E2E8F0', glowColor: '#F1F5F9', textColor: '#1A1C1E' },
  'SnCl2': { id: 'SnCl2', symbol: 'SnCl₂', rawSymbol: 'SnCl2', type: 'compound', color: '#CBD5E1', glowColor: '#E2E8F0', textColor: '#1A1C1E' },
  'SnCl4': { id: 'SnCl4', symbol: 'SnCl₄', rawSymbol: 'SnCl4', type: 'compound', color: '#94A3B8', glowColor: '#CBD5E1', textColor: '#1A1C1E' },
  'PbO': { id: 'PbO', symbol: 'PbO', rawSymbol: 'PbO', type: 'compound', color: '#FDE047', glowColor: '#FEF08A', textColor: '#1A1C1E' },
  'PbO2': { id: 'PbO2', symbol: 'PbO₂', rawSymbol: 'PbO2', type: 'compound', color: '#78350F', glowColor: '#92400E', textColor: '#FFFFFF' },
  'N2O3': { id: 'N2O3', symbol: 'N₂O₃', rawSymbol: 'N2O3', type: 'compound', color: '#3B82F6', glowColor: '#60A5FA', textColor: '#FFFFFF' },
  'N2O4': { id: 'N2O4', symbol: 'N₂O₄', rawSymbol: 'N2O4', type: 'compound', color: '#FCA5A5', glowColor: '#FECACA', textColor: '#1A1C1E' },
  'N2O5': { id: 'N2O5', symbol: 'N₂O₅', rawSymbol: 'N2O5', type: 'compound', color: '#F87171', glowColor: '#FCA5A5', textColor: '#FFFFFF' },
  'PCl3': { id: 'PCl3', symbol: 'PCl₃', rawSymbol: 'PCl3', type: 'compound', color: '#F3F4F6', glowColor: '#F9FAFB', textColor: '#1A1C1E' },
  'PCl5': { id: 'PCl5', symbol: 'PCl₅', rawSymbol: 'PCl5', type: 'compound', color: '#FEF3C7', glowColor: '#FFFBEB', textColor: '#1A1C1E' },
  'H3PO3': { id: 'H3PO3', symbol: 'H₃PO₃', rawSymbol: 'H3PO3', type: 'compound', color: '#E5E7EB', glowColor: '#F3F4F6', textColor: '#1A1C1E' },
  'H4P2O7': { id: 'H4P2O7', symbol: 'H₄P₂O₇', rawSymbol: 'H4P2O7', type: 'compound', color: '#D1D5DB', glowColor: '#E5E7EB', textColor: '#1A1C1E' },

  // Level 18 (Halogens & Noble Gas Compounds)
  'OF2': { id: 'OF2', symbol: 'OF₂', rawSymbol: 'OF2', type: 'compound', color: '#FDE047', glowColor: '#FEF08A', textColor: '#1A1C1E' },
  'Cl2O': { id: 'Cl2O', symbol: 'Cl₂O', rawSymbol: 'Cl2O', type: 'compound', color: '#FCA5A5', glowColor: '#FECACA', textColor: '#1A1C1E' },
  'ClO2': { id: 'ClO2', symbol: 'ClO₂', rawSymbol: 'ClO2', type: 'compound', color: '#FACC15', glowColor: '#FDE047', textColor: '#1A1C1E' },
  'Cl2O7': { id: 'Cl2O7', symbol: 'Cl₂O₇', rawSymbol: 'Cl2O7', type: 'compound', color: '#9CA3AF', glowColor: '#D1D5DB', textColor: '#1A1C1E' },
  'HBrO3': { id: 'HBrO3', symbol: 'HBrO₃', rawSymbol: 'HBrO3', type: 'compound', color: '#E2E8F0', glowColor: '#F1F5F9', textColor: '#1A1C1E' },
  'HIO3': { id: 'HIO3', symbol: 'HIO₃', rawSymbol: 'HIO3', type: 'compound', color: '#F3F4F6', glowColor: '#F9FAFB', textColor: '#1A1C1E' },
  'HIO4': { id: 'HIO4', symbol: 'HIO₄', rawSymbol: 'HIO4', type: 'compound', color: '#E5E7EB', glowColor: '#F3F4F6', textColor: '#1A1C1E' },
  'IF5': { id: 'IF5', symbol: 'IF₅', rawSymbol: 'IF5', type: 'compound', color: '#FEF08A', glowColor: '#FEF9C3', textColor: '#1A1C1E' },
  'IF7': { id: 'IF7', symbol: 'IF₇', rawSymbol: 'IF7', type: 'compound', color: '#FDE047', glowColor: '#FEF08A', textColor: '#1A1C1E' },
  'XeF2': { id: 'XeF2', symbol: 'XeF₂', rawSymbol: 'XeF2', type: 'compound', color: '#E0F2FE', glowColor: '#F0F9FF', textColor: '#1A1C1E' },
  'XeF4': { id: 'XeF4', symbol: 'XeF₄', rawSymbol: 'XeF4', type: 'compound', color: '#BAE6FD', glowColor: '#E0F2FE', textColor: '#1A1C1E' },
  'XeF6': { id: 'XeF6', symbol: 'XeF₆', rawSymbol: 'XeF6', type: 'compound', color: '#7DD3FC', glowColor: '#BAE6FD', textColor: '#1A1C1E' },
  'XeO3': { id: 'XeO3', symbol: 'XeO₃', rawSymbol: 'XeO3', type: 'compound', color: '#38BDF8', glowColor: '#7DD3FC', textColor: '#FFFFFF' },
};

import { ORGANIC_CHEMICALS } from './OrganicChemicals';

export const ALL_CHEMICAL_KEYS = Array.from(new Set([...Object.keys(CHEMICALS), ...Object.keys(ORGANIC_CHEMICALS)]));
export const CHEMICAL_KEY_TO_INDEX: Record<string, number> = {};
ALL_CHEMICAL_KEYS.forEach((key, idx) => {
  CHEMICAL_KEY_TO_INDEX[key] = idx;
});
