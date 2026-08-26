import { CHEMICALS } from '../constants/ChemicalConstants';
import { SOLUBILITY_TABLE } from '../../data/solubilityData';
import { checkReaction as checkNonMetalReaction, getReactionProduct as getNonMetalReactionProduct } from './NonMetalChemistryLogic';
import { evaluateOrganicReaction } from './OrganicChemistryLogic';

/**
 * Logic phản ứng Ion thuần túy cho Game
 */
export const checkReaction = (idA: string, idB: string): boolean => {
  const ionA = CHEMICALS[idA];
  const ionB = CHEMICALS[idB];

  if (!ionA || !ionB) return false;

  // 1. Cùng loại ion thì không phản ứng
  if (ionA.type === ionB.type) return false;

  // Xử lý phản ứng kim loại tác dụng với muối (Kim loại đẩy kim loại yếu hơn)
  if (ionA.type === 'metal' || ionB.type === 'metal') {
    if (ionA.type === 'metal' && ionB.type === 'cation') {
      return checkMetalDisplacement(ionA, ionB);
    }
    if (ionB.type === 'metal' && ionA.type === 'cation') {
      return checkMetalDisplacement(ionB, ionA);
    }
    return false; // Kim loại không tác dụng trực tiếp với Anion trong game bắn bóng
  }

  const cation = ionA.type === 'cation' ? ionA : ionB;
  const anion = ionA.type === 'anion' ? ionA : ionB;

  // 2. Sử dụng trực tiếp id của ion làm key tra bảng tính tan
  const cKey = cation.id;
  const aKey = anion.id;

  if (!cKey || !aKey) return false;

  // 3. Tra bảng tính tan
  const info = SOLUBILITY_TABLE[cKey]?.[aKey];
  const state = info ? info.status : 'T';

  // Kết tủa hoặc Phân hủy/Thủy phân (ví dụ AgOH, Al2(CO3)3)
  if (state === 'K' || state === 'I' || state === '-') return true;

  // Nước (H+ + OH-)
  if (cation.rawSymbol === 'H' && anion.rawSymbol === 'OH') return true;

  // Khí (H+ kết hợp với CO3, SO3, S)
  if (cation.rawSymbol === 'H' && (anion.rawSymbol === 'CO3' || anion.rawSymbol === 'SO3' || anion.rawSymbol === 'S')) return true;

  // Axit yếu (H+ kết hợp với gốc axit yếu)
  if (cation.rawSymbol === 'H' && (anion.rawSymbol === 'CH3COO' || anion.rawSymbol === 'PO4' || anion.rawSymbol === 'F')) return true;

  // Khí Amoniac (NH4+ + OH-)
  if (cation.rawSymbol === 'NH4' && anion.rawSymbol === 'OH') return true;

  return false;
};

// Dãy hoạt động hóa học của kim loại
const ACTIVITY_SERIES = ['K', 'Na', 'Ba', 'Ca', 'Mg', 'Al', 'Zn', 'Fe', 'Ni', 'Sn', 'Pb', 'H', 'Cu', 'Hg', 'Ag', 'Pt', 'Au'];

const checkMetalDisplacement = (metal: any, cation: any): boolean => {
  const mIdx = ACTIVITY_SERIES.indexOf(metal.rawSymbol);
  const cIdx = ACTIVITY_SERIES.indexOf(cation.rawSymbol);

  // Nếu không có trong dãy thì không phản ứng
  if (mIdx === -1 || cIdx === -1) return false;

  // Kim loại phải mạnh hơn (đứng trước) ion kim loại trong dãy hoạt động
  return mIdx < cIdx;
};

const getSubscript = (num: number) => {
  const subs = ['₀', '₁', '₂', '₃', '₄', '₅', '₆', '₇', '₈', '₉'];
  return num.toString().split('').map(d => subs[parseInt(d)]).join('');
};

const formatRaw = (str: string) => str.replace(/\d/g, d => getSubscript(parseInt(d)));

const getValency = (id: string) => {
  // Only match a single digit before the charge sign to avoid matching subscripts like the 3 in CO32-
  const match = id.match(/(\d)[+-]$/);
  return match ? parseInt(match[1]) : 1;
};

const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);

/**
 * Lấy sản phẩm phản ứng dạng chuỗi để hiển thị text bay lên
 */
export const getReactionProduct = (idA: string, idB: string): { text: string, color: string } | null => {
  const ionA = CHEMICALS[idA];
  const ionB = CHEMICALS[idB];
  if (!ionA || !ionB) return null;
  if (ionA.type === ionB.type) return null;

  if (ionA.type === 'metal' || ionB.type === 'metal') {
    const metal = ionA.type === 'metal' ? ionA : ionB;
    const cation = ionA.type === 'cation' ? ionA : ionB;
    if (metal && cation) {
      if (cation.rawSymbol === 'H') {
        return { text: `H₂ ↑`, color: '#FFFFFF' };
      }
      return { text: `${cation.rawSymbol} ↓`, color: '#FFFFFF' };
    }
  }

  const cation = ionA.type === 'cation' ? ionA : ionB;
  const anion = ionA.type === 'anion' ? ionA : ionB;

  if (cation.rawSymbol === 'H' && anion.rawSymbol === 'OH') return { text: 'H₂O', color: '#48CAE4' };
  if (cation.rawSymbol === 'H' && anion.rawSymbol === 'CO3') return { text: 'CO₂ ↑', color: '#FFFFFF' };
  if (cation.rawSymbol === 'H' && anion.rawSymbol === 'SO3') return { text: 'SO₂ ↑', color: '#FFFFFF' };
  if (cation.rawSymbol === 'H' && anion.rawSymbol === 'S') return { text: 'H₂S ↑', color: '#FFFFFF' };
  if (cation.rawSymbol === 'NH4' && anion.rawSymbol === 'OH') return { text: 'NH₃ ↑', color: '#FFFFFF' };
  if (cation.rawSymbol === 'Ag' && anion.rawSymbol === 'OH') return { text: 'Ag₂O ↓', color: '#333333' };

  // --- Các phản ứng Oxi hóa - Khử nội tại ---
  if (cation.id === 'Fe3+' && anion.id === 'I-') return { text: 'FeI₂ + I₂ ↓', color: '#555555' };
  if (cation.id === 'Fe3+' && anion.id === 'S2-') return { text: 'FeS ↓ + S ↓', color: '#FFFF00' };
  if (cation.id === 'Cu2+' && anion.id === 'I-') return { text: 'CuI ↓ + I₂ ↓', color: '#FFFFFF' };

  // --- Các phản ứng Thủy phân kép ---
  const isTrivalent = ['Al3+', 'Fe3+', 'Cr3+'].includes(cation.id);
  if (isTrivalent && ['CO32-', 'SO32-', 'S2-'].includes(anion.id)) {
    let gas = '';
    if (anion.id === 'CO32-') gas = 'CO₂ ↑';
    else if (anion.id === 'SO32-') gas = 'SO₂ ↑';
    else if (anion.id === 'S2-') gas = 'H₂S ↑';

    let pptColor = '#FFFFFF';
    if (cation.id === 'Fe3+') pptColor = '#A52A2A'; // Nâu đỏ
    else if (cation.id === 'Cr3+') pptColor = '#556B2F'; // Xanh xám

    return { text: `${cation.rawSymbol}(OH)₃ ↓ + ${gas}`, color: pptColor };
  }

  // Phân hủy sulfide của Mg, Ca
  if (['Mg2+', 'Ca2+'].includes(cation.id) && anion.id === 'S2-') {
    return { text: `${cation.rawSymbol}(OH)₂ ↓ + H₂S ↑`, color: '#FFFFFF' };
  }

  const cKey = cation.id;
  const aKey = anion.id;

  if (cKey && aKey) {
    const info = SOLUBILITY_TABLE[cKey]?.[aKey];
    if (info && (info.status === 'K' || info.status === 'I' || info.status === '-')) {
      const cVal = getValency(cation.id);
      const aVal = getValency(anion.id);
      const common = gcd(cVal, aVal);
      const cCount = aVal / common;
      const aCount = cVal / common;

      let cPart = formatRaw(cation.rawSymbol);
      if (cCount > 1) {
        if (['NH4'].includes(cation.rawSymbol)) cPart = `(${cPart})${getSubscript(cCount)}`;
        else cPart = `${cPart}${getSubscript(cCount)}`;
      }

      let aPart = formatRaw(anion.rawSymbol);
      if (aCount > 1) {
        if (['OH', 'NO3', 'SO4', 'SO3', 'CO3', 'PO4', 'SiO3', 'CH3COO', 'CrO4', 'Cr2O7', 'MnO4'].includes(anion.rawSymbol)) {
          aPart = `(${aPart})${getSubscript(aCount)}`;
        } else {
          aPart = `${aPart}${getSubscript(aCount)}`;
        }
      }

      return { text: `${cPart}${aPart} ↓`, color: info.color || '#FFFFFF' };
    }
  }

  return { text: 'Reaction!', color: '#FFFFFF' };
};

/**
 * Lấy ngẫu nhiên ID của Ion từ danh sách cho trước
 */
export const getRandomChemicalFromList = (list: string[]): string => {
  if (!list || list.length === 0) return getRandomChemical();
  return list[Math.floor(Math.random() * list.length)];
};

/**
 * Lấy ngẫu nhiên ID của Ion
 */
export const getRandomChemical = (): string => {
  const keys = Object.keys(CHEMICALS);
  return keys[Math.floor(Math.random() * keys.length)];
};

export function checkReactionForMode(mode: string, idA: string, idB: string): boolean {
  if (mode === 'nonmetal') return checkNonMetalReaction(idA, idB);
  if (mode === 'organic') return evaluateOrganicReaction(idA, idB).isMatch;
  return checkReaction(idA, idB);
}

export function getProductForMode(mode: string, idA: string, idB: string): {text: string, color: string} | null {
  if (mode === 'nonmetal') return getNonMetalReactionProduct(idA, idB);
  if (mode === 'organic') {
    const res = evaluateOrganicReaction(idA, idB);
    if (res.isMatch && res.product) return { text: res.product, color: '#10b981' };
    return null;
  }
  return getReactionProduct(idA, idB);
}

export function getRandomFromList(list: string[]): string {
  return getRandomChemicalFromList(list);
}
