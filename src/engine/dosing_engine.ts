export interface CalculationInput {
  birth_weight_kg: number;
  current_weight_kg: number;
  gestational_age_weeks: number;
  day_of_life: number;
  is_asphyxia: boolean;
  is_phototherapy?: boolean;
  is_radiant_warmer?: boolean;
  base_excess?: number;
  dose_number?: number;
  drug_name?: string;
}

export interface CalculationOutput {
  fluid_volume_ml_per_day?: number;
  fluid_type?: string;
  drug_dose?: string;
  drug_interval?: string;
  preparation_steps?: string;
  drug_base_concentration?: string;
  drug_volume_to_draw?: string;
  warnings?: string[];
}

export const DRUG_REGISTRY = [
  // Additional Protocol Drugs (Found in PDF Audit)
  { id: 'normal_saline_bolus', name: 'Inj Normal Saline (Bolus)' },
  { id: 'glucose_10_bolus', name: 'Inj 10% Glucose (Bolus)' },
  { id: 'salbutamol_neb', name: 'Salbutamol (Nebulisation)' },
  { id: 'kayexelate_enema', name: 'Kayexelate (Enema)' },
  { id: 'cotrimoxazole', name: 'Syp Co-trimoxazole' },
  { id: 'hbig', name: 'Hepatitis B Immunoglobulin (HBIG)' },
  { id: 'hep_b_vaccine', name: 'Hepatitis B Vaccine' },
  { id: 'vzig', name: 'Varicella Zoster Ig (VZIG)' },

  // Antibiotics & Antivirals
  { id: 'ampicillin', name: 'Inj Ampicillin' },
  { id: 'gentamicin', name: 'Inj Gentamicin' },
  { id: 'cefotaxime', name: 'Inj Cefotaxime' },
  { id: 'ceftazidime', name: 'Inj Ceftazidime' },
  { id: 'amikacin', name: 'Inj Amikacin' },
  { id: 'meropenem', name: 'Inj Meropenem' },
  { id: 'imipenem', name: 'Inj Imipenem/cilastatin' },
  { id: 'vancomycin', name: 'Inj Vancomycin' },
  { id: 'netilmicin', name: 'Inj Netilmicin' },
  { id: 'ciprofloxacin', name: 'Inj Ciprofloxacin' },
  { id: 'clarithromycin', name: 'Inj Clarithromicin' },
  { id: 'colistin', name: 'Inj Colistin' },
  { id: 'cefepime', name: 'Inj Cefepime' },
  { id: 'piperacillin', name: 'Inj Piperacillin-Tazobactam' },
  { id: 'linezolid', name: 'Inj Linezolid' },
  { id: 'metronidazole', name: 'Inj Metronidazole' },
  { id: 'acyclovir', name: 'Inj Acyclovir' },
  { id: 'fluconazole', name: 'Inj Fluconazole' },
  { id: 'flucloxacillin', name: 'Inj Flucloxacillin' },
  // Cardiovascular & Diuretics
  { id: 'frusemide', name: 'Inj Frusemide' },
  { id: 'frusemide_spiro', name: 'Tab Frusemide+Spironolactone' },
  { id: 'captopril', name: 'Tab Captopril' },
  { id: 'ibuprofen', name: 'Syp Ibuprofen (PDA)' },
  { id: 'paracetamol_iv', name: 'Inj Paracetamol' },
  { id: 'prostaglandin', name: 'Inj Prostaglandin E1 (PGE1)' },
  { id: 'sildenafil', name: 'Tab Sildenafil' },
  { id: 'adenosine', name: 'Inj Adenosine' },
  { id: 'digoxin_iv_maint', name: 'Inj Digoxin (Maint)' },
  { id: 'dopamine_cardiac', name: 'Inj Dopamine (Cardiac)' },
  { id: 'dobutamine', name: 'Inj Dobutamine' },
  { id: 'adrenaline', name: 'Inj Adrenaline (1:10,000)' },
  // Neurology & Seizures
  { id: 'phenobarbitone_load', name: 'Inj Phenobarbitone (Loading)' },
  { id: 'phenobarbitone_maint', name: 'Inj Phenobarbitone (Maint)' },
  { id: 'fosphenytoin_load', name: 'Inj Fosphenytoin (Loading)' },
  { id: 'fosphenytoin_maint', name: 'Inj Fosphenytoin (Maint)' },
  { id: 'midazolam', name: 'Inj Midazolam (Continuous)' },
  { id: 'levetiracetam', name: 'Levetiracetam' },
  { id: 'morphine', name: 'Inj Morphine' },
  { id: 'fentanyl', name: 'Inj Fentanyl' },
  { id: 'pyridoxine', name: 'Inj Pyridoxine' },
  // Respiratory
  { id: 'aminophyllin_load', name: 'Inj Aminophyllin (Loading)' },
  { id: 'aminophyllin_maint', name: 'Inj Aminophyllin (Maint)' },
  { id: 'caffeine_load', name: 'Caffeine (Loading)' },
  { id: 'caffeine_maint', name: 'Caffeine (Maint)' },
  { id: 'dexamethasone', name: 'Inj Dexamethasone' },
  // Metabolic & Endocrine
  { id: 'insulin', name: 'Insulin Infusion' },
  { id: 'hydrocortisone', name: 'Inj Hydrocortisone' },
  { id: 'diazoxide', name: 'Diazoxide' },
  { id: 'glucagon', name: 'Inj Glucagon' },
  { id: 'octreotide', name: 'Inj Octreotide' },
  { id: 'levothyroxine', name: 'Tab Levo-thyroxine' },
  { id: 'calcium_gluconate', name: 'Inj 10% Calcium Gluconate' },
  { id: 'phytomenadion', name: 'Inj Phytomenadion (Vit K)' },
  // GI & Nutrition
  { id: 'ranitidine', name: 'Inj Ranitidine' },
  { id: 'udca', name: 'Syp UDCA' },
  { id: 'multivitamin', name: 'Syp Multi-vitamin' },
  { id: 'folic_acid', name: 'Tab Folic Acid' },
  { id: 'iron', name: 'Syp Iron' },
  { id: 'surfactant_curosurf', name: 'Surfactant (Curosurf)' },
  { id: 'surfactant_survanta', name: 'Surfactant (Survanta)' },
  { id: 'domperidone', name: 'Domperidone Paed Drop' },
  // Others / Infectious
  { id: 'naloxone', name: 'Inj Naloxone' },
  { id: 'immunoglobin', name: 'Inj Immunoglobin' },
  { id: 'nystatin', name: 'Nystatin Oral Suspension' },
  { id: 'nevirapine', name: 'Nevirapine (HIV Prophylaxis)' },
  { id: 'zidovudine', name: 'Zidovudine (HIV Prophylaxis)' },
  { id: 'penicillin_aqueous', name: 'Aq. Crystalline Penicillin G' },
  { id: 'penicillin_procaine', name: 'Procaine Penicillin G' },
  { id: 'penicillin_benzathine', name: 'Benzathine Penicillin G' },
  { id: 'isoniazid', name: 'Isoniazid (Anti-TB)' },
  { id: 'rifampicin', name: 'Rifampicin (Anti-TB)' },
  { id: 'pyrazinamide', name: 'Pyrazinamide (Anti-TB)' },
  { id: 'ethambutol', name: 'Ethambutol (Anti-TB)' },
  { id: 'streptomycin', name: 'Streptomycin (Anti-TB)' },
];

/**
 * Deterministic Calculation Script
 * Implements the Dual-Weight System: 
 * - birth_weight_kg is used for fluid category selection
 * - current_weight_kg is used for active drug calculations
 */
export function calculateNICUDosing(input: CalculationInput): CalculationOutput {
  const { drug_name, is_asphyxia, is_phototherapy, is_radiant_warmer } = input;
  
  // Sanitize Inputs to prevent negative numbers and zeros from breaking math
  const birth_weight_kg = Math.max(0.1, Math.abs(input.birth_weight_kg));
  const current_weight_kg = Math.max(0.1, Math.abs(input.current_weight_kg));
  const gestational_age_weeks = Math.max(20, Math.abs(input.gestational_age_weeks));
  const day_of_life = Math.max(1, Math.abs(input.day_of_life));
  const base_excess = input.base_excess;
  
  let output: CalculationOutput = {};
  const warnings: string[] = [];

  // CLINICAL GUARDRAILS (Rules Violation Strategy)
  if (birth_weight_kg > 6.0) {
    warnings.push(`CRITICAL: Birth weight (${birth_weight_kg}kg) exceeds normal neonatal limits. Verify for decimal typos.`);
  }
  if (current_weight_kg > 7.0) {
    warnings.push(`CRITICAL: Current weight (${current_weight_kg}kg) exceeds normal neonatal limits. Verify for decimal typos.`);
  }
  if (gestational_age_weeks < 22 || gestational_age_weeks > 44) {
    warnings.push(`WARNING: Gestational age (${gestational_age_weeks} weeks) is outside typical viability or post-term limits.`);
  }
  if (day_of_life > 60) {
    warnings.push(`WARNING: Day of Life (${day_of_life}) exceeds the typical neonatal period. NICU protocols may no longer apply.`);
  }
  if (current_weight_kg > birth_weight_kg * 1.5 && day_of_life < 14) {
    warnings.push(`WARNING: Rapid weight gain detected (Birth: ${birth_weight_kg}kg -> Current: ${current_weight_kg}kg). Check for edema or input errors.`);
  }
  if (current_weight_kg < birth_weight_kg * 0.7) {
    warnings.push(`CRITICAL: Severe weight loss detected (>30% below birth weight). Verify current weight input.`);
  }

  output.warnings = warnings;
  
  // 1. Fluid Calculation (Based on Birth Weight)
  let fluidRatePerKg = 0;
  let fluidType = "";
  
  const isTermOrGt1500g = birth_weight_kg > 1.5;
  const isExtremelyPreterm = birth_weight_kg < 1.0;
  
  if (day_of_life === 1) {
    if (isExtremelyPreterm) fluidType = "5% Dextrose in Aqua";
    else if (!isTermOrGt1500g) fluidType = "7.5% - 10% Dextrose in Aqua";
    else fluidType = "10% Dextrose in Aqua";
  } else {
    fluidType = "Dextrose in 0.225% saline";
  }

  if (day_of_life === 1) {
    if (isExtremelyPreterm) fluidRatePerKg = 90;
    else if (!isTermOrGt1500g) fluidRatePerKg = 80;
    else fluidRatePerKg = 60;
  } else if (day_of_life === 2) {
    fluidRatePerKg = isTermOrGt1500g ? 80 : 100;
  } else if (day_of_life === 3) {
    fluidRatePerKg = isTermOrGt1500g ? 100 : 120;
  } else if (day_of_life === 4) {
    fluidRatePerKg = isTermOrGt1500g ? 120 : 140;
  } else if (day_of_life === 5) {
    fluidRatePerKg = isTermOrGt1500g ? 140 : 150;
  } else {
    fluidRatePerKg = 150; // Day 6 & 7 onwards
  }
  
  // Fluid is calculated on birth weight until it is regained, then on current weight.
  const working_weight_for_fluid = Math.max(birth_weight_kg, current_weight_kg);
  let fluidMultiplier = 1.0;
  
  if (is_phototherapy) {
    fluidMultiplier += 0.1; // 10% increase for insensible water loss
  }
  
  if (is_radiant_warmer) {
    fluidMultiplier += 0.2; // 20% increase for insensible water loss
  }
  
  if (is_asphyxia) {
    fluidMultiplier -= 0.2; // 20% reduction
    if (is_radiant_warmer) {
      warnings.push(`CLINICAL CONFLICT: Radiant Warmer and Asphyxia (HIE) selected simultaneously. Actively cooled infants should NOT be on a radiant warmer. Fluid math may be compromised.`);
    }
  }

  let totalFluidMl = fluidRatePerKg * working_weight_for_fluid * fluidMultiplier;
  
  if (is_asphyxia) {
    // CLINICAL FIX: Fluids should generally not drop below 50 ml/kg/day to maintain renal perfusion
    const minimumFluidLimit = 50 * working_weight_for_fluid;
    if (totalFluidMl < minimumFluidLimit) {
      totalFluidMl = minimumFluidLimit;
      warnings.push(`NOTICE: Asphyxia 20% reduction would drop fluids below 50 ml/kg/day. Hard-capped at 50 ml/kg/day for renal safety.`);
    }
    
    // Check for hypoglycemia risk on low volume
    if (totalFluidMl / working_weight_for_fluid <= 60 && day_of_life <= 3) {
      warnings.push(`WARNING: Total fluid volume is very low (${(totalFluidMl / working_weight_for_fluid).toFixed(0)} ml/kg/day). Monitor Glucose Infusion Rate (GIR) closely to prevent hypoglycemia. Standard 10% Dextrose may not provide adequate glucose.`);
    }
  }
  
  output.fluid_volume_ml_per_day = Math.round(totalFluidMl * 10) / 10;
  output.fluid_type = fluidType;
  
  warnings.push(`NOTICE: The calculated ${output.fluid_volume_ml_per_day} ml/day is the Total Fluid Requirement (TFR). If the infant is receiving enteral feeds, you MUST subtract the enteral feed volume from this total to determine the correct IV fluid rate.`);
  
  // 2. Drug Calculation (Based on Current Weight)
  if (drug_name) {
    const drug = drug_name.toLowerCase();
    let totalDose = 0;
    let unit = "mg";
    let interval = "";
    let prep = "";
    let baseConc = "";
    let volDraw = "";
    
    switch(drug) {
      // Additional Protocol Drugs
      case 'normal_saline_bolus':
        totalDose = 10 * current_weight_kg;
        unit = "ml";
        interval = "Stat";
        prep = "Administer IV over 10-20 minutes for hypovolemia. May repeat if clinically indicated (up to 2-3 times max before considering inotropes).";
        break;
      case 'glucose_10_bolus':
        totalDose = 2 * current_weight_kg;
        unit = "ml";
        interval = "Stat";
        prep = "Administer IV slowly over 1-2 minutes for symptomatic hypoglycemia. Recheck blood glucose in 30 minutes.";
        warnings.push("WARNING: Rapid infusion can cause hyperglycemia and rebound hypoglycemia.");
        break;
      case 'salbutamol_neb':
        totalDose = 1.25;
        unit = "mg";
        interval = "4-6hrly";
        prep = "Dilute in 2-3 ml of normal saline and nebulize. (Standard neonatal dose is often 1.25mg / 0.25ml of respiratory solution).";
        warnings.push("WARNING: Monitor heart rate for severe tachycardia.");
        break;
      case 'kayexelate_enema':
        totalDose = 1 * current_weight_kg;
        unit = "g";
        interval = "6hrly PRN";
        prep = "Mix with sterile water or 10% dextrose (do not mix with sorbitol). Retain for 30-60 mins if possible.";
        warnings.push("WARNING: High risk of intestinal necrosis in premature infants. Use with extreme caution.");
        break;
      case 'cotrimoxazole':
        totalDose = 5 * current_weight_kg;
        unit = "mg (TMP)";
        interval = "12hrly";
        prep = "Dose based on Trimethoprim (TMP) component. (e.g., TMP 5 mg/kg/dose). Avoid in neonates < 4 weeks due to risk of kernicterus unless explicitly indicated.";
        warnings.push("WARNING: Generally contraindicated in neonates < 4 weeks old (risk of bilirubin displacement).");
        break;
      case 'hbig':
        totalDose = 0.5;
        unit = "ml";
        interval = "Stat (within 12hrs of birth)";
        prep = "Administer IM. Given to infants of HBsAg positive mothers.";
        break;
      case 'hep_b_vaccine':
        totalDose = 0.5;
        unit = "ml";
        interval = "Stat (within 12hrs of birth)";
        prep = "Administer IM in anterolateral thigh. Do not mix in same syringe with HBIG.";
        break;
      case 'vzig':
        totalDose = 125;
        unit = "IU";
        interval = "Stat";
        prep = "Administer IM. For post-exposure prophylaxis.";
        break;
        
      // Antibiotics & Antivirals
      case 'ampicillin':
        totalDose = 50 * current_weight_kg;
        if (gestational_age_weeks <= 29) {
          interval = day_of_life <= 28 ? "12hrly" : "8hrly";
        } else if (gestational_age_weeks <= 36) {
          interval = day_of_life <= 14 ? "12hrly" : "8hrly";
        } else {
          interval = day_of_life <= 7 ? "12hrly" : "8hrly";
        }
        prep = "Administer IV. For meningitis, dose may be higher (100mg/kg/dose).";
        baseConc = "250 mg / 2.5 ml";
        volDraw = (totalDose / 100).toFixed(2) + " ml";
        break;
      case 'gentamicin':
        if (gestational_age_weeks <= 29) {
          totalDose = 5 * current_weight_kg;
          interval = "48hrly";
        } else if (gestational_age_weeks <= 34) {
          totalDose = 4.5 * current_weight_kg;
          interval = "36hrly";
        } else {
          totalDose = 4 * current_weight_kg;
          interval = "24hrly";
        }
        prep = "Extended interval dosing. Dilute with NS. Infuse over 30 minutes. Check trough level before 2nd or 3rd dose.";
        baseConc = "40 mg / ml"; 
        volDraw = (totalDose / 40).toFixed(2) + " ml";
        break;
      case 'cefotaxime':
      case 'ceftazidime':
        totalDose = 50 * current_weight_kg;
        if (gestational_age_weeks <= 29) {
          interval = "12hrly";
        } else if (gestational_age_weeks <= 36) {
          interval = day_of_life <= 14 ? "12hrly" : "8hrly";
        } else {
          interval = day_of_life <= 7 ? "12hrly" : "8hrly";
        }
        prep = "Administer IV. For meningitis: 100mg/kg/dose.";
        baseConc = "250 mg / 2.5 ml";
        volDraw = (totalDose / 100).toFixed(2) + " ml";
        break;
      case 'amikacin':
        totalDose = 15 * current_weight_kg;
        if (gestational_age_weeks <= 29) {
          interval = "48hrly";
        } else if (gestational_age_weeks <= 34) {
          interval = "36hrly";
        } else {
          interval = "24hrly";
        }
        prep = "Administer IV. Check trough level before 2nd or 3rd dose.";
        baseConc = "50 mg / ml"; 
        volDraw = (totalDose / 50).toFixed(2) + " ml";
        break;
      case 'meropenem':
        totalDose = 20 * current_weight_kg;
        if (gestational_age_weeks < 32) {
          interval = day_of_life <= 14 ? "12hrly" : "8hrly";
        } else {
          interval = "8hrly";
        }
        prep = "Infuse over 30 minutes. In meningitis: 40mg/kg/dose.";
        baseConc = "50 mg / ml"; 
        volDraw = (totalDose / 50).toFixed(2) + " ml";
        break;
      case 'imipenem':
        totalDose = 20 * current_weight_kg;
        if (gestational_age_weeks < 32) {
          interval = "12hrly";
        } else {
          interval = day_of_life <= 14 ? "12hrly" : "8hrly";
        }
        prep = "Infuse over 30 minutes. Should not select for baby presented with seizure.";
        baseConc = "5 mg / ml"; 
        volDraw = (totalDose / 5).toFixed(2) + " ml";
        break;
      case 'vancomycin':
        totalDose = 15 * current_weight_kg; 
        if (gestational_age_weeks <= 29) {
          interval = day_of_life <= 14 ? "24hrly" : "12hrly";
          warnings.push("CRITICAL: Prematurity (GA <= 29 weeks) requires extended intervals for Vancomycin.");
        } else if (gestational_age_weeks <= 36) {
          interval = day_of_life <= 14 ? "12hrly" : "8hrly";
        } else {
          interval = day_of_life <= 7 ? "12hrly" : "8hrly";
        }
        prep = "Always infuse over 1 hr. Check trough level before 4th dose.";
        baseConc = "50 mg / ml"; 
        volDraw = (totalDose / 50).toFixed(2) + " ml";
        break;
      case 'netilmicin':
        if (gestational_age_weeks <= 29) {
          totalDose = 5 * current_weight_kg;
          interval = "48hrly";
        } else if (gestational_age_weeks <= 34) {
          totalDose = 4.5 * current_weight_kg;
          interval = "36hrly";
        } else {
          totalDose = 4 * current_weight_kg;
          interval = "24hrly";
        }
        prep = "Extended interval dosing. Check trough level before 2nd or 3rd dose.";
        baseConc = "10 mg / ml"; // Standard neonatal dilution is often 10 mg/ml for accuracy
        volDraw = (totalDose / 10).toFixed(2) + " ml";
        break;
      case 'ciprofloxacin':
        totalDose = 10 * current_weight_kg; // Corrected to 10-15 mg/kg/dose
        interval = "12hrly";
        prep = "Infuse over 60 minutes. Not a first-line agent (cartilage toxicity risk).";
        warnings.push("WARNING: Ciprofloxacin is generally reserved for multi-drug resistant organisms due to potential joint/cartilage toxicity.");
        baseConc = "2 mg / ml"; 
        volDraw = (totalDose / 2).toFixed(2) + " ml";
        break;
      case 'clarithromycin':
        totalDose = 7.5 * current_weight_kg;
        interval = "12hrly";
        prep = "Always infuse over 1 hr. Monitor for QT prolongation.";
        baseConc = "50 mg / ml"; 
        volDraw = (totalDose / 50).toFixed(2) + " ml";
        break;
      case 'colistin':
        totalDose = 25000 * current_weight_kg;
        unit = "units";
        if (gestational_age_weeks < 32) {
          interval = "12hrly";
        } else {
          interval = "8hrly";
        }
        prep = "Dosed as Colistimethate Sodium (CMS). Infuse over 30 minutes. Monitor renal function carefully.";
        warnings.push("WARNING: High risk of nephrotoxicity. Adjust dose carefully in renal impairment.");
        baseConc = "100,000 units / ml"; 
        volDraw = (totalDose / 100000).toFixed(2) + " ml";
        break;
      case 'cefepime':
        totalDose = 30 * current_weight_kg;
        if (gestational_age_weeks < 32) {
          interval = "12hrly";
        } else {
          interval = day_of_life <= 14 ? "12hrly" : "8hrly";
        }
        prep = "Infuse over 30 minutes. Note: For Pseudomonas or Meningitis, use 50 mg/kg/dose.";
        baseConc = "50 mg / ml"; 
        volDraw = (totalDose / 50).toFixed(2) + " ml";
        break;
      case 'piperacillin':
        totalDose = 100 * current_weight_kg;
        if (gestational_age_weeks <= 29) {
          interval = "12hrly";
        } else if (gestational_age_weeks <= 36) {
          interval = day_of_life <= 14 ? "12hrly" : "8hrly";
        } else {
          interval = day_of_life <= 7 ? "12hrly" : "8hrly";
        }
        prep = "Dose based on Piperacillin component. Infuse over 30 minutes.";
        baseConc = "225 mg / ml"; // Standard dilution concentration
        volDraw = (totalDose / 225).toFixed(2) + " ml";
        break;
      case 'linezolid':
        totalDose = 10 * current_weight_kg;
        if (gestational_age_weeks < 34 && day_of_life <= 7) {
          interval = "12hrly";
        } else {
          interval = "8hrly";
        }
        prep = "Infuse over 30 minutes. Monitor for thrombocytopenia if used >10 days.";
        baseConc = "2 mg / ml"; 
        volDraw = (totalDose / 2).toFixed(2) + " ml";
        break;
      case 'metronidazole':
        totalDose = 7.5 * current_weight_kg;
        if (gestational_age_weeks <= 29) {
          interval = "48hrly";
        } else if (gestational_age_weeks <= 34) {
          interval = day_of_life <= 7 ? "48hrly" : "24hrly";
        } else {
          interval = day_of_life <= 7 ? "24hrly" : "12hrly";
        }
        prep = "Administer IV over 30 minutes. (Consider a 15mg/kg loading dose for severe infections).";
        baseConc = "5 mg / ml"; 
        volDraw = (totalDose / 5).toFixed(2) + " ml";
        break;
      case 'acyclovir':
        totalDose = 20 * current_weight_kg;
        if (gestational_age_weeks <= 29) {
          interval = "24hrly";
        } else if (gestational_age_weeks <= 36) {
          interval = day_of_life <= 14 ? "24hrly" : "12hrly";
        } else {
          interval = day_of_life <= 7 ? "12hrly" : "8hrly";
        }
        prep = "Always infuse over 1 hr. CRITICAL: High risk of crystal nephropathy. Ensure hyperhydration (1.5x maintenance) and monitor urine output.";
        warnings.push("WARNING: Acyclovir requires adequate hydration. Verify fluid calculations to prevent crystal nephropathy.");
        baseConc = "50 mg / ml"; 
        volDraw = (totalDose / 50).toFixed(2) + " ml";
        break;
      case 'fluconazole':
        totalDose = 6 * current_weight_kg;
        if (gestational_age_weeks <= 29) {
          interval = day_of_life <= 14 ? "72hrly" : "48hrly";
        } else if (gestational_age_weeks <= 36) {
          interval = day_of_life <= 14 ? "48hrly" : "24hrly";
        } else {
          interval = day_of_life <= 7 ? "48hrly" : "24hrly";
        }
        prep = "Loading dose typically 12mg/kg, then maintenance 6mg/kg. Infuse over 30-60 min.";
        baseConc = "2 mg / ml"; 
        volDraw = (totalDose / 2).toFixed(2) + " ml";
        break;
      case 'flucloxacillin':
        totalDose = 50 * current_weight_kg;
        if (gestational_age_weeks <= 29) {
          interval = "12hrly";
        } else if (gestational_age_weeks <= 36) {
          interval = day_of_life <= 14 ? "12hrly" : "8hrly";
        } else {
          interval = day_of_life <= 7 ? "12hrly" : "8hrly";
        }
        prep = "Administer IV slowly. In Osteomyelitis/Meningitis: 100mg/kg/dose (max 200mg/kg/day).";
        baseConc = "100 mg / ml"; 
        volDraw = (totalDose / 100).toFixed(2) + " ml";
        break;
      // Cardiovascular & Diuretics
      case 'frusemide':
        totalDose = 1 * current_weight_kg;
        if (gestational_age_weeks < 32) {
          interval = "24hrly";
        } else {
          interval = "12-24hrly";
        }
        prep = "Administer IV slowly over 1-2 minutes. Max 2 mg/kg/dose. Monitor electrolytes (Na+, K+).";
        warnings.push("WARNING: Rapid IV push of Frusemide increases the risk of ototoxicity, especially when combined with Aminoglycosides (Gentamicin/Amikacin).");
        baseConc = "10 mg / ml"; 
        volDraw = (totalDose / 10).toFixed(2) + " ml";
        break;
      case 'frusemide_spiro':
        totalDose = 1 * current_weight_kg; // Based on Frusemide component
        interval = "12-24hrly";
        prep = "Frusemide 1mg/kg + Spironolactone 1-2mg/kg/day. Administer orally. Check fixed ratio formulation carefully.";
        warnings.push("WARNING: Furosemide depletes Potassium, while Spironolactone spares Potassium. Monitor serum potassium closely.");
        break;
      case 'captopril':
        totalDose = 0.05 * current_weight_kg;
        interval = "8-12hrly";
        prep = "Range: 0.01-0.05 mg/kg/dose. Monitor BP closely.";
        warnings.push("WARNING: Captopril can cause profound hypotension in neonates. Start at the lower end of the range (0.01 mg/kg) if uncertain, and titrate up.");
        break;
      case 'adenosine':
        totalDose = 0.1 * current_weight_kg;
        interval = "Stat (SVT)";
        prep = "First dose 0.1 mg/kg rapid IV push. Follow with rapid flush. Max 0.3 mg/kg/dose.";
        warnings.push("CRITICAL: Adenosine MUST be given as a rapid IV push followed immediately by a rapid saline flush. Monitor ECG continuously.");
        baseConc = "3 mg / ml";
        volDraw = (totalDose / 3).toFixed(2) + " ml";
        break;
      case 'ibuprofen':
        if (input.dose_number === 2 || input.dose_number === 3) {
          totalDose = 5 * current_weight_kg;
          prep = `Dose ${input.dose_number} of 3: 5 mg/kg. Contraindicated if Plt <60k, active bleed, or severe renal impairment.`;
        } else {
          totalDose = 10 * current_weight_kg;
          prep = "1st dose: 10 mg/kg. 2nd and 3rd doses: 5 mg/kg. Contraindicated if Plt <60k, active bleed, or severe renal impairment.";
        }
        interval = "Every 24hrs for 3 doses";
        warnings.push("WARNING: Ibuprofen for PDA is a 3-day course. Do NOT repeat the 10 mg/kg dose; doses 2 and 3 must be exactly 5 mg/kg/dose.");
        baseConc = "100 mg / 5 ml";
        volDraw = (totalDose / 20).toFixed(2) + " ml";
        break;
      case 'sildenafil':
        totalDose = 0.5 * current_weight_kg;
        interval = "6-12hrly";
        prep = "Range 0.5-2 mg/kg/dose. Monitor for systemic hypotension.";
        warnings.push("WARNING: Sildenafil can cause systemic hypotension. Continuous BP monitoring is recommended when initiating therapy.");
        break;
      case 'digoxin_iv_maint':
        totalDose = (birth_weight_kg < 2.5 ? 2.5 : 3) * current_weight_kg;
        unit = "mcg";
        interval = "12hrly";
        prep = "Preterm: 4-6 mcg/kg/day. Term: 5-8 mcg/kg/day. (Calculated dose is 1/2 of daily, given 12hrly)";
        warnings.push("CRITICAL: Digoxin has a very narrow therapeutic index. Monitor ECG for bradycardia/arrhythmias and ensure serum potassium is strictly maintained.");
        baseConc = "0.25 mg / 2 ml (125 mcg/ml)";
        volDraw = (totalDose / 125).toFixed(2) + " ml";
        break;
      case 'dopamine_cardiac':
        totalDose = 5 * current_weight_kg; 
        unit = "mcg/min";
        interval = "Continuous";
        prep = `Cardiac Dose: 5-20 µg/kg/min. SYRINGE PUMP: Add ${(15 * current_weight_kg).toFixed(1)} mg to 50ml NS/D5W. 1 ml/hr = 5 mcg/kg/min.`;
        warnings.push("CRITICAL: High risk of severe tissue necrosis with extravasation. Central venous access is strongly preferred.");
        baseConc = "40 mg / ml"; 
        break;
      case 'dobutamine':
        totalDose = 5 * current_weight_kg;
        unit = "mcg/min";
        interval = "Continuous";
        prep = `Dose: 5-20 µg/kg/min. SYRINGE PUMP: Add ${(15 * current_weight_kg).toFixed(1)} mg to 50ml NS/D5W. 1 ml/hr = 5 mcg/kg/min.`;
        warnings.push("WARNING: Monitor for tachycardia and arrhythmias. Central venous access is preferred.");
        baseConc = "50 mg / ml"; 
        break;
      case 'adrenaline':
        totalDose = 0.1 * current_weight_kg;
        unit = "ml";
        interval = "PRN for severe bradycardia";
        prep = `BOLUS: 1:10,000 dilution (1ml adrenaline + 9ml distilled water). Dose is 0.1-0.3 ml/kg. INFUSION PUMP: Add ${(0.3 * current_weight_kg).toFixed(2)} mg to 50ml. 1 ml/hr = 0.1 mcg/kg/min.`;
        warnings.push("CRITICAL: Adrenaline extravasation causes severe tissue ischemia. For bolus, use 1:10,000 dilution followed immediately by a rapid normal saline flush.");
        break;
      // Neurology & Seizures
      case 'phenobarbitone_load':
        totalDose = 20 * current_weight_kg;
        interval = "Stat";
        prep = "Administer over 20-30 mins. Dilute to max 10 mg/ml before administration to prevent vein irritation.";
        warnings.push("CRITICAL: Rapid infusion or concurrent use with other sedatives (e.g., Midazolam) strongly increases the risk of respiratory depression and apnea. Monitor airway.");
        baseConc = "200 mg / ml";
        volDraw = (totalDose / 200).toFixed(2) + " ml";
        break;
      case 'phenobarbitone_maint':
        totalDose = 2.5 * current_weight_kg;
        interval = "12hrly";
        prep = "Maintenance dose (5 mg/kg/day). Usually started 12-24 hours after the loading dose.";
        warnings.push("NOTICE: Ensure at least 12-24 hours have elapsed since the loading dose before initiating maintenance therapy.");
        baseConc = "200 mg / ml";
        volDraw = (totalDose / 200).toFixed(2) + " ml";
        break;
      case 'fosphenytoin_load':
        totalDose = 20 * current_weight_kg; // Corrected to 20 mg PE/kg
        interval = "Stat";
        prep = "Administer over 30 mins. Max rate 3 mg PE/kg/min. Do NOT exceed this rate.";
        warnings.push("CRITICAL: Continuous ECG and blood pressure monitoring is mandatory during infusion due to risk of arrhythmias and profound hypotension.");
        warnings.push("NOTICE: Unlike Phenytoin (which crystallizes in Dextrose and MUST be mixed in NS), Fosphenytoin is compatible with both D5W and Normal Saline.");
        baseConc = "50 mg PE / ml"; // Corrected base concentration for Fosphenytoin
        volDraw = (totalDose / 50).toFixed(2) + " ml";
        break;
      case 'fosphenytoin_maint':
        totalDose = 4 * current_weight_kg;
        interval = "12hrly";
        prep = "Administer slowly. Max rate 3 mg PE/kg/min.";
        warnings.push("NOTICE: Initiate maintenance dose 12-24 hours after the loading dose.");
        warnings.push("NOTICE: Unlike Phenytoin (which crystallizes in Dextrose and MUST be mixed in NS), Fosphenytoin is compatible with both D5W and Normal Saline.");
        baseConc = "50 mg PE / ml"; 
        volDraw = (totalDose / 50).toFixed(2) + " ml";
        break;
      case 'paracetamol_iv':
        totalDose = 10 * current_weight_kg;
        if (gestational_age_weeks < 32) {
          interval = "12hrly";
        } else {
          interval = "8hrly (Term: 6hrly)";
        }
        prep = "Infuse over 15 minutes. High risk of hepatotoxicity if overdosed.";
        baseConc = "10 mg / ml"; 
        volDraw = (totalDose / 10).toFixed(2) + " ml";
        break;
      case 'prostaglandin':
        totalDose = 0.05; // Starting dose mcg/kg/min
        unit = "mcg/kg/min";
        interval = "Continuous";
        prep = `SYRINGE PUMP: Add ${(15 * current_weight_kg).toFixed(1)} mcg to 50ml. 1 ml/hr = 0.005 mcg/kg/min. Titrate between 0.01 and 0.1 mcg/kg/min. WARNING: Apnea is a very common side effect. Prepare for intubation.`;
        warnings.push("CRITICAL: Prostaglandin E1 (PGE1) frequently causes apnea. Have intubation equipment ready.");
        break;
      case 'surfactant_curosurf':
        totalDose = 200 * current_weight_kg; // 2.5 ml/kg for 80mg/ml
        unit = "mg";
        interval = "Stat";
        prep = "Intratracheal administration. Dose is 2.5 ml/kg.";
        baseConc = "80 mg / ml";
        volDraw = (2.5 * current_weight_kg).toFixed(2) + " ml";
        break;
      case 'surfactant_survanta':
        totalDose = 100 * current_weight_kg; // 4 ml/kg for 25mg/ml
        unit = "mg";
        interval = "Stat";
        prep = "Intratracheal administration. Dose is 4.0 ml/kg. Divide into aliquots per protocol.";
        baseConc = "25 mg / ml";
        volDraw = (4.0 * current_weight_kg).toFixed(2) + " ml";
        break;
      case 'midazolam':
        totalDose = gestational_age_weeks < 32 ? 0.03 * current_weight_kg : 0.06 * current_weight_kg;
        unit = "mg/hr";
        interval = "Continuous";
        prep = `SYRINGE PUMP: Add ${(3 * current_weight_kg).toFixed(1)} mg to 50ml NS/D5W. 1 ml/hr = 1 mcg/kg/min (0.06 mg/kg/hr). Range 0.01-0.06 mg/kg/hr.`;
        warnings.push("WARNING: Midazolam can cause profound hypotension and myoclonus in preemies. Rapid IV bolus is contraindicated (causes severe cardiovascular collapse).");
        break;
      case 'levetiracetam':
        totalDose = 10 * current_weight_kg;
        interval = "8-12hrly";
        prep = "Maintenance: 10-20 mg/kg/dose. Loading dose (if required): 20-40 mg/kg IV stat.";
        warnings.push("NOTICE: Requires dose adjustment in severe renal impairment. Infuse over 15-30 minutes.");
        break;
      case 'morphine':
        totalDose = 0.05 * current_weight_kg;
        interval = "PRN or Continuous";
        prep = `BOLUS: Range 0.05-0.1 mg/kg. SYRINGE PUMP: Add ${(0.5 * current_weight_kg).toFixed(2)} mg to 50ml NS/D5W. 1 ml/hr = 10 mcg/kg/hr.`;
        warnings.push("CRITICAL: Morphine causes respiratory depression, hypotension, and ileus. Naloxone and intubation equipment must be immediately available.");
        break;
      case 'fentanyl':
        totalDose = 1 * current_weight_kg;
        unit = "mcg";
        interval = "PRN or Continuous";
        prep = `BOLUS: Range 1-3 mcg/kg. SYRINGE PUMP: Add ${(50 * current_weight_kg).toFixed(1)} mcg to 50ml NS/D5W. 1 ml/hr = 1 mcg/kg/hr.`;
        warnings.push("CRITICAL: Rapid IV administration of Fentanyl in neonates can cause severe chest wall rigidity making ventilation impossible. Infuse bolus slowly over 3-5 minutes.");
        break;
      case 'pyridoxine':
        totalDose = 50;
        unit = "mg";
        interval = "Stat";
        prep = "50-100 mg IV single dose for intractable seizures. Monitor with continuous EEG if available.";
        warnings.push("NOTICE: Used as a diagnostic/therapeutic trial for Pyridoxine-dependent seizures. Be prepared to manage respiratory depression.");
        break;
      // Respiratory
      case 'aminophyllin_load':
        totalDose = 5 * current_weight_kg;
        interval = "Stat";
        prep = "Loading dose for Apnea of Prematurity. Infuse slowly over 30 mins.";
        warnings.push("WARNING: Monitor ECG. Aminophylline has a narrow therapeutic index and frequently causes tachycardia, jitteriness, and feed intolerance.");
        baseConc = "25 mg / ml"; 
        volDraw = (totalDose / 25).toFixed(2) + " ml";
        break;
      case 'aminophyllin_maint':
        totalDose = 2.5 * current_weight_kg;
        interval = "12hrly";
        prep = "Maintenance dose. Initiate 12 hours after the loading dose.";
        warnings.push("NOTICE: Caffeine Citrate is generally preferred over Aminophylline for Apnea of Prematurity due to a safer side-effect profile.");
        baseConc = "25 mg / ml"; 
        volDraw = (totalDose / 25).toFixed(2) + " ml";
        break;
      case 'caffeine_load':
        totalDose = 20 * current_weight_kg;
        interval = "Stat";
        prep = "Loading dose for Apnea of Prematurity. Administer slowly over 30 min.";
        warnings.push("NOTICE: 20 mg of Caffeine Citrate equals exactly 10 mg of Caffeine Base. Ensure you are using the Citrate formulation.");
        baseConc = "20 mg / ml (Caffeine Citrate)";
        volDraw = (totalDose / 20).toFixed(2) + " ml";
        break;
      case 'caffeine_maint':
        totalDose = 5 * current_weight_kg;
        interval = "24hrly";
        prep = "Maintenance dose for Apnea of Prematurity (Range 5-8 mg/kg daily). Initiate 24 hours after loading dose.";
        warnings.push("NOTICE: Initiate maintenance dose 24 hours after the loading dose.");
        baseConc = "20 mg / ml (Caffeine Citrate)";
        volDraw = (totalDose / 20).toFixed(2) + " ml";
        break;
      case 'dexamethasone':
        totalDose = 0.25 * current_weight_kg;
        interval = "12hrly";
        prep = "For extubation: 0.25 mg/kg/dose. Start 4hrs prior to extubation. Limit to 3 doses.";
        warnings.push("WARNING: Routine use of Dexamethasone for BPD prevention is not recommended due to severe neurodevelopmental risks. Use only as indicated for airway edema/extubation.");
        baseConc = "4 mg / ml";
        volDraw = (totalDose / 4).toFixed(2) + " ml";
        break;
      // Metabolic & Endocrine
      case 'insulin':
        totalDose = 0.01 * current_weight_kg;
        unit = "units/kg/hr";
        interval = "Continuous";
        prep = `SYRINGE PUMP: Add ${(0.5 * current_weight_kg).toFixed(2)} units of regular insulin to 50ml NS. 1 ml/hr = 0.01 units/kg/hr.`;
        warnings.push("CRITICAL: Insulin infusions require strict and frequent blood glucose monitoring (every 1-2 hrs) to prevent fatal hypoglycemia.");
        warnings.push("NOTICE: Insulin binds to plastic tubing. Prime the IV tubing with the insulin solution (run at least 10-20ml through) to saturate binding sites before connecting to the patient.");
        break;
      case 'hydrocortisone':
        totalDose = 2.5 * current_weight_kg;
        interval = "12hrly for 24 to 48 hrs";
        prep = "For refractory hypoglycemia. (For hypotension, standard is usually 1-2 mg/kg/dose).";
        warnings.push("WARNING: Monitor blood pressure and glucose closely. Taper dose if used for extended periods to prevent adrenal crisis.");
        break;
      case 'diazoxide':
        totalDose = 3 * current_weight_kg;
        interval = "8hrly";
        prep = "Administer PO (8-15 mg/kg/day divided 8hrly) for persistent hyperinsulinemic hypoglycemia.";
        warnings.push("CRITICAL: Diazoxide frequently causes severe fluid retention. Often requires co-administration with a diuretic (e.g., Chlorothiazide) to prevent congestive heart failure.");
        break;
      case 'glucagon':
        totalDose = Math.min(0.2 * current_weight_kg, 1);
        unit = "mg";
        interval = "Stat";
        prep = "Administer IM, Subq, or IV. Maximum dose 1 mg. Monitor for rebound hypoglycemia.";
        warnings.push("WARNING: Glucagon depletes glycogen stores and frequently causes vomiting. Position the infant to prevent aspiration and ensure IV dextrose is running.");
        break;
      case 'octreotide':
        totalDose = 2 * current_weight_kg;
        unit = "mcg/dose";
        interval = "6-8hrly";
        prep = "Administer Subq or IV. Starting dose usually 2-5 mcg/kg/dose. Range up to 10-20 mcg/kg/day.";
        warnings.push("CRITICAL: Octreotide carries a high risk of inducing Necrotizing Enterocolitis (NEC) and splanchnic ischemia in neonates. Monitor abdominal girth and stools strictly.");
        break;
      case 'levothyroxine':
        totalDose = 10 * current_weight_kg;
        unit = "mcg";
        interval = "Once daily";
        prep = "Range 10-15 mcg/kg/day. Crush tablet and mix with a small amount of water or breastmilk.";
        warnings.push("NOTICE: Do NOT co-administer with Calcium, Iron, or soy-based formulas as they severely inhibit Levothyroxine absorption.");
        break;
      case 'calcium_gluconate':
        totalDose = 2 * current_weight_kg;
        unit = "ml";
        interval = "PRN";
        prep = "Symptomatic: Bolus 2 ml/kg (of 10% solution). Dilute 1:1 with 5% Dextrose. Infuse slowly over 10-20 min.";
        warnings.push("CRITICAL: Monitor ECG continuously. Stop infusion immediately if heart rate drops below 100 bpm. Extreme risk of tissue necrosis with extravasation.");
        warnings.push("WARNING: Do NOT mix in the same line as Sodium Bicarbonate or Phosphates (severe precipitation risk).");
        baseConc = "100 mg / ml (10%)";
        break;
      case 'phytomenadion':
        totalDose = birth_weight_kg < 1.5 ? 0.5 : 1.0;
        interval = "Stat at birth";
        prep = "Administer IM. Base conc: 1 mg / 0.5 ml.";
        baseConc = "1 mg / 0.5 ml";
        volDraw = (totalDose / 2).toFixed(2) + " ml"; 
        break;
      // GI & Nutrition
      case 'ranitidine':
        totalDose = 1 * current_weight_kg;
        interval = "12hrly";
        prep = "Administer IV.";
        baseConc = "25 mg / ml"; 
        volDraw = (totalDose / 25).toFixed(2) + " ml";
        break;
      case 'udca':
        totalDose = 7.5 * current_weight_kg;
        interval = "12hrly";
        prep = "Administer orally.";
        baseConc = "50 mg / ml"; 
        volDraw = (totalDose / 50).toFixed(2) + " ml";
        break;
      case 'multivitamin':
        totalDose = 6;
        unit = "drops";
        interval = "Once daily";
        prep = "Administer PO for 6 months.";
        break;
      case 'folic_acid':
        totalDose = 0.25;
        unit = "tab";
        interval = "Alternate day";
        prep = "1/4 tab (1.25mg) every alternate day for 6 months.";
        break;
      case 'iron':
        totalDose = 4 * current_weight_kg;
        interval = "Daily";
        prep = "Total daily requirement in drops = Wt * 2. E.g. For 2kg, give 4 drops. Start when full oral feed achieved.";
        if (day_of_life < 14) {
          warnings.push("WARNING: Oral iron supplementation is rarely indicated before Day 14 of life. Verify standard NICU prophylactic protocols.");
        }
        break;
      case 'domperidone':
        totalDose = 1 * current_weight_kg;
        unit = "drops";
        interval = "8hrly";
        prep = "Administer orally. Drops = Wt * 1.";
        break;
      // Others / Infectious
      case 'naloxone':
        totalDose = 0.1 * current_weight_kg;
        unit = "mg";
        interval = "PRN";
        prep = "Used if MOM received opiate within 4 hrs of delivery.";
        warnings.push("CRITICAL: Naloxone is CONTRAINDICATED in neonates of opioid-dependent mothers (precipitates severe, immediate neonatal seizures).");
        baseConc = "0.4 mg / ml";
        volDraw = (totalDose / 0.4).toFixed(2) + " ml";
        break;
      case 'immunoglobin':
        totalDose = 0.5 * current_weight_kg;
        unit = "g";
        interval = "Stat";
        prep = "Standard IVIG (Rh/ABO disease). Dose is 0.5 - 1 g/kg. Infuse over 2-4 hours.";
        break;
      case 'nystatin':
        totalDose = 1;
        unit = "ml";
        interval = "6hrly";
        prep = "1cc = 15 drops. Administer orally.";
        break;
      case 'nevirapine':
        totalDose = birth_weight_kg < 2.0 ? 2 * current_weight_kg : 4 * current_weight_kg;
        unit = "mg";
        interval = "Daily";
        prep = "Duration: 6 weeks. Used for HIV prophylaxis.";
        break;
      case 'zidovudine':
        totalDose = gestational_age_weeks < 30 ? 2 * current_weight_kg : 4 * current_weight_kg;
        unit = "mg";
        interval = "12hrly";
        prep = "Duration: 4-6 weeks. Used for HIV prophylaxis.";
        break;
      case 'penicillin_aqueous':
        totalDose = 50000 * current_weight_kg;
        unit = "units";
        interval = day_of_life <= 7 ? "12hrly" : "8hrly";
        prep = "Aqueous Crystalline Penicillin G. Total duration 10 days. NOTE: For Meningitis, double the dose (100,000 units/kg/dose).";
        break;
      case 'penicillin_procaine':
        totalDose = 50000 * current_weight_kg;
        unit = "units";
        interval = "24hrly";
        prep = "Procaine Penicillin G IM. Total duration 10 days.";
        break;
      case 'penicillin_benzathine':
        totalDose = 50000 * current_weight_kg;
        unit = "units";
        interval = "Stat";
        prep = "Benzathine Penicillin G. Single IM dose.";
        break;
      case 'isoniazid':
        totalDose = 10 * current_weight_kg;
        interval = "Daily";
        prep = "Anti-TB or IPT prophylaxis (6 months).";
        break;
      case 'rifampicin':
        totalDose = 15 * current_weight_kg;
        interval = "Daily";
        prep = "Anti-TB.";
        break;
      case 'pyrazinamide':
        totalDose = 35 * current_weight_kg;
        interval = "Daily";
        prep = "Anti-TB.";
        break;
      case 'ethambutol':
        totalDose = 20 * current_weight_kg;
        interval = "Daily";
        prep = "Anti-TB.";
        break;
      case 'streptomycin':
        totalDose = 15 * current_weight_kg;
        interval = "Daily";
        prep = "Anti-TB.";
        break;
    }
    
    // Format safely to avoid too many decimal places but preserve significant ones
    const doseString = totalDose % 1 !== 0 ? totalDose.toFixed(3).replace(/\.?0+$/, '') : totalDose.toString();
    
    output.drug_dose = `${doseString} ${unit}`;
    if (interval) output.drug_interval = interval;
    
    // Check for micro-volumes that require double-dilution
    if (volDraw) {
      const parsedVol = parseFloat(volDraw);
      if (parsedVol > 0 && parsedVol < 0.1) {
        warnings.push(`CRITICAL SAFETY: Calculated volume to draw is ${parsedVol} ml. This micro-volume cannot be drawn accurately with standard syringes. You MUST perform a double-dilution or consult the NICU pharmacist.`);
      }
    }
    
    if (prep) output.preparation_steps = prep;
    if (baseConc) output.drug_base_concentration = baseConc;
    if (volDraw && !['drops', 'tab', 'puff'].includes(unit)) {
      output.drug_volume_to_draw = volDraw;
    } else if (unit === 'drops' || unit === 'tab') {
      // Don't show "Volume To Draw" for discrete oral/inhaler meds
    }
  }
  
  return output;
}
