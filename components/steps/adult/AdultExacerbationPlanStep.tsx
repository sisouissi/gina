import React from 'react';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import { useNavigation } from '../../../contexts/NavigationContext';
import { usePatientData } from '../../../contexts/PatientDataContext';
import { exacerbationPlanDetails } from '../../../constants/treatmentData';
import { AlertTriangle, CheckCircle, ChevronRight, FileText, RotateCcw, Activity, ShieldAlert, Monitor, HeartPulse } from 'lucide-react';

const AdultExacerbationPlanStep: React.FC = () => {
  const { navigateTo, resetNavigation } = useNavigation();
  const { patientData } = usePatientData();
  const { exacerbationSeverity } = patientData;

  if (!exacerbationSeverity) {
    return (
      <Card title="Error: Severity Not Assessed" icon={<AlertTriangle className="text-red-500" />} className="border-red-300 bg-red-50">
        <p>Exacerbation severity has not been selected. Please go back.</p>
        <div className="mt-4">
            <Button onClick={() => navigateTo('ADULT_EXACERBATION_SEVERITY_STEP')} variant="secondary">
            Assess Severity
            </Button>
        </div>
      </Card>
    );
  }

  const isMildModerate = exacerbationSeverity === 'mildModerate';
  const plan = isMildModerate
    ? exacerbationPlanDetails.adult.mildModerateAtHome 
    : exacerbationPlanDetails.adult.severeInER;

  const cardIcon = isMildModerate ? <Activity className="text-amber-600" /> : <ShieldAlert className="text-red-600" />;
  const cardBorderClass = isMildModerate ? "border-amber-400" : "border-red-400";
  const cardBgClass = isMildModerate ? "bg-amber-50" : "bg-red-50";
  
  const DetailSection: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className }) => (
    <div className={`mb-4 ${className}`}>
      <h4 className="text-md font-semibold text-slate-700 mb-2">{title}</h4>
      <div className="text-sm text-slate-600 leading-relaxed">{children}</div>
    </div>
  );

  return (
    <Card 
        title={plan.title} 
        icon={cardIcon}
        className={`${cardBgClass} ${cardBorderClass}`}
    >
      {('steps' in plan) && plan.steps && (
        <DetailSection title="Key Management Steps:">
          <ul className="list-decimal list-inside space-y-2 pl-2">
            {plan.steps.map((step, index) => <li key={index}>{step}</li>)}
          </ul>
        </DetailSection>
      )}

      {('keyTreatments' in plan) && plan.keyTreatments && (
         <DetailSection title="Key Emergency Treatments:">
          <ul className="list-disc list-inside space-y-1 pl-2">
            {plan.keyTreatments.map((treatment, index) => <li key={index}>{treatment}</li>)}
          </ul>
        </DetailSection>
      )}
      
      {('whenToSeekUrgentHelp' in plan) && plan.whenToSeekUrgentHelp && (
        <div className={`mt-4 p-3 rounded-md border-l-4 ${isMildModerate ? 'bg-red-100 border-red-500' : 'bg-red-100 border-red-600'}`}>
          <h4 className={`font-semibold mb-1 ${isMildModerate ? 'text-red-700' : 'text-red-800'}`}>When to Seek Urgent Medical Attention:</h4>
          <ul className={`list-disc list-inside space-y-1 pl-4 text-sm ${isMildModerate ? 'text-red-600' : 'text-red-700'}`}>
            {plan.whenToSeekUrgentHelp.map((item, index) => <li key={index}>{item}</li>)}
          </ul>
        </div>
      )}

      {('monitoring' in plan) && plan.monitoring && (
         <DetailSection title="Monitoring:" className="mt-4">
          <ul className="list-disc list-inside space-y-1 pl-2">
            {plan.monitoring.map((item, index) => <li key={index}>{item}</li>)}
          </ul>
        </DetailSection>
      )}

      <div className="mt-8 pt-6 border-t border-slate-200 space-y-3">
        <p className="text-xs text-slate-500 text-center">
            Ensure the patient has an up-to-date written asthma action plan. Review exacerbation triggers and prevention strategies after episode resolution.
        </p>
        <Button 
            onClick={() => navigateTo('ADULT_TREATMENT_PLAN_STEP')}
            variant="primary"
            fullWidth
            size="lg"
            leftIcon={<FileText />}
        >
            Return to Treatment Plan
        </Button>
        <Button 
            onClick={() => resetNavigation()}
            variant="secondary"
            fullWidth
            size="lg"
            leftIcon={<RotateCcw />}
        >
            Start New Assessment
        </Button>
      </div>
    </Card>
  );
};

export default AdultExacerbationPlanStep;