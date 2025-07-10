import { AdultTreatmentOptions, ChildTreatmentOptions, YoungChildTreatmentOptions, TreatmentDetail } from '../types';

export const adultTreatments: AdultTreatmentOptions = {
  pathway1: { // Preferred: ICS-formoterol as reliever
    1: { 
      name: "As-needed low-dose ICS-formoterol (AIR therapy)",
      reliever: "Low dose ICS-formoterol (e.g., budesonide/formoterol 200/6 mcg) as needed for symptoms.",
      controller: "The reliever provides the anti-inflammatory treatment. No daily controller is prescribed.",
      keyPoints: ["This is Anti-Inflammatory Reliever (AIR) therapy.", "Significantly reduces the risk of severe exacerbations compared to SABA alone.", "A single inhaler simplifies treatment."],
      notes: ["Maximum recommended total daily dose is 12 inhalations (72 mcg of formoterol).", "Patient education on this new strategy is crucial."]
    },
    2: { 
      name: "As-needed low-dose ICS-formoterol (AIR therapy)",
      reliever: "Low dose ICS-formoterol as needed for symptoms.",
      controller: "The reliever provides the anti-inflammatory treatment. No daily controller is prescribed.",
      keyPoints: ["This strategy is for patients who would otherwise be on daily low-dose ICS.", "Still reduces exacerbation risk compared to SABA-based regimens."],
      notes: ["Maximum recommended total daily dose is 12 inhalations (72 mcg of formoterol)."]
    },
    3: { 
      name: "Low-dose ICS-formoterol MART",
      reliever: "Low dose ICS-formoterol as needed.",
      controller: "Low dose ICS-formoterol as Maintenance And Reliever Therapy (MART).",
      keyPoints: ["Uses a single inhaler for both daily maintenance (e.g., 1 puff BID) and symptom relief.", "Reduces severe exacerbations compared to fixed-dose ICS-LABA + SABA."],
      notes: ["Ensure patient understands MART is for both scheduled and as-needed use. Maximum 12 total inhalations/day."]
    },
    4: { 
      name: "Medium-dose ICS-formoterol MART",
      reliever: "Low dose ICS-formoterol as needed (as part of MART).",
      controller: "Medium dose ICS-formoterol as MART (e.g., 2 inhalations BID).",
      keyPoints: ["For patients uncontrolled on low-dose MART despite good adherence.", "Keeps the benefits of single inhaler MART regimen."],
      additional: ["Consider adding on LAMA (e.g., tiotropium) for further symptom control if needed before stepping up to Step 5."],
      referral: "Refer for specialist assessment to consider Step 5 options if control is not achieved."
    },
    5: { 
      name: "Step 5: Specialist Assessment and Add-on Treatments",
      reliever: "Low dose ICS-formoterol as needed (if MART is continued).",
      controller: "High dose ICS-formoterol MART, plus add-on therapies.",
      additional: [
        "Add LAMA (Long-Acting Muscarinic Antagonist).",
        "Targeted biologic therapies (anti-IgE, anti-IL5/5R, anti-IL4R, anti-TSLP) after phenotyping.",
        "Consider bronchial thermoplasty for selected patients.",
        "As a last resort, add low-dose oral corticosteroids (OCS), with strategies to minimize long-term risks."
      ],
      keyPoints: ["This step requires specialist assessment and management for phenotyping and biologic selection.", "Goal is to improve control and minimize OCS need."],
      referral: "Essential for in-depth assessment, phenotyping, and initiation of Step 5 treatments.",
    }
  },
  pathway2: { // Alternative: SABA reliever + other controller(s)
    1: { 
      name: "ICS taken whenever SABA is taken",
      reliever: "SABA as needed.",
      controller: "Take low dose ICS whenever SABA is taken.",
      keyPoints: ["For patients with infrequent symptoms (< twice a month) AND no exacerbation risk factors.", "Reduces risk of severe exacerbations compared to SABA-only treatment."],
      notes: ["Requires patient to carry and use two separate inhalers, or a combination product if available."]
    },
    2: { 
      name: "Daily low dose ICS + SABA as needed",
      reliever: "SABA as needed.",
      controller: "Daily low dose ICS maintenance.",
      additional: ["Daily LTRA is an alternative, but less effective than ICS for preventing exacerbations."],
      keyPoints: ["The cornerstone of maintenance therapy. Adherence is critical."],
    },
    3: { 
      name: "Daily low dose ICS-LABA + SABA as needed",
      reliever: "SABA as needed.",
      controller: "Daily low dose ICS-LABA combination inhaler.",
      additional: ["Alternatively, increase to medium dose ICS alone (less effective for many patients).", "Low dose ICS + LTRA is another less effective alternative."],
      keyPoints: ["Adding a LABA improves symptoms and lung function, and reduces exacerbations compared to increasing ICS dose alone for most patients."],
    },
    4: { 
      name: "Daily medium dose ICS-LABA + SABA as needed",
      reliever: "SABA as needed.",
      controller: "Daily medium dose ICS-LABA.",
      additional: ["Consider adding on LAMA (e.g., tiotropium in a separate inhaler or as part of a triple therapy inhaler)."],
      referral: "Refer for specialist assessment if control is not achieved or to consider Step 5 options."
    },
    5: { 
      name: "Specialist referral + High dose ICS-LABA +/- options",
      reliever: "SABA as needed.",
      controller: "High dose ICS-LABA.",
      additional: [
        "Add on LAMA.",
        "Add on targeted biologic therapies (anti-IgE, anti-IL5/5R, anti-IL4R, anti-TSLP) after phenotyping.",
        "Add on low-dose OCS as a last resort, managing side-effects."
      ],
      referral: "Essential for phenotypic assessment and initiation of advanced therapies."
    }
  }
};

export const childTreatments: ChildTreatmentOptions = { // For children 6-11 years
  track1: { // Track 1: MART with ICS-formoterol (Budesonide/Formoterol 100/6, 80/4.5 delivered dose)
    3: { 
      name: "Low dose ICS-formoterol MART",
      reliever: "Low dose ICS-formoterol (e.g., Bud/Form 100/6) 1 inhalation as needed.",
      controller: "Low dose ICS-formoterol maintenance (1 inhalation once or twice daily) plus as-needed (MART).",
      keyPoints: ["MART is a preferred option at Step 3.", "Simplifies treatment to a single inhaler."],
      notes: ["Maximum 8 total inhalations per day of Bud/Form 100/6 (GINA 2025, Box 4-8)."]
    },
    4: { 
      name: "Medium dose ICS-formoterol MART",
      reliever: "Low dose ICS-formoterol (e.g., Bud/Form 100/6) 1 inhalation as needed.",
      controller: "Increased maintenance dose: Bud/Form 100/6, 2 inhalations twice daily, plus as-needed (MART). This is a medium dose of ICS.",
      referral: "Referral for expert advice is an alternative to increasing the dose.",
      notes: ["Maximum 8 total inhalations per day. Specialist consultation is strongly advised."]
    }
  },
  track2: { // Track 2: SABA reliever + other controller
    1: { 
      name: "ICS taken whenever SABA is taken",
      reliever: "SABA as needed (pMDI + spacer).",
      controller: "Low dose ICS taken whenever SABA is used.",
      keyPoints: ["This is the preferred controller at Step 1.", "Reduces the risk of severe exacerbations compared to SABA alone."]
    },
    2: { 
      name: "Daily low dose ICS",
      reliever: "SABA as needed (pMDI + spacer).",
      controller: "Daily low dose ICS maintenance.",
      keyPoints: ["This is the preferred controller at Step 2."],
      additional: ["Daily LTRA is an alternative, but is less effective."]
    },
    3: { 
      name: "Medium dose ICS OR Low dose ICS-LABA",
      reliever: "SABA as needed (pMDI + spacer).",
      controller: "Increase to medium dose ICS, OR add a LABA to maintain low dose ICS.",
      keyPoints: ["Choose based on patient assessment and preference. ICS-LABA may provide better symptom control for some."]
    },
    4: { 
      name: "Referral, or Medium dose ICS-LABA",
      reliever: "SABA as needed (pMDI + spacer).",
      controller: "Medium dose ICS-LABA.",
      additional: ["Add-on tiotropium (for ages ≥6 years) can be considered by specialists."],
      referral: "Referral to a pediatric specialist is the preferred option at this step."
    }
  }
};

export const youngChildTreatments: YoungChildTreatmentOptions = {
  1: {
    stepDescription: "Step 1: For infrequent viral wheeze and few/no interval symptoms.",
    preferred: {
      name: "As-needed SABA reliever",
      reliever: "Inhaled SABA via pMDI + valved holding chamber with facemask.",
      keyPoints: ["All children should be provided with a SABA for symptom relief."],
      notes: ["Parental education on recognizing symptoms and correct inhaler technique is critical."]
    },
    alternatives: [
      {
        id: 'INTERMITTENT_ICS_STEP1',
        name: "Intermittent short course ICS",
        controller: "Initiate a short course of low-dose ICS at the onset of a viral respiratory infection.",
        keyPoints: ["For children with viral-induced wheeze only, who are asymptomatic between episodes.", "May reduce severity but requires confident parental recognition and use."]
      }
    ]
  },
  2: {
    stepDescription: "Step 2: For symptom patterns suggesting persistent asthma.",
    preferred: {
      name: "Daily low dose ICS",
      reliever: "Inhaled SABA as needed.",
      controller: "Start daily low dose ICS via pMDI + spacer.",
      keyPoints: ["Indicated if wheezing episodes are frequent (≥3/year) or there are interval symptoms.", "Most effective option for reducing symptoms and exacerbations."],
      notes: ["Reassess response after 2-3 months before considering step-up. Check adherence and inhaler technique."]
    },
    alternatives: [
      {
        id: 'DAILY_LTRA',
        name: "Daily LTRA",
        controller: "Daily Leukotriene Receptor Antagonist (LTRA).",
        keyPoints: ["An alternative, particularly if there are concerns about ICS or co-existing allergic rhinitis.", "Less effective than daily ICS."],
        notes: ["Monitor for potential neuropsychiatric side effects (e.g., sleep disturbances, mood changes)."]
      },
      {
        id: 'INTERMITTENT_ICS_STEP2',
        name: "Intermittent short course ICS",
        keyPoints: ["Can be considered for children with exclusively viral-induced wheeze without interval symptoms, but is less effective than daily ICS if symptoms become persistent."]
      }
    ]
  },
  3: {
    stepDescription: "Step 3: If asthma not controlled on low dose ICS.",
    preferred: {
      name: "Double the 'low' daily ICS dose",
      reliever: "Inhaled SABA as needed.",
      controller: "Increase to a medium dose of ICS (typically double the 'low' dose).",
      keyPoints: ["First, confirm correct inhaler technique, good adherence, and control of environmental triggers."],
      referral: "Referral to a specialist is strongly recommended at this step."
    }
  },
  4: {
    stepDescription: "Step 4: Continue controller and refer for specialist management.",
    preferred: {
      name: "Specialist Management",
      reliever: "Inhaled SABA as needed.",
      controller: "Continue medium dose ICS.",
      additional: ["Specialist may consider adding LTRA to ICS.", "Further step-up is for specialist management only."],
      keyPoints: ["Confirm the diagnosis of asthma.", "Optimize management of comorbidities.", "Ensure environmental factors are addressed."],
      referral: "This step requires ongoing specialist care."
    }
  }
};


export const exacerbationPlanDetails = {
  adult: {
    mildModerateAtHome: {
      title: "Mild to Moderate Exacerbation (Adults)",
      steps: [
        "Reliever: Take 2-4 puffs SABA every 20 mins for 1 hour. If on Pathway 1, use 1-2 puffs ICS-formoterol, repeat after 20 mins.",
        "Assess response. If good, continue reliever as needed. If poor, continue reliever and contact doctor.",
        "Systemic Corticosteroids: Start a short course of oral corticosteroids (OCS) if prescribed for this situation (e.g., Prednisone 40-50mg/day for 5-7 days)."
      ],
      whenToSeekUrgentHelp: [
        "Symptoms worsen rapidly or do not respond to initial reliever therapy.",
        "Difficulty speaking in full sentences or breathlessness at rest.",
        "Drowsiness, confusion, or cyanosis (blue lips/nails).",
        "PEF <60% of personal best or predicted."
      ]
    },
    severeInER: {
      title: "Severe Exacerbation - Emergency Care (Adults)",
      keyTreatments: [
        "Oxygen to maintain SaO2 93-95%.",
        "Repeated inhaled SABA (up to 10 puffs via spacer) + Ipratropium Bromide.",
        "Systemic Corticosteroids: Oral Prednisone (e.g., 1mg/kg, max 50mg) or IV hydrocortisone.",
        "Consider IV magnesium sulfate for severe cases not responding to initial bronchodilators."
      ],
      monitoring: ["FEV1 or PEF, SaO2, clinical signs (respiratory rate, accessory muscle use, ability to speak)."]
    }
  },
  child: { // 6-11 years
     mildModerateAtHome: {
      title: "Mild to Moderate Exacerbation (Child 6-11y)",
      steps: [
        "Reliever: Give 2-4 puffs of SABA (pMDI + spacer) every 20 minutes for up to 1 hour.",
        "Action Plan: Follow the child's written asthma action plan. This may include increasing controller dose.",
        "Oral Corticosteroids: Contact doctor. May need a short course (Prednisone 1-2 mg/kg, max 40mg, for 3-5 days)."
      ],
      whenToSeekUrgentHelp: [
        "Reliever needed more often than every 3-4 hours.",
        "Child is too breathless to talk, eat, or play.",
        "Ribs pulling in with each breath (retractions).",
        "Child is very drowsy, confused or agitated."
      ]
    },
    severeInER: {
      title: "Severe Exacerbation - Emergency Care (Child 6-11y)",
       keyTreatments: [
        "Oxygen to maintain SaO2 >94%.",
        "Inhaled SABA (4-10 puffs via spacer) + Ipratropium Bromide, repeated as needed.",
        "Oral Corticosteroids (Prednisone 1-2 mg/kg, max 40mg).",
        "Consider IV magnesium for severe cases with poor initial response."
      ],
       monitoring: ["Oxygen saturation, respiratory rate, heart rate, use of accessory muscles."]
    }
  },
  youngChild: { // <= 5 years
    mildModerateAtHome: {
      title: "Mild-Moderate Wheezing Episode (Child ≤5y)",
      steps: [
        "Reliever: Give 2 puffs of SABA (pMDI + spacer + facemask) every 20 minutes for up to 3 doses (total 6 puffs in 1 hour).",
        "Assess Response: If symptoms improve, continue SABA 2 puffs every 4-6 hours as needed for 1-2 days.",
        "Contact Doctor: Inform doctor of the episode. OCS are generally not initiated by parents at home."
      ],
       whenToSeekUrgentHelp: [
        "Symptoms worsen or do not improve after 1 hour of initial SABA treatment.",
        "Child is too breathless to feed, talk or cry.",
        "Shows signs of severe respiratory distress (retractions, nasal flaring, grunting).",
        "Child becomes drowsy, confused, or has blue lips."
      ]
    },
    severeInER: {
      title: "Severe Wheezing Episode - Emergency Care (Child ≤5y)",
       keyTreatments: [
        "Oxygen to maintain SaO2 >94%.",
        "Inhaled SABA (4-6 puffs via spacer) repeated every 20 minutes.",
        "Ipratropium bromide with SABA for moderate/severe episodes.",
        "Oral Corticosteroids: Prednisone 1-2 mg/kg (max 20mg for 0-2y; 30mg for 3-5y) for up to 5 days."
      ],
      monitoring: ["Oxygen saturation, respiratory rate, heart rate, work of breathing."]
    }
  }
};