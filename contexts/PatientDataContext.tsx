

import React, { createContext, useState, useContext, ReactNode, useCallback, useEffect } from 'react';
import { PatientData, initialPatientData, SevereAsthmaAssessmentResults } from '../types';

interface PatientDataContextType {
  patientData: PatientData;
  updatePatientData: (updates: Partial<PatientData>) => void;
  resetPatientData: () => void;
}

const PatientDataContext = createContext<PatientDataContextType | undefined>(undefined);

export const PatientDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [patientData, setPatientData] = useState<PatientData>({
    ...initialPatientData,
    actHistory: [],
    acqHistory: [],
    cactHistory: [],
  });

  const updatePatientData = useCallback((updates: Partial<PatientData>) => {
    setPatientData(prevData => ({ ...prevData, ...updates }));
  }, []);

  const resetPatientData = useCallback(() => {
    setPatientData({
        ...initialPatientData,
        actHistory: [],
        acqHistory: [],
        cactHistory: [],
        adult_reviewReminderDate: null,
        child_reviewReminderDate: null,
        youngChild_reviewReminderDate: null,
    });
  }, []);

  useEffect(() => {
    const { symptoms, medications, biomarkers, basicInfo } = patientData.severeAsthma;
    const currentAssessment = patientData.severeAsthmaAssessment;

    const newResults: SevereAsthmaAssessmentResults = { ...currentAssessment };

    newResults.difficultToTreat = symptoms.poorControl || symptoms.frequentExacerbations || (medications.icsLaba && medications.icsDose === 'high');
    
    newResults.severeAsthma = (symptoms.poorControl || symptoms.frequentExacerbations) && 
                              medications.icsLaba && 
                              medications.adherence === 'good' &&
                              medications.inhalerTechnique === 'correct';

    // Updated logic for Type 2 inflammation based on specific criteria, with robust parsing
    newResults.type2Inflammation = (parseInt(biomarkers.bloodEosinophils) || 0) >= 150 || 
                                   (parseInt(biomarkers.feNo) || 0) > 25 ||
                                   (parseInt(biomarkers.sputumEosinophils) || 0) >= 2 ||
                                   symptoms.allergenDriven;

    newResults.eligibleForBiologics = newResults.severeAsthma && 
                                      (newResults.type2Inflammation || medications.maintenanceOcs) &&
                                      (parseInt(basicInfo.exacerbationsLastYear) || 0) >= 1;

    // Deep compare to prevent infinite loops from re-renders
    if (JSON.stringify(newResults) !== JSON.stringify(currentAssessment)) {
      updatePatientData({ severeAsthmaAssessment: newResults });
    }
    
  }, [patientData.severeAsthma, updatePatientData]);


  return (
    <PatientDataContext.Provider value={{ patientData, updatePatientData, resetPatientData }}>
      {children}
    </PatientDataContext.Provider>
  );
};

export const usePatientData = (): PatientDataContextType => {
  const context = useContext(PatientDataContext);
  if (!context) {
    throw new Error('usePatientData must be used within a PatientDataProvider');
  }
  return context;
};