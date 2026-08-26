import { CHEMICALS } from '../constants/ChemicalConstants';

// Bảng sản phẩm: key là công thức nội bộ, value là {text hiển thị, màu}
const PRODUCT_MAP: Record<string, { text: string, color: string }> = {
  // === Chloride ===
  'NaCl': { text: 'NaCl', color: '#FFFFFF' },
  'KCl': { text: 'KCl', color: '#FFFFFF' },
  'AgCl': { text: 'AgCl ↓', color: '#FFFFFF' },   // trắng kết tủa
  'CaCl2': { text: 'CaCl₂', color: '#FFFFFF' },
  'BaCl2': { text: 'BaCl₂', color: '#FFFFFF' },
  'MgCl2': { text: 'MgCl₂', color: '#FFFFFF' },
  'ZnCl2': { text: 'ZnCl₂', color: '#FFFFFF' },
  'CuCl2': { text: 'CuCl₂', color: '#48CAE4' },   // xanh lam
  'PbCl2': { text: 'PbCl₂ ↓', color: '#FFFFFF' },   // trắng kết tủa
  'NiCl2': { text: 'NiCl₂', color: '#4CAF50' },   // xanh lục
  'AlCl3': { text: 'AlCl₃', color: '#FFFFFF' },
  'FeCl3': { text: 'FeCl₃', color: '#A0522D' },   // nâu
  // === Bromide ===
  'NaBr': { text: 'NaBr', color: '#FFFFFF' },
  'KBr': { text: 'KBr', color: '#FFFFFF' },
  'AgBr': { text: 'AgBr ↓', color: '#FFFF99' },   // vàng nhạt kết tủa
  'CaBr2': { text: 'CaBr₂', color: '#FFFFFF' },
  'BaBr2': { text: 'BaBr₂', color: '#FFFFFF' },
  'MgBr2': { text: 'MgBr₂', color: '#FFFFFF' },
  'ZnBr2': { text: 'ZnBr₂', color: '#FFFFFF' },
  'CuBr2': { text: 'CuBr₂', color: '#48CAE4' },
  'PbBr2': { text: 'PbBr₂ ↓', color: '#FFFFFF' },
  'NiBr2': { text: 'NiBr₂', color: '#4CAF50' },
  'AlBr3': { text: 'AlBr₃', color: '#FFFFFF' },
  'FeBr3': { text: 'FeBr₃', color: '#A0522D' },
  // === Iodide ===
  'NaI': { text: 'NaI', color: '#FFFFFF' },
  'KI': { text: 'KI', color: '#FFFFFF' },
  'AgI': { text: 'AgI ↓', color: '#F1C40F' },   // vàng tươi kết tủa
  'CaI2': { text: 'CaI₂', color: '#FFFFFF' },
  'BaI2': { text: 'BaI₂', color: '#FFFFFF' },
  'MgI2': { text: 'MgI₂', color: '#FFFFFF' },
  'ZnI2': { text: 'ZnI₂', color: '#FFFFFF' },
  'CuI2': { text: 'CuI₂', color: '#48CAE4' },
  'PbI2': { text: 'PbI₂ ↓', color: '#F1C40F' },   // vàng tươi kết tủa
  'NiI2': { text: 'NiI₂', color: '#4CAF50' },
  'AlI3': { text: 'AlI₃', color: '#FFFFFF' },
  'FeI3': { text: 'FeI₃', color: '#A0522D' },
  // === Oxide ===
  'Na2O': { text: 'Na₂O', color: '#FFFFFF' },
  'Na2O2': { text: 'Na₂O₂', color: '#FFFF99' },   // vàng nhạt
  'K2O': { text: 'K₂O', color: '#FFFFFF' },
  'CaO': { text: 'CaO', color: '#FFFFFF' },
  'BaO': { text: 'BaO', color: '#FFFFFF' },
  'MgO': { text: 'MgO', color: '#FFFFFF' },
  'ZnO': { text: 'ZnO', color: '#FFFFFF' },
  'CuO': { text: 'CuO', color: '#212529' },    // đen
  'PbO': { text: 'PbO', color: '#F59E0B' },    // vàng cam
  'NiO': { text: 'NiO', color: '#6B8E23' },
  'Ag2O': { text: 'Ag₂O', color: '#808080' },    // xám
  'Al2O3': { text: 'Al₂O₃', color: '#FFFFFF' },
  'Fe3O4': { text: 'Fe₃O₄', color: '#4A4A4A' },    // đen từ tính
  // === Sulfide ===
  'Na2S': { text: 'Na₂S', color: '#FFFFFF' },
  'K2S': { text: 'K₂S', color: '#FFFFFF' },
  'Ag2S': { text: 'Ag₂S ↓', color: '#212529' },    // đen kết tủa
  'CaS': { text: 'CaS', color: '#FFFFFF' },
  'BaS': { text: 'BaS', color: '#FFFFFF' },
  'MgS': { text: 'MgS', color: '#FFFFFF' },
  'ZnS': { text: 'ZnS ↓', color: '#FFFFFF' },    // trắng kết tủa
  'CuS': { text: 'CuS ↓', color: '#212529' },    // đen kết tủa
  'PbS': { text: 'PbS ↓', color: '#212529' },    // đen kết tủa
  'NiS': { text: 'NiS ↓', color: '#4A4A4A' },    // đen xám kết tủa
  'Al2S3': { text: 'Al₂S₃ ↓', color: '#D4C27A' },   // vàng nâu kết tủa
  'FeS': { text: 'FeS ↓', color: '#212529' },    // đen kết tủa
  // === Hợp chất đặc biệt (dung dịch) ===
  'BaSO4': { text: 'BaSO₄ ↓', color: '#FFFFFF' },
  'Cu(OH)2': { text: 'Cu(OH)₂ ↓', color: '#48CAE4' },
  'Al(OH)3': { text: 'Al(OH)₃ ↓', color: '#FFFFFF' },
  'Fe(OH)3': { text: 'Fe(OH)₃ ↓', color: '#A63A3A' },
  'CaCO3': { text: 'CaCO₃ ↓', color: '#FFFFFF' },
};

export const checkReaction = (idA: string, idB: string): boolean => {
  const ionA = CHEMICALS[idA];
  const ionB = CHEMICALS[idB];

  if (!ionA || !ionB) return false;
  if (ionA.type === ionB.type && ionA.type !== 'nonmetal') return false;

  const isNonMetalA = ionA.type === 'nonmetal';
  const isNonMetalB = ionB.type === 'nonmetal';

  if (isNonMetalA || isNonMetalB) {
    const nonmetal = isNonMetalA ? ionA : ionB;
    const other = isNonMetalA ? ionB : ionA;

    if (other.type === 'nonmetal') {
      if ((ionA.rawSymbol === 'H2' && ['O2', 'Cl2', 'N2', 'S'].includes(ionB.rawSymbol)) ||
        (ionB.rawSymbol === 'H2' && ['O2', 'Cl2', 'N2', 'S'].includes(ionA.rawSymbol))) {
        return true;
      }
      if ((ionA.rawSymbol === 'O2' && ['C', 'S', 'P'].includes(ionB.rawSymbol)) ||
        (ionB.rawSymbol === 'O2' && ['C', 'S', 'P'].includes(ionA.rawSymbol))) {
        return true;
      }
      if ((ionA.rawSymbol === 'S' && ['Cl2'].includes(ionB.rawSymbol)) ||
        (ionB.rawSymbol === 'S' && ['Cl2'].includes(ionA.rawSymbol))) {
        return true;
      }
      return false;
    }

    if (other.type === 'metal') {
      if (['Cl2', 'O2', 'S', 'Br2', 'I2'].includes(nonmetal.rawSymbol)) return true;
    }

    if (other.type === 'anion') {
      const halogenOrder = ['F2', 'Cl2', 'Br2', 'I2'];
      const halideOrder = ['F', 'Cl', 'Br', 'I'];
      const nmIdx = halogenOrder.indexOf(nonmetal.rawSymbol);
      const hIdx = halideOrder.indexOf(other.rawSymbol);
      if (nmIdx !== -1 && hIdx !== -1) {
        return nmIdx < hIdx;
      }
    }

    if (other.type === 'compound') {
      if (
        (nonmetal.rawSymbol === 'Cl2' && ['H2O', 'NaOH'].includes(other.rawSymbol)) ||
        (nonmetal.rawSymbol === 'Br2' && ['H2O', 'NaOH'].includes(other.rawSymbol)) ||
        (nonmetal.rawSymbol === 'I2' && other.rawSymbol === 'NaOH')
      ) {
        return true;
      }
    }

    return false;
  }

  if ((ionA.type === 'metal' && ionB.type === 'compound') || (ionB.type === 'metal' && ionA.type === 'compound')) {
    const metal = ionA.type === 'metal' ? ionA : ionB;
    const compound = ionA.type === 'metal' ? ionB : ionA;
    if (['Na', 'K', 'Ca', 'Ba'].includes(metal.rawSymbol) && compound.rawSymbol === 'H2O') {
      return true;
    }
    // Al, Zn + NaOH
    if (['Al', 'Zn'].includes(metal.rawSymbol) && compound.rawSymbol === 'NaOH') {
      return true;
    }
  }

  return false;
};

export const getReactionProduct = (idA: string, idB: string): { text: string, color: string } | null => {
  const ionA = CHEMICALS[idA];
  const ionB = CHEMICALS[idB];

  if (!ionA || !ionB) return null;
  if (ionA.type === ionB.type && ionA.type !== 'nonmetal') return null;

  const isNonMetalA = ionA.type === 'nonmetal';
  const isNonMetalB = ionB.type === 'nonmetal';

  if (isNonMetalA || isNonMetalB) {
    const nonmetal = isNonMetalA ? ionA : ionB;
    const other = isNonMetalA ? ionB : ionA;

    if (other.type === 'nonmetal') {
      if ((ionA.rawSymbol === 'H2' && ionB.rawSymbol === 'O2') || (ionB.rawSymbol === 'H2' && ionA.rawSymbol === 'O2'))
        return { text: 'H₂O', color: '#48CAE4' };
      if ((ionA.rawSymbol === 'H2' && ionB.rawSymbol === 'Cl2') || (ionB.rawSymbol === 'H2' && ionA.rawSymbol === 'Cl2'))
        return { text: 'HCl ↑', color: '#22C55E' };
      if ((ionA.rawSymbol === 'H2' && ionB.rawSymbol === 'S') || (ionB.rawSymbol === 'H2' && ionA.rawSymbol === 'S'))
        return { text: 'H₂S ↑', color: '#D4D4AA' };
      if ((ionA.rawSymbol === 'H2' && ionB.rawSymbol === 'N2') || (ionB.rawSymbol === 'H2' && ionA.rawSymbol === 'N2'))
        return { text: 'NH₃ ↑', color: '#A8E6CF' };

      if ((ionA.rawSymbol === 'O2' && ionB.rawSymbol === 'C') || (ionB.rawSymbol === 'O2' && ionA.rawSymbol === 'C'))
        return { text: 'CO₂ ↑', color: '#B0B0B0' };
      if ((ionA.rawSymbol === 'O2' && ionB.rawSymbol === 'S') || (ionB.rawSymbol === 'O2' && ionA.rawSymbol === 'S'))
        return { text: 'SO₂ ↑', color: '#D4D4AA' };
      if ((ionA.rawSymbol === 'O2' && ionB.rawSymbol === 'P') || (ionB.rawSymbol === 'O2' && ionA.rawSymbol === 'P'))
        return { text: 'P₂O₅', color: '#F0F0F0' };
      if ((ionA.rawSymbol === 'C' && ionB.rawSymbol === 'H2O') || (ionB.rawSymbol === 'H2O' && ionA.rawSymbol === 'C'))
        return { text: 'CO + H₂', color: '#F0F0F0' };
      if ((ionA.rawSymbol === 'S' && ionB.rawSymbol === 'Cl2') || (ionB.rawSymbol === 'S' && ionA.rawSymbol === 'Cl2'))
        return { text: 'S₂Cl₂', color: '#C98A2E' };
    }

    if (other.type === 'anion') {
      if (nonmetal.rawSymbol === 'Cl2' && other.rawSymbol === 'Br')
        return { text: 'Br₂ ↑', color: '#A52A2A' };
      if (nonmetal.rawSymbol === 'Cl2' && other.rawSymbol === 'I')
        return { text: 'I₂ ↓', color: '#7209B7' };
      if (nonmetal.rawSymbol === 'Br2' && other.rawSymbol === 'I')
        return { text: 'I₂ ↓', color: '#7209B7' };
    }

    if (other.type === 'compound') {
      if (nonmetal.rawSymbol === 'Cl2' && other.rawSymbol === 'H2O') return { text: 'HCl + HClO', color: '#48CAE4' };
      if (nonmetal.rawSymbol === 'Cl2' && other.rawSymbol === 'NaOH') return { text: 'Nước Javen', color: '#E9ECEF' };
      if (nonmetal.rawSymbol === 'Br2' && other.rawSymbol === 'NaOH') return { text: 'NaBr + NaBrO', color: '#E9ECEF' };
      if (nonmetal.rawSymbol === 'Br2' && other.rawSymbol === 'H2O') return { text: 'HBr + HBrO', color: '#FFFFFF' };
      if (nonmetal.rawSymbol === 'I2' && other.rawSymbol === 'NaOH') return { text: 'NaI + NaIO', color: '#E9ECEF' };
    }

    if (other.type === 'metal') {
      const m = other.rawSymbol;
      const nm = nonmetal.rawSymbol;
      let prod = '';

      if (nm === 'Cl2' || nm === 'Br2' || nm === 'I2') {
        const X = nm === 'Cl2' ? 'Cl' : nm === 'Br2' ? 'Br' : 'I';
        if (m === 'Na') prod = `Na${X}`;
        else if (m === 'K') prod = `K${X}`;
        else if (m === 'Ag') prod = `Ag${X}`;
        else if (m === 'Ca') prod = `Ca${X}2`;
        else if (m === 'Ba') prod = `Ba${X}2`;
        else if (m === 'Mg') prod = `Mg${X}2`;
        else if (m === 'Zn') prod = `Zn${X}2`;
        else if (m === 'Cu') prod = `Cu${X}2`;
        else if (m === 'Pb') prod = `Pb${X}2`;
        else if (m === 'Ni') prod = `Ni${X}2`;
        else if (m === 'Al') prod = `Al${X}3`;
        else if (m === 'Fe') prod = `Fe${X}3`;
        else prod = `${m}${X}ₓ`;
      } else if (nm === 'O2') {
        if (m === 'Na') prod = 'Na2O2';
        else if (m === 'K') prod = 'K2O';
        else if (m === 'Ca') prod = 'CaO';
        else if (m === 'Ba') prod = 'BaO';
        else if (m === 'Mg') prod = 'MgO';
        else if (m === 'Zn') prod = 'ZnO';
        else if (m === 'Cu') prod = 'CuO';
        else if (m === 'Pb') prod = 'PbO';
        else if (m === 'Ni') prod = 'NiO';
        else if (m === 'Ag') prod = 'Ag2O';
        else if (m === 'Al') prod = 'Al2O3';
        else if (m === 'Fe') prod = 'Fe3O4';
        else prod = `${m}ₓOᵧ`;
      } else if (nm === 'S') {
        if (m === 'Na') prod = 'Na2S';
        else if (m === 'K') prod = 'K2S';
        else if (m === 'Ag') prod = 'Ag2S';
        else if (m === 'Ca') prod = 'CaS';
        else if (m === 'Ba') prod = 'BaS';
        else if (m === 'Mg') prod = 'MgS';
        else if (m === 'Zn') prod = 'ZnS';
        else if (m === 'Cu') prod = 'CuS';
        else if (m === 'Pb') prod = 'PbS';
        else if (m === 'Ni') prod = 'NiS';
        else if (m === 'Al') prod = 'Al2S3';
        else if (m === 'Fe') prod = 'FeS';
        else prod = `${m}ₓSᵧ`;
      }
      if (PRODUCT_MAP[prod]) {
        return PRODUCT_MAP[prod];
      }
      return { text: prod || 'BÙM!', color: '#F59E0B' };
    }

    return { text: 'Reaction!', color: '#FFFFFF' };
  }

  if ((ionA.type === 'metal' && ionB.type === 'compound') || (ionB.type === 'metal' && ionA.type === 'compound')) {
    const metal = ionA.type === 'metal' ? ionA : ionB;
    const compound = ionA.type === 'metal' ? ionB : ionA;
    if (['Na', 'K', 'Ca', 'Ba'].includes(metal.rawSymbol) && compound.rawSymbol === 'H2O') {
      if (metal.rawSymbol === 'Na') return { text: 'NaOH + H₂↑', color: '#48CAE4' };
      if (metal.rawSymbol === 'K') return { text: 'KOH + H₂↑', color: '#48CAE4' };
      if (metal.rawSymbol === 'Ca') return { text: 'Ca(OH)₂ + H₂↑', color: '#48CAE4' };
      if (metal.rawSymbol === 'Ba') return { text: 'Ba(OH)₂ + H₂↑', color: '#48CAE4' };
    }
    // Al, Zn + NaOH
    if (metal.rawSymbol === 'Al' && compound.rawSymbol === 'NaOH') {
      return { text: 'NaAlO₂ + H₂↑', color: '#48CAE4' };
    }
    if (metal.rawSymbol === 'Zn' && compound.rawSymbol === 'NaOH') {
      return { text: 'Na₂ZnO₂ + H₂↑', color: '#48CAE4' };
    }
  }

  return { text: 'Reaction!', color: '#FFFFFF' };
};

export const getRandomChemicalFromList = (list: string[]): string => {
  if (!list || list.length === 0) {
    const keys = Object.keys(CHEMICALS);
    return keys[Math.floor(Math.random() * keys.length)];
  }
  return list[Math.floor(Math.random() * list.length)];
};
