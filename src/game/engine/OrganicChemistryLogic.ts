import { ORGANIC_CHEMICALS } from '../constants/OrganicChemicals';

export interface OrganicReactionResult {
  isMatch: boolean;
  score: number;
  product?: string;
}

export function evaluateOrganicReaction(targetId: string, reagentId: string): OrganicReactionResult {
  let target = ORGANIC_CHEMICALS[targetId];
  let reagent = ORGANIC_CHEMICALS[reagentId];

  if (!target || !reagent) return { isMatch: false, score: 0 };

  // Make the logic symmetric: if target is a reagent and the fired bubble is a chemical, swap them!
  if (target.type === 'reagent' && reagent.type !== 'reagent') {
    const temp = target;
    target = reagent;
    reagent = temp;
  }

  let productFormula = '';
  let isMatch = false;
  let score = 0;

  // Addition Reactions (Alkenes)
  if (target.type === 'alkene') {
    if (reagent.id === 'Br2') {
      isMatch = true; score = 200;
      if (target.id === 'C2H4') productFormula = 'C₂H₄Br₂';
      else if (target.id === 'C3H6') productFormula = 'C₃H₆Br₂';
      else productFormula = 'CₙH₂ₙBr₂';
    } else if (reagent.id === 'H2_Ni') {
      isMatch = true; score = 200;
      if (target.id === 'C2H4') productFormula = 'C₂H₆';
      else if (target.id === 'C3H6') productFormula = 'C₃H₈';
      else productFormula = 'CₙH₂ₙ₊₂';
    } else if (reagent.id === 'H2O_H') {
      isMatch = true; score = 250;
      if (target.id === 'C2H4') productFormula = 'C₂H₅OH';
      else if (target.id === 'C3H6') productFormula = 'CH₃CH(OH)CH₃';
      else productFormula = 'CₙH₂ₙ₊₁OH';
    } else if (reagent.id === 'HCl') {
      isMatch = true; score = 250;
      if (target.id === 'C2H4') productFormula = 'C₂H₅Cl';
      else if (target.id === 'C3H6') productFormula = 'CH₃CHClCH₃';
      else productFormula = 'CₙH₂ₙ₊₁Cl';
    } else if (reagent.id === 'Cl2_askt') {
      isMatch = true; score = 250;
      if (target.id === 'C2H4') productFormula = 'C₂H₄Cl₂';
      else if (target.id === 'C3H6') productFormula = 'C₃H₆Cl₂';
      else productFormula = 'CₙH₂ₙCl₂';
    } else if (reagent.id === 'CuO_t') {
      isMatch = true; score = 250;
      productFormula = 'CO₂↑ + Cu↓';
    }
  }
  // Substitution Reactions (Alkanes with Cl2/askt)
  else if (target.type === 'alkane') {
    if (reagent.id === 'Cl2_askt') {
      isMatch = true; score = 300;
      if (target.id === 'CH4') productFormula = 'CH₃Cl';
      else if (target.id === 'C2H6') productFormula = 'C₂H₅Cl';
      else if (target.id === 'C2H5Cl') productFormula = 'C₂H₄Cl₂';
      else productFormula = 'CₙH₂ₙ₊₁Cl';
    } else if (target.id === 'C2H5Cl' && reagent.id === 'NaOH_t') {
      isMatch = true; score = 350; productFormula = 'C₂H₅OH';
    } else if (reagent.id === 'CuO_t') {
      isMatch = true; score = 300; productFormula = 'CO₂↑ + Cu↓';
    }
  }
  // Oxidation (Alcohols with CuO/t°)
  else if (target.type === 'alcohol') {
    if (reagent.id === 'CuO_t') {
      isMatch = true; score = 250;
      if (target.id === 'C2H5OH') productFormula = 'CH₃CHO';
      else productFormula = 'RCHO';
    } else if (reagent.id === 'Na') {
      isMatch = true; score = 300;
      if (target.id === 'C2H5OH') productFormula = 'C₂H₅ONa + 1/2 H₂↑';
      else productFormula = 'RONa + 1/2 H₂↑';
    }
  }
  // Oxidation (Aromatics with KMnO4/t°) and Substitution (Br2/Fe)
  else if (target.type === 'aromatic') {
    if (reagent.id === 'KMnO4_t' && target.id === 'C6H5CH3') {
      isMatch = true; score = 400; productFormula = 'C₆H₅COOK';
    } else if (reagent.id === 'Br2_Fe') {
      isMatch = true; score = 350;
      if (target.id === 'C6H6') productFormula = 'C₆H₅Br';
      else if (target.id === 'C6H5CH3') productFormula = 'CH₃C₆H₄Br';
    }
  }
  // 9. Phản ứng thế ion kim loại (Alkyne)
  else if (target.type === 'alkyne') {
    if (reagent.id === 'AgNO3_NH3') {
      isMatch = true; score = 450;
      if (target.id === 'C2H2') productFormula = 'C₂Ag₂↓';
      else if (target.id === 'C3H4') productFormula = 'C₃H₃Ag↓';
      else productFormula = 'CAg≡C-R↓';
    } else if (reagent.id === 'Br2') {
      isMatch = true; score = 300;
      if (target.id === 'C2H2') productFormula = 'C₂H₂Br₄';
      else if (target.id === 'C3H4') productFormula = 'C₃H₄Br₄';
      else productFormula = 'CₙH₂ₙ₋₂Br₄';
    } else if (reagent.id === 'CuO_t') {
      isMatch = true; score = 250;
      productFormula = 'CO₂↑ + Cu↓';
    }
  }
  // Neutralization
  else if (target.type === 'carboxylic') {
    if (reagent.id === 'Na') {
      isMatch = true; score = 300;
      if (target.id === 'CH3COOH') productFormula = 'CH₃COONa + 1/2 H₂↑';
      else productFormula = 'RCOONa + 1/2 H₂↑';
    } else if (reagent.id === 'NaOH') {
      isMatch = true; score = 300;
      if (target.id === 'CH3COOH') productFormula = 'CH₃COONa';
      else productFormula = 'RCOONa';
    } else if (reagent.id === 'AgNO3_NH3') {
      if (target.id === 'HCOOH') {
        isMatch = true; score = 450; productFormula = '2Ag↓';
      }
    }
  }
  // Reduction of Ketones
  else if (target.type === 'ketone') {
    if (reagent.id === 'H2_Ni') {
      isMatch = true; score = 350;
      if (target.id === 'CH3COCH3') productFormula = 'CH₃CH(OH)CH₃';
      else productFormula = 'RCH(OH)R';
    }
  }
  // Bromination of Phenol
  else if (target.type === 'phenol') {
    if (reagent.id === 'Br2') {
      isMatch = true; score = 400; productFormula = 'C₆H₂Br₃OH↓';
    } else if (reagent.id === 'NaOH') {
      isMatch = true; score = 350; productFormula = 'C₆H₅ONa';
    } else if (reagent.id === 'Na') {
      isMatch = true; score = 300; productFormula = 'C₆H₅ONa + 1/2 H₂↑';
    }
  }

  // Hydrolysis of Ester
  else if (target.type === 'ester') {
    if (reagent.id === 'NaOH_t') {
      isMatch = true; score = 300; productFormula = 'HCOONa + CH₃OH';
    } else if (reagent.id === 'AgNO3_NH3') {
      isMatch = true; score = 400; productFormula = '2Ag↓';
    }
  }
  // Reduction of Aldehyde
  else if (target.type === 'aldehyde') {
    if (reagent.id === 'H2_Ni') {
      isMatch = true; score = 350;
      if (target.id === 'HCHO') productFormula = 'CH₃OH';
      else productFormula = 'C₂H₅OH';
    } else if (reagent.id === 'AgNO3_NH3') {
      isMatch = true; score = 400;
      if (target.id === 'HCHO') productFormula = '4Ag↓';
      else productFormula = '2Ag↓';
    }
  }

  if (isMatch) {
    return { isMatch: true, score, product: productFormula };
  }

  return { isMatch: false, score: 0 };
}
