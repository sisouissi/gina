import React from 'react';
import { usePatientData } from '../../../contexts/PatientDataContext';
import { useNavigation } from '../../../contexts/NavigationContext';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import { Stethoscope, CheckCircle2, XCircle, ChevronRight, Lightbulb, Activity } from 'lucide-react';

const ChildDiagnosisStep: React.FC = () => {
  const { patientData } = usePatientData();
  const { navigateTo } = useNavigation();

  const handleDiagnosisConfirmation = (confirmed: boolean) => {
    if (confirmed) {
      navigateTo('CHILD_INITIAL_ASSESSMENT_STEP', { diagnosisConfirmed: true });
    } else {
      navigateTo('DIAGNOSIS_PENDING_STEP', { diagnosisConfirmed: false });
    }
  };

  return (
    <Card 
      title={`Diagnostic Assessment - Children`} 
      icon={<Activity className="text-emerald-600" />} 
      titleRightElement={<span className="text-sm font-normal text-slate-500">Age: {patientData.age}</span>}
    >
      <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
        <div className="flex items-start">
          <Lightbulb size={24} className="mr-3 mt-1 text-emerald-500 flex-shrink-0" />
          <div>
            <h3 className="text-md font-semibold text-emerald-800">Confirming Asthma Diagnosis (Children 6-11 years)</h3>
            <p className="text-sm text-slate-600 mt-1">
              Diagnosis in children aged 6-11 years typically involves:
            </p>
            <ul className="list-disc list-inside text-sm text-slate-600 pl-4 mt-2 space-y-1">
              <li>A pattern of episodic respiratory symptoms (wheeze, cough, difficulty breathing, chest tightness), especially if frequent, worse at night or with exercise/triggers.</li>
              <li>Evidence of variable airflow limitation by spirometry (if possible and child cooperates) showing bronchodilator reversibility.</li>
              <li>Exclusion of alternative diagnoses.</li>
            </ul>
            <p className="text-xs text-slate-500 mt-2">Refer to GINA recommendations (e.g., Boxes 1-1 & 1-2) for detailed criteria.</p>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-medium mb-6 text-center text-slate-700">Is the diagnosis of asthma confirmed for this child?</h3>
      
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

export default ChildDiagnosisStep;