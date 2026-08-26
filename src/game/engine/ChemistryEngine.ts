
export interface Ion {
  symbol: string;
  charge: number;
}

export const CATION_CHARGES: Record<string, number> = {
  'H': 1, 'NH4': 1, 'Na': 1, 'K': 1, 'Li': 1, 'Ba': 2, 'Ca': 2, 'Mg': 2, 'Al': 3, 'Zn': 2, 'Mn': 2, 'Fe': 2, 'Fe2': 2, 'Fe3': 3, 'Cu': 2, 'Ag': 1, 'Pb': 2, 'Ni': 2, 'Cr': 3
};

export const ANION_CHARGES: Record<string, number> = {
  'Cl': 1, 'Br': 1, 'I': 1, 'NO3': 1, 'SO4': 2, 'SO3': 2, 'CO3': 2, 'PO4': 3, 'S': 2, 'OH': 1, 'CH3COO': 1, 'SiO3': 2, 'CrO4': 2, 'Cr2O7': 2, 'MnO4': 1, 'F': 1
};

const ANION_LIST = ['SO4', 'NO3', 'PO4', 'CO3', 'SO3', 'SiO3', 'CH3COO', 'OH', 'Cl', 'Br', 'I', 'S'];

export const GASES = ['CO2', 'SO2', 'H2S', 'NH3', 'H2', 'O2', 'Cl2', 'NO', 'NO2', 'N2'];
export const WEAK_ELECTROLYTES = ['H2O', 'H2S', 'CH3COOH', 'HF', 'H2SO3', 'H2CO3', 'H3PO4', 'NH3', 'NH4OH'];

import { SOLUBILITY_TABLE } from '../../data/solubilityData';

export const separateIons = (formula: string): { cation: Ion; anion: Ion } | null => {
  let f = formula.trim();
  const sortedAnions = [...ANION_LIST].sort((a, b) => b.length - a.length);
  for (const anion of sortedAnions) {
    const regex = new RegExp(`\\(?${anion}\\)?\\d*$`);
    if (f.match(regex)) {
      const anionStart = f.lastIndexOf(anion);
      let cationPart = f.slice(0, anionStart).replace(/[0-9()]/g, '');
      if (cationPart === '' && f.startsWith('H') && anion !== 'OH') cationPart = 'H';
      if (cationPart === 'Fe') {
        if (f.includes('3')) cationPart = 'Fe3';
        else cationPart = 'Fe2';
      }
      if (cationPart && CATION_CHARGES[cationPart]) {
        return {
          cation: { symbol: cationPart, charge: CATION_CHARGES[cationPart] },
          anion: { symbol: anion, charge: ANION_CHARGES[anion] }
        };
      }
    }
  }
  return null;
};

export const constructFormula = (cation: Ion, anion: Ion): string => {
  const c = cation.charge;
  const a = anion.charge;
  const gcd = (x: number, y: number): number => y === 0 ? x : gcd(y, x % y);
  const common = gcd(c, a);
  const m = a / common;
  const n = c / common;
  const isPoly = (s: string) => s.length > 1 && (/[A-Z].*[A-Z]/.test(s) || /\d/.test(s));
  if (cation.symbol === 'H' && anion.symbol === 'OH') return 'H2O';
  const cStr = m === 1 ? cation.symbol : (isPoly(cation.symbol) ? `(${cation.symbol})${m}` : `${cation.symbol}${m}`);
  const aStr = n === 1 ? anion.symbol : (isPoly(anion.symbol) ? `(${anion.symbol})${n}` : `${anion.symbol}${n}`);
  return cStr + aStr;
};

export const canReact = (reactantA: string, reactantB: string): boolean => {
  const ionA = separateIons(reactantA);
  const ionB = separateIons(reactantB);
  if (!ionA || !ionB) return false;

  const prod1 = constructFormula(ionA.cation, ionB.anion);
  const prod2 = constructFormula(ionB.cation, ionA.anion);

  const checkInsoluble = (cation: Ion, anion: Ion, formula: string) => {
    const cKey = cation.symbol === 'Ag' ? 'Ag+' :
      cation.symbol === 'Al' ? 'Al3+' :
        cation.symbol.match(/[2-3]$/) ? `${cation.symbol.slice(0, -1)}${cation.symbol.slice(-1)}+` :
          (cation.charge > 1 ? `${cation.symbol}${cation.charge}+` : `${cation.symbol}+`);
    const aKey = anion.charge > 1 ? `${anion.symbol}${anion.charge}-` : `${anion.symbol}-`;
    const state = SOLUBILITY_TABLE[cKey]?.[aKey]?.status || 'T';
    return state === 'K' || state === 'I' || GASES.includes(formula) || WEAK_ELECTROLYTES.includes(formula) ||
      ['H2CO3', 'H2SO3', 'NH4OH'].includes(formula);
  };

  return checkInsoluble(ionA.cation, ionB.anion, prod1) || checkInsoluble(ionB.cation, ionA.anion, prod2);
};
