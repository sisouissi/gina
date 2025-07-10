
import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { PatientData, initialPatientData } from '../types';

interface PatientDataContextType {
  patientData: PatientData;
  updatePatientData: (updates: Partial<PatientData>) => void;
  resetPatientData: () => void;
}

const PatientDataContext = createContext<PatientDataContextType | undefined>(undefined);

export const PatientDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [patientData, setPatientData] = useState<PatientData>(initialPatientData);

  const updatePatientData = useCallback((updates: Partial<PatientData>) => {
    setPatientData(prevData => ({ ...prevData, ...updates }));
  }, []);

  const resetPatientData = useCallback(() => {
    setPatientData(initialPatientData);
  }, []);

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
