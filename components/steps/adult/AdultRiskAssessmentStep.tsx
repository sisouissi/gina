
import React, { useState } from 'react';
import { useNavigation } from '../../../contexts/NavigationContext';
import { usePatientData } from '../../../contexts/PatientDataContext';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import { AlertTriangle, ChevronRight, CheckSquare, Square } from 'lucide-react';

const riskFactorsList = [
  { id: 'exacerbation_history', label: '≥1 severe exacerbation in the last year' },
  { id: 'saba_overuse', label: 'High SABA use (>3 canisters/year)' },
  { id: 'poor_adherence', label: 'Known poor adherence to controller medication' },
  { id: 'inhaler_technique', label: 'Known incorrect inhaler technique' },
  { id: 'low_fev1', label: 'Low lung function (e.g., FEV1 <60% predicted)' },
  { id: 'comorbidities', label: 'Significant comorbidities (obesity, rhinosinusitis, confirmed food allergy)' },
  { id: 'exposures', label: 'Significant exposure to smoke, allergens, or pollutants' },
  { id: 'psychosocial', label: 'Major psychological or socioeconomic problems' },
];

const AdultRiskAssessmentStep: React.FC = () => {
  const { navigateTo } = useNavigation();
  const { updatePatientData } = usePatientData();
  const [selectedFactors, setSelectedFactors] = useState<string[]>([]);

  const handleToggleFactor = (factorId: string) => {
    setSelectedFactors(prev =>
      prev.includes(factorId) ? prev.filter(id => id !== factorId) : [...prev, factorId]
    );
  };

  const handleContinue = () => {
    updatePatientData({ adult_riskFactors: selectedFactors });
    navigateTo('ADULT_PATHWAY_SELECTION_STEP');
  };

  return (
    <Card title="Assess Risk Factors for Exacerbations" icon={<AlertTriangle className="text-amber-600" />}>
      <p className="mb-6 text-sm text-slate-600 leading-relaxed">
        Independently of symptom control, identify any modifiable risk factors for future exacerbations (based on GINA Box 2-2B). This will help guide pathway selection.
      </p>
      
      <div className="space-y-2">
        {riskFactorsList.map((factor) => {
          const isSelected = selectedFactors.includes(factor.id);
          return (
            <div
              key={factor.id}
              onClick={() => handleToggleFactor(factor.id)}
              role="checkbox"
              aria-checked={isSelected}
              className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 border ${
                isSelected 
                ? 'bg-sky-50 border-sky-400' 
                : 'bg-white border-slate-300 hover:bg-slate-50'
              }`}
            >
              {isSelected ? (
                <CheckSquare size={20} className="text-sky-600 mr-3 flex-shrink-0" />
              ) : (
                <Square size={20} className="text-slate-400 mr-3 flex-shrink-0" />
              )}
              <span className={`flex-grow text-sm ${isSelected ? 'font-semibold text-slate-800' : 'text-slate-700'}`}>
                {factor.label}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-8">
        <Button onClick={handleContinue} fullWidth size="xl" rightIcon={<ChevronRight />}>
          Continue to Pathway Selection
        </Button>
      </div>
    </Card>
  );
};

export default AdultRiskAssessmentStep;