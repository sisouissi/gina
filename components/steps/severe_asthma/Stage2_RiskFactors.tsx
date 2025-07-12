
import React, { useCallback } from 'react';
import { usePatientData } from '../../../contexts/PatientDataContext';
import { useNavigation } from '../../../contexts/NavigationContext';
import AssessmentCard from './AssessmentCard';
import Button from '../../ui/Button';
import { FileText, AlertTriangle, CheckSquare, Square, ChevronRight } from 'lucide-react';
import { comorbidityOptions, riskFactorOptions } from '../../../constants/severeAsthmaData';

const CheckboxGroup: React.FC<{ options: string[]; selected: string[]; onToggle: (item: string) => void; }> = ({ options, selected, onToggle }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
    {options.map((option) => (
       <div key={option} className="flex items-start p-1 cursor-pointer" onClick={() => onToggle(option)}>
        <div className="mt-0.5 mr-3">
          {selected.includes(option) ? <CheckSquare size={20} className="text-sky-600"/> : <Square size={20} className="text-slate-400"/>}
        </div>
        <span className="text-sm">{option}</span>
      </div>
    ))}
  </div>
);

const Stage2_RiskFactors: React.FC = () => {
  const { patientData, updatePatientData } = usePatientData();
  const { navigateTo } = useNavigation();

  const updateSevereAsthmaArray = useCallback((field: 'comorbidities' | 'riskFactors', value: string) => {
    const currentArray = patientData.severeAsthma[field];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    const updates = {
      ...patientData,
      severeAsthma: {
        ...patientData.severeAsthma,
        [field]: newArray
      }
    };
    updatePatientData(updates);
  }, [patientData, updatePatientData]);

  return (
    <div>
      <AssessmentCard title="Comorbidities Assessment" icon={<FileText />}>
        <CheckboxGroup options={comorbidityOptions} selected={patientData.severeAsthma.comorbidities} onToggle={(item) => updateSevereAsthmaArray('comorbidities', item)} />
      </AssessmentCard>

      <AssessmentCard title="Risk Factors and Triggers" icon={<AlertTriangle />}>
         <CheckboxGroup options={riskFactorOptions} selected={patientData.severeAsthma.riskFactors} onToggle={(item) => updateSevereAsthmaArray('riskFactors', item)} />
      </AssessmentCard>

      <div className="mt-6 border-t border-slate-300 pt-6">
         <Button 
          onClick={() => navigateTo('SEVERE_ASTHMA_STAGE_3')}
          fullWidth
          size="lg"
          variant="primary"
          rightIcon={<ChevronRight />}
         >
          Proceed to Management Optimization
        </Button>
      </div>
    </div>
  );
};

export default Stage2_RiskFactors;