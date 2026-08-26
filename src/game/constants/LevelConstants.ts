export interface LevelConfig {
  id: number;
  title: string;
  rows: number;
  chemicals: string[];
  speedMultiplier: number;
  targetScore: number;
}

// ── ION REACTION LEVELS ──
export const ION_LEVELS: LevelConfig[] = [
  { id:1,  title:'The Neutralizer',   rows:4, chemicals:['Ag+','H+','CO32-','OH-','S2-'],           speedMultiplier:1.2, targetScore:15000 },
  { id:2,  title:'Heavy Shells',      rows:4, chemicals:['Pb2+','Ca2+','CO32-','PO43-','S2-'],       speedMultiplier:1.4, targetScore:30000 },
  { id:3,  title:'Copper Iodide',     rows:4, chemicals:['Pb2+','Cu2+','OH-','I-','SO32-'],          speedMultiplier:1.6, targetScore:45000 },
  { id:4,  title:'Iron-Copper Quest', rows:4, chemicals:['Ni2+','Fe2+','CO32-','PO43-','S2-'],       speedMultiplier:1.8, targetScore:60000 },
  { id:5,  title:'Magnesium Core',    rows:4, chemicals:['Mn2+','Mg2+','CO32-','PO43-','S2-'],       speedMultiplier:1.8, targetScore:80000 },
  { id:6,  title:'Amphoteric Base',   rows:4, chemicals:['Zn2+','Cr3+','CO32-','OH-','PO43-'],       speedMultiplier:2.0, targetScore:100000 },
  { id:7,  title:'Halogen Trap',      rows:4, chemicals:['Ag+','Pb2+','Br-','I-','Cl-'],             speedMultiplier:2.0, targetScore:120000 },
  { id:8,  title:'Barium & Ammonia',  rows:4, chemicals:['Ba2+','NH4+','SO42-','CO32-','OH-'],       speedMultiplier:2.0, targetScore:140000 },
  { id:9,  title:'Silver Silicate',   rows:4, chemicals:['Ag+','Ba2+','PO43-','SO32-'],              speedMultiplier:2.0, targetScore:160000 },
  { id:10, title:'Ferric Silicate',   rows:4, chemicals:['Mn2+','Fe3+','OH-','SO32-','CrO42-'],      speedMultiplier:2.0, targetScore:180000 },
  { id:11, title:'Active Sulfides',   rows:4, chemicals:['Zn2+','Al3+','S2-','SO32-','CrO42-'],      speedMultiplier:2.0, targetScore:200000 },
  { id:12, title:'Acidic Hard Water', rows:4, chemicals:['Ca2+','Mg2+','H+','SO32-','OH-'],          speedMultiplier:2.0, targetScore:220000 },
  { id:13, title:'Silicate Mix',      rows:4, chemicals:['Mn2+','Ni2+','Mg2+','SiO32-','F-'],        speedMultiplier:2.2, targetScore:Infinity },
];

// ── METAL LEVELS ──
export const METAL_LEVELS: LevelConfig[] = [
  { id:1,  title:'Warm Up',           rows:4, chemicals:['Mg','Zn','Al3+','Fe2+'],                  speedMultiplier:1.1, targetScore:10000 },
  { id:2,  title:'Getting Started',   rows:4, chemicals:['Al','Zn','Ni2+','Pb2+'],                  speedMultiplier:1.2, targetScore:30000 },
  { id:3,  title:'Local Battle',      rows:4, chemicals:['Fe','Pb','Ni2+','Cu2+'],                  speedMultiplier:1.4, targetScore:50000 },
  { id:4,  title:'Rising Pressure',   rows:4, chemicals:['Mg','Al','Zn','Fe2+','Ni2+','Pb2+'],      speedMultiplier:1.6, targetScore:70000 },
  { id:5,  title:'Control',           rows:4, chemicals:['Zn','Fe','Ni','Pb2+','Cu2+','Ag+'],       speedMultiplier:1.8, targetScore:90000 },
  { id:6,  title:'Art of Choice',     rows:4, chemicals:['Mg','Zn','Ni','Al3+','Fe2+','Pb2+'],      speedMultiplier:2.0, targetScore:110000 },
  { id:7,  title:'Smart Calc',        rows:4, chemicals:['Fe','Cu','Pb','Ni2+','Cu2+','Ag+'],       speedMultiplier:2.0, targetScore:130000 },
  { id:8,  title:'Chain Reaction',    rows:4, chemicals:['Al','Fe','Cu','Zn2+','Ni2+','Ag+'],       speedMultiplier:2.0, targetScore:150000 },
  { id:9,  title:'Long Campaign',     rows:4, chemicals:['Mg','Ni','Pb','Al3+','Cu2+','Ag+'],       speedMultiplier:2.0, targetScore:170000 },
  { id:10, title:'Reaction Master',   rows:4, chemicals:['Al','Cu','Fe2+','Pb2+','Ag+'],            speedMultiplier:2.2, targetScore:Infinity },
];

// ── ORGANIC LEVELS ──
export const ORGANIC_LEVELS: LevelConfig[] = [
  { id:1,  title:'Organic Start',     rows:4, chemicals:['C2H4','H2O','CH4','Cl2_askt'],            speedMultiplier:1.2, targetScore:15000 },
  { id:2,  title:'Acid & Precipitate',rows:4, chemicals:['C2H4','HCl','C2H2','AgNO3_NH3'],          speedMultiplier:1.4, targetScore:30000 },
  { id:3,  title:'Add & Reduce',      rows:4, chemicals:['CH3COCH3','CH3CHO','C2H4','H2_Ni','CH3COOH','Na'], speedMultiplier:1.6, targetScore:45000 },
  { id:4,  title:'Aromatic Subst.',   rows:4, chemicals:['C6H5CH3','Br2_Fe','CH3COOH','NaOH','C2H5OH','Na'], speedMultiplier:1.8, targetScore:60000 },
  { id:5,  title:'Hydrolysis',        rows:4, chemicals:['HCOOCH3','HCOOH','C2H5Cl','NaOH_t','AgNO3_NH3'], speedMultiplier:2.0, targetScore:75000 },
  { id:6,  title:'Hydrogen Storm',    rows:4, chemicals:['CH3COCH3','C2H4','C6H5OH','H2_Ni','Br2'], speedMultiplier:2.0, targetScore:90000 },
  { id:7,  title:'Light & Dark',      rows:4, chemicals:['CH4','Cl2_askt','C6H6','Br2_Fe'],         speedMultiplier:2.0, targetScore:110000 },
  { id:8,  title:'Multi-Function',    rows:4, chemicals:['C6H5OH','C2H4','CH3COOH','Br2','NaOH'],   speedMultiplier:2.0, targetScore:130000 },
  { id:9,  title:'Critical Choice',   rows:4, chemicals:['C6H5CH3','C6H6','CH3COOH','KMnO4_t','Br2_Fe','NaOH'], speedMultiplier:2.0, targetScore:150000 },
  { id:10, title:'Final Chain',       rows:4, chemicals:['CH4','C2H4','Br2','CH3COOH','NaOH'],      speedMultiplier:2.2, targetScore:Infinity },
];

// ── NONMETAL LEVELS ──
export const NONMETAL_LEVELS: LevelConfig[] = [
  { id:1,  title:'Basic Reactions',   rows:4, chemicals:['H2','O2','Cl2','Na'],                     speedMultiplier:1.2, targetScore:12000 },
  { id:2,  title:'Halogen Series',    rows:4, chemicals:['Cl2','Br2','I2','Na','Ca'],               speedMultiplier:1.4, targetScore:28000 },
  { id:3,  title:'Oxide Battle',      rows:4, chemicals:['O2','C','S','P','Na'],                    speedMultiplier:1.6, targetScore:44000 },
  { id:4,  title:'Metal Meets Gas',   rows:4, chemicals:['H2','Cl2','O2','Fe','Cu','Al'],           speedMultiplier:1.8, targetScore:60000 },
  { id:5,  title:'Displacement',      rows:4, chemicals:['Cl2','Br2','I2','Br-','I-','Na','Mg'],    speedMultiplier:2.0, targetScore:80000 },
  { id:6,  title:'Mixed NonMetal',    rows:4, chemicals:['H2','O2','N2','S','C','Cl2'],             speedMultiplier:2.0, targetScore:100000 },
  { id:7,  title:'Advanced Combo',    rows:4, chemicals:['H2','Cl2','Br2','I2','O2','Na','Zn'],     speedMultiplier:2.0, targetScore:120000 },
  { id:8,  title:'Solution React',    rows:4, chemicals:['Cl2','H2O','NaOH','Br2','I2'],            speedMultiplier:2.0, targetScore:140000 },
  { id:9,  title:'Full Spectrum',     rows:4, chemicals:['H2','O2','Cl2','Br2','I2','S','Na','Fe'], speedMultiplier:2.0, targetScore:160000 },
  { id:10, title:'Grandmaster',       rows:4, chemicals:['Cl2','Br2','I2','O2','H2','S','C','P','Na','Fe'], speedMultiplier:2.2, targetScore:Infinity },
];

export type GameMode = 'ion' | 'metal' | 'organic' | 'nonmetal';

export function getLevelsForMode(mode: GameMode): LevelConfig[] {
  switch (mode) {
    case 'ion':     return ION_LEVELS;
    case 'metal':   return METAL_LEVELS;
    case 'organic': return ORGANIC_LEVELS;
    case 'nonmetal':return NONMETAL_LEVELS;
  }
}

export function getLevelConfig(mode: GameMode, level: number): LevelConfig {
  const levels = getLevelsForMode(mode);
  return levels[(level - 1) % levels.length];
}
