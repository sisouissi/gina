
import React from 'react';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import { useNavigation } from '../../../contexts/NavigationContext';
import { usePatientData } from '../../../contexts/PatientDataContext';
import { HelpCircle, ChevronRight, AlertTriangle } from 'lucide-react';

const YoungChildSuspectedAsthmaStep: React.FC = () => {
  const { navigateTo } = useNavigation();
  const { patientData } = usePatientData();

  const metCriteriaCount = Object.values(patientData.youngChild_diagnosisCriteria || {}).filter(Boolean).length;

  return (
    <Card 
      title="Provisional Diagnosis: Suspected Asthma" 
      icon={<AlertTriangle className="text-amber-600" />}
      className="border-amber-300 bg-amber-50"
    >
      <p className="text-slate-700 leading-relaxed mb-4">
        The child meets <strong>{metCriteriaCount} of the 3 required criteria</strong> for a confirmed diagnosis of asthma.
      </p>
      
      <div className="mb-6 p-4 bg-white border border-slate-200 rounded-md">
        <div className="flex items-start">
            <HelpCircle size={22} className="mr-3 mt-0.5 text-slate-500 flex-shrink-0" />
            <div>
                <h3 className="font-semibold text-slate-800 mb-2">GINA 2025 Guidance for Suspected Asthma</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                "A definitive diagnosis may not always be possible in young children. If one or more of the above criteria has not yet been fulfilled, a provisional diagnosis of 'suspected asthma' should be given and treatment considered, with periodic reassessment to document the response to asthma medication and/or change in symptoms over time."
                </p>
                 <p className="text-xs text-slate-500 mt-2">(GINA 2025, p. 180)</p>
            </div>
        </div>
      </div>
      
      <p className="text-center font-medium text-slate-700 mb-4">
        The next step is to assess the symptom pattern to determine the appropriate initial controller treatment for a diagnostic trial.
      </p>
      
      <div className="text-center">
        <Button 
            onClick={() => navigateTo('YOUNG_CHILD_SYMPTOM_PATTERN_STEP')} 
            variant="warning" 
            size="xl"
            rightIcon={<ChevronRight />}
        >
          Proceed with Treatment Trial
        </Button>
      </div>
    </Card>
  );
};

export default YoungChildSuspectedAsthmaStep;