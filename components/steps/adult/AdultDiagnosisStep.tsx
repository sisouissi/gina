import React from 'react';
import { usePatientData } from '../../../contexts/PatientDataContext';
import { useNavigation } from '../../../contexts/NavigationContext';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import { Stethoscope, CheckCircle2, XCircle, ChevronRight, Lightbulb } from 'lucide-react';

const AdultDiagnosisStep: React.FC = () => {
  const { patientData } = usePatientData();
  const { navigateTo } = useNavigation();

  const handleDiagnosisConfirmation = (confirmed: boolean) => {
    if (confirmed) {
      navigateTo('ADULT_SYMPTOM_FREQUENCY_STEP', { diagnosisConfirmed: true });
    } else {
      navigateTo('DIAGNOSIS_PENDING_STEP', { diagnosisConfirmed: false });
    }
  };

  return (
    <Card 
      title={`Diagnostic Assessment - Adults & Adolescents`} 
      icon={<Stethoscope className="text-sky-600" />}
      titleRightElement={<span className="text-sm font-normal text-slate-500">Age: {patientData.age}</span>}
    >
      <div className="mb-6 p-4 bg-sky-50 border border-sky-200 rounded-lg">
        <div className="flex items-start">
          <Lightbulb size={24} className="mr-3 mt-1 text-sky-500 flex-shrink-0" />
          <div>
            <h3 className="text-md font-semibold text-sky-800">Confirming Asthma Diagnosis (GINA)</h3>
            <p className="text-sm text-slate-600 mt-1">
              Diagnosis requires both of the following:
            </p>
            <ul className="list-disc list-inside text-sm text-slate-600 pl-4 mt-2 space-y-1">
              <li>A history of variable respiratory symptoms (e.g., wheeze, shortness of breath, chest tightness, cough).</li>
              <li>Evidence of variable expiratory airflow limitation (e.g., positive bronchodilator reversibility test).</li>
            </ul>
            <p className="text-xs text-slate-500 mt-2">Refer to GINA Boxes 1-1 & 1-2 for complete details.</p>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-medium mb-6 text-center text-slate-700">Is the diagnosis of asthma confirmed based on these criteria?</h3>
      
      <div className="space-y-3">
        <Button
          onClick={() => handleDiagnosisConfirmation(true)}
          variant="success"
          fullWidth
          size="xl"
          leftIcon={<CheckCircle2 />}
          rightIcon={<ChevronRight />}
          aria-label="Yes, diagnosis confirmed. Proceed with asthma management."
        >
          Yes, diagnosis confirmed
        </Button>
        <p className="text-xs text-slate-500 text-center">Proceed with asthma management.</p>
      </div>

      <div className="mt-6 space-y-3">
        <Button
          onClick={() => handleDiagnosisConfirmation(false)}
          variant="warning"
          fullWidth
          size="xl"
          leftIcon={<XCircle />}
          rightIcon={<ChevronRight />}
           aria-label="No or uncertain. Further diagnostic steps needed."
        >
           No / Uncertain
        </Button>
         <p className="text-xs text-slate-500 text-center">Further diagnostic steps or referral needed.</p>
      </div>
    </Card>
  );
};

export default AdultDiagnosisStep;