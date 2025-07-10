export interface Abbreviation {
  abbr: string;
  full: string;
  description?: string; // Optional further clarification
}

export const abbreviationsList: Abbreviation[] = [
  { abbr: 'ACQ', full: 'Asthma Control Questionnaire', description: "Questionnaire to assess asthma control." },
  { abbr: 'ACT', full: 'Asthma Control Test', description: "Test to assess asthma control." },
  { abbr: 'AIR', full: 'Anti-Inflammatory Reliever' },
  { abbr: 'API', full: 'Asthma Predictive Index', description: "Used in young children to predict likelihood of asthma." },
  { abbr: 'COPD', full: 'Chronic Obstructive Pulmonary Disease', description: "Chronic lung disease that obstructs airflow from the lungs." },
  { abbr: 'CRSwNP', full: 'Chronic Rhinosinusitis with Nasal Polyps' },
  { abbr: 'CRSsNP', full: 'Chronic Rhinosinusitis without Nasal Polyps' },
  { abbr: 'DPI', full: 'Dry Powder Inhaler', description: "Inhaler device delivering medication as a dry powder." },
  { abbr: 'ED', full: 'Emergency Department', description: "Hospital department for medical emergencies." },
  { abbr: 'FeNO', full: 'Fractional exhaled Nitric Oxide', description: "A marker of Type 2 airway inflammation." },
  { abbr: 'FEV1', full: 'Forced Expiratory Volume in 1 second', description: "Volume of air exhaled in the first second of a forced expiration, measured by spirometry." },
  { abbr: 'GERD', full: 'Gastroesophageal Reflux Disease', description: "Backflow of stomach contents into the esophagus." },
  { abbr: 'GINA', full: 'Global Initiative for Asthma', description: "Global Initiative for Asthma." },
  { abbr: 'HDM', full: 'House Dust Mite', description: "A common indoor allergen." },
  { abbr: 'ICU', full: 'Intensive Care Unit', description: "Hospital department for critically ill patients requiring intensive monitoring and care." },
  { abbr: 'ICS', full: 'Inhaled Corticosteroid', description: "Core anti-inflammatory medication in asthma treatment." },
  { abbr: 'IgE', full: 'Immunoglobulin E', description: "Type of antibody involved in allergic reactions." },
  { abbr: 'IL', full: 'Interleukin', description: "Type of cytokine (signaling protein) involved in inflammation." },
  { abbr: 'LABA', full: 'Long-Acting Beta2-Agonist', description: "Controller medication for asthma, always used in combination with an ICS." },
  { abbr: 'LAMA', full: 'Long-Acting Muscarinic Antagonist', description: "Another type of long-acting bronchodilator used as an add-on controller." },
  { abbr: 'LTRA', full: 'Leukotriene Receptor Antagonist', description: "Class of oral controller medications (e.g., Montelukast)." },
  { abbr: 'MART', full: 'Maintenance And Reliever Therapy', description: "Treatment strategy where the same ICS-formoterol inhaler is used for maintenance and reliever therapy." },
  { abbr: 'OCS', full: 'Oral Corticosteroids', description: "Powerful anti-inflammatory medications taken orally (e.g., Prednisone), usually for severe exacerbations or very severe asthma." },
  { abbr: 'OSA', full: 'Obstructive Sleep Apnea', description: "Sleep disorder characterized by repeated pauses in breathing." },
  { abbr: 'PEF', full: 'Peak Expiratory Flow', description: "Measurement of maximum airflow during a forced expiration, used for asthma monitoring." },
  { abbr: 'pMDI', full: 'Pressurized Metered-Dose Inhaler', description: "Pressurized inhaler device." },
  { abbr: 'PRN', full: 'Pro Re Nata', description: "Latin phrase meaning 'as needed'." },
  { abbr: 'SABA', full: 'Short-Acting Beta2-Agonist', description: "Reliever medication for quick symptom relief (e.g., Salbutamol/Albuterol)." },
  { abbr: 'SaO2', full: 'Arterial Oxygen Saturation', description: "Percentage of hemoglobin carrying oxygen in arterial blood." },
  { abbr: 'SLIT', full: 'Sublingual Immunotherapy', description: "Desensitization treatment administered under the tongue, e.g., for house dust mites." },
  { abbr: 'TSLP', full: 'Thymic Stromal Lymphopoietin', description: "A cytokine involved in Type 2 inflammation." },
  { abbr: 'URTI', full: 'Upper Respiratory Tract Infection', description: "Infection of the upper airways caused by a virus (e.g., common cold, flu)." },
  { abbr: 'WHO', full: 'World Health Organization', description: "Specialized agency of the UN for public health." },
];