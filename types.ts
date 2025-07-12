export type AgeGroup = 'adult' | 'child' | 'youngChild';

// Control Levels
export type ControlLevel = 'wellControlled' | 'partlyControlled' | 'uncontrolled';

// Adult specific types
export type AdultSymptomFrequency =
  | 'lessThanTwiceAMonth'
  | 'twiceAMonthOrMore'
  | 'mostDaysOrWakingWeekly'
  | 'severeDailyOrExacerbation';

export type AdultPathway = 'pathway1' | 'pathway2'; // Pathway 1: ICS-formoterol MART, Pathway 2: SABA + other controller

// Child (6-11) specific types
export type ChildGINASteps = 1 | 2 | 3 | 4;
export type ChildPathway = 'track1' | 'track2'; // Track 1: MART, Track 2: Classic SABA reliever


// Young Child (<=5) specific types
export type YoungChildSymptomPattern =
  | 'infrequentViralWheeze' 
  | 'persistentAsthmaOrFrequentWheeze'; 

export type YoungChildGinaSteps = 1 | 2 | 3 | 4;
// Identifies the chosen treatment strategy within a GINA step, 'preferred' or an alternative's ID.
export type YoungChildTreatmentStrategyKey = string; // e.g., 'DAILY_LTRA', 'INTERMITTENT_ICS_STEP1' etc.

export interface YoungChildDiagnosisCriteria {
  criterion1: boolean; // Recurrent episodes
  criterion2: boolean; // No alternative cause
  criterion3: boolean; // Response to treatment
}

export type ExacerbationSeverity = 'mildModerate' | 'severe';

// --- Severe Asthma Data Structure (New 11-stage flow) ---
export interface SevereAsthmaBasicInfo {
    age: string;
    diagnosis: 'unconfirmed' | 'confirmed';
    asthmaOnset: 'childhood' | 'adult';
    exacerbationsLastYear: string;
    hospitalizationsLastYear: string;
    sabaUse: string;
}

export interface SevereAsthmaSymptoms {
    poorControl: boolean;
    frequentExacerbations: boolean;
    nightWaking: boolean;
    activityLimitation: boolean;
    frequentSabaUse: boolean;
    allergenDriven: boolean;
}

export interface SevereAsthmaMedications {
    icsLaba: boolean;
    icsDose: 'low' | 'medium' | 'high';
    ocs: boolean;
    maintenanceOcs: boolean;
    ocsDose: string;
    adherence: 'good' | 'suboptimal' | 'poor' | 'unknown';
    inhalerTechnique: 'correct' | 'incorrect' | 'unknown';
    mart: boolean;
    lama: boolean;
    ltra: boolean;
    azithromycin: boolean;
    biologicsAvailable: 'yes' | 'no' | null;
}

export interface SevereAsthmaBiomarkers {
    bloodEosinophils: string;
    feNo: string;
    sputumEosinophils: string;
    totalIgE: string;
    specificIgE: boolean;
    skinPrickTest: boolean;
    fev1: string;
    fev1Predicted: string;
}

export interface SevereAsthmaInvestigations {
    chestXray: boolean;
    hrct: boolean;
    allergyTesting: boolean;
    boneDensity: boolean;
    parasiteScreen: boolean;
    cardiacAssessment: boolean;
}

export interface SevereAsthmaPatientData {
    basicInfo: SevereAsthmaBasicInfo;
    symptoms: SevereAsthmaSymptoms;
    medications: SevereAsthmaMedications;
    biomarkers: SevereAsthmaBiomarkers;
    comorbidities: string[];
    riskFactors: string[];
    investigations: SevereAsthmaInvestigations;
}

export interface SevereAsthmaAssessmentResults {
    difficultToTreat: boolean;
    severeAsthma: boolean;
    type2Inflammation: boolean;
    eligibleForBiologics: boolean;
}


export interface PatientData {
  age: string | null; // e.g., "12+ years", "6-11 years", "≤5 years"
  ageGroup: AgeGroup | null;
  diagnosisConfirmed: boolean | null;

  // Adult specific
  adult_symptomFrequency: AdultSymptomFrequency | null;
  adult_controlLevel: ControlLevel | null;
  adult_pathway: AdultPathway | null;
  adult_currentGinaStep: 1 | 2 | 3 | 4 | 5 | null;
  adult_riskFactors: string[] | null;

  // Child (6-11) specific
  child_currentGinaStep: ChildGINASteps | null;
  child_pathway: ChildPathway | null;
  child_controlLevel: ControlLevel | null;

  // Young Child (<=5) specific
  youngChild_symptomPattern: YoungChildSymptomPattern | null;
  youngChild_currentGinaStep: YoungChildGinaSteps | null;
  youngChild_currentTreatmentStrategy: YoungChildTreatmentStrategyKey | null; 
  youngChild_diagnosisCriteria: YoungChildDiagnosisCriteria | null;
  youngChild_controlLevel: ControlLevel | null;
  
  // Common for exacerbations
  exacerbationSeverity: ExacerbationSeverity | null;

  // Severe Asthma
  severeAsthma: SevereAsthmaPatientData;
  severeAsthmaAssessment: SevereAsthmaAssessmentResults;
}

export const initialPatientData: PatientData = {
  age: null,
  ageGroup: null,
  diagnosisConfirmed: null,

  adult_symptomFrequency: null,
  adult_controlLevel: null,
  adult_pathway: null,
  adult_currentGinaStep: null,
  adult_riskFactors: [],

  child_currentGinaStep: null,
  child_pathway: null,
  child_controlLevel: null,

  youngChild_symptomPattern: null,
  youngChild_currentGinaStep: null,
  youngChild_currentTreatmentStrategy: 'preferred',
  youngChild_diagnosisCriteria: { criterion1: false, criterion2: false, criterion3: false },
  youngChild_controlLevel: null,

  exacerbationSeverity: null,

  severeAsthma: {
    basicInfo: { age: '', diagnosis: 'unconfirmed', asthmaOnset: 'adult', exacerbationsLastYear: '', hospitalizationsLastYear: '', sabaUse: '' },
    symptoms: { poorControl: false, frequentExacerbations: false, nightWaking: false, activityLimitation: false, frequentSabaUse: false, allergenDriven: false },
    medications: { icsLaba: true, icsDose: 'high', ocs: false, maintenanceOcs: false, ocsDose: '', adherence: 'good', inhalerTechnique: 'correct', mart: false, lama: false, ltra: false, azithromycin: false, biologicsAvailable: null },
    biomarkers: { bloodEosinophils: '', feNo: '', sputumEosinophils: '', totalIgE: '', specificIgE: false, skinPrickTest: false, fev1: '', fev1Predicted: '' },
    comorbidities: [],
    riskFactors: [],
    investigations: { chestXray: false, hrct: false, allergyTesting: false, boneDensity: false, parasiteScreen: false, cardiacAssessment: false }
  },
  severeAsthmaAssessment: {
    difficultToTreat: false,
    severeAsthma: false,
    type2Inflammation: false,
    eligibleForBiologics: false
  }
};

export type StepId =
  | 'INITIAL_STEP'
  // Common
  | 'DIAGNOSIS_PENDING_STEP'
  | 'ABBREVIATIONS_STEP' 
  | 'INITIAL_DIAGNOSIS_FLOWCHART_STEP'
  | 'STEP_DOWN_ASSESS_STEP'
  | 'STEP_DOWN_ADJUST_STEP'
  | 'STEP_DOWN_REVIEW_STEP'
  // Adult
  | 'ADULT_DIAGNOSIS_STEP'
  | 'ADULT_SYMPTOM_FREQUENCY_STEP'
  | 'ADULT_RISK_ASSESSMENT_STEP'
  | 'ADULT_PATHWAY_SELECTION_STEP'
  | 'ADULT_TREATMENT_PLAN_STEP'
  | 'ADULT_CONTROL_ASSESSMENT_STEP'
  | 'ADULT_EXACERBATION_INTRO_STEP'
  | 'ADULT_EXACERBATION_SEVERITY_STEP'
  | 'ADULT_EXACERBATION_PLAN_STEP'
  // Child (6-11)
  | 'CHILD_DIAGNOSIS_STEP'
  | 'CHILD_INITIAL_ASSESSMENT_STEP'
  | 'CHILD_PATHWAY_SELECTION_STEP'
  | 'CHILD_TREATMENT_PLAN_STEP'
  | 'CHILD_CONTROL_ASSESSMENT_STEP'
  | 'CHILD_EXACERBATION_INTRO_STEP'
  | 'CHILD_EXACERBATION_SEVERITY_STEP'
  | 'CHILD_EXACERBATION_PLAN_STEP'
  // Young Child (<=5)
  | 'YOUNG_CHILD_DIAGNOSIS_STEP'
  | 'YOUNG_CHILD_SUSPECTED_ASTHMA_STEP'
  | 'YOUNG_CHILD_SYMPTOM_PATTERN_STEP'
  | 'YOUNG_CHILD_TREATMENT_PLAN_STEP'
  | 'YOUNG_CHILD_CONTROL_ASSESSMENT_STEP'
  | 'YOUNG_CHILD_EXACERBATION_INTRO_STEP'
  | 'YOUNG_CHILD_EXACERBATION_SEVERITY_STEP'
  | 'YOUNG_CHILD_EXACERBATION_PLAN_STEP'
  // Severe Asthma (11-Stage Flow)
  | 'SEVERE_ASTHMA_STAGE_1'
  | 'SEVERE_ASTHMA_STAGE_2'
  | 'SEVERE_ASTHMA_STAGE_3'
  | 'SEVERE_ASTHMA_STAGE_4'
  | 'SEVERE_ASTHMA_STAGE_5'
  | 'SEVERE_ASTHMA_STAGE_6'
  | 'SEVERE_ASTHMA_STAGE_7'
  | 'SEVERE_ASTHMA_STAGE_8'
  | 'SEVERE_ASTHMA_STAGE_9'
  | 'SEVERE_ASTHMA_STAGE_10'
  | 'SEVERE_ASTHMA_STAGE_11';


// Treatment data structures
export interface TreatmentDetail {
  name?: string; 
  reliever?: string;
  controller?: string;
  additional?: string | string[];
  notes?: string | string[];
  keyPoints?: string[];
  referral?: string;
}

export interface AdultTreatmentOptions {
  pathway1: { [key in 1 | 2 | 3 | 4 | 5]?: TreatmentDetail };
  pathway2: { [key in 1 | 2 | 3 | 4 | 5]?: TreatmentDetail };
}

export interface ChildTreatmentOptions {
  track1: { [key in ChildGINASteps]?: TreatmentDetail };
  track2: { [key in ChildGINASteps]?: TreatmentDetail };
}

export interface YoungChildAlternativeTreatment extends TreatmentDetail {
  id: YoungChildTreatmentStrategyKey; // e.g., 'DAILY_LTRA', 'INTERMITTENT_ICS'
  name: string; // User-friendly name for the button/option
}

export interface YoungChildStepTreatment {
  stepDescription?: string; // e.g., "Step 1: As-needed SABA reliever. Intermittent ICS controller option if indicated."
  preferred: TreatmentDetail; // The main/preferred treatment for this GINA step
  alternatives?: YoungChildAlternativeTreatment[];
}

export type YoungChildTreatmentOptions = {
  [key in YoungChildGinaSteps]?: YoungChildStepTreatment;
};

// AI Assistant Types
export interface ChatMessage {
    role: 'user' | 'model';
    parts: { text: string }[];
}