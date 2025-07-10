

import React from 'react';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import { useNavigation } from '../../../contexts/NavigationContext';
import { usePatientData } from '../../../contexts/PatientDataContext';
import { exacerbationPlanDetails } from '../../../constants/treatmentData';
import { AlertTriangle, ChevronRight, FileText, Baby, RotateCcw, ShieldAlert, Info, ClipboardList, HeartPulse, Monitor } from 'lucide-react';
import DetailSection from '../../common/DetailSection';

const YoungChildExacerbationPlanStep: React.FC = () => {
  const { navigateTo, resetNavigation } = useNavigation();
  const { patientData } = usePatientData();
  const { exacerbationSeverity } = patientData;

  if (!exacerbationSeverity) {
    return (
      <Card title="Error: Severity Not Assessed" icon={<AlertTriangle className="text-red-500" />}>
        <p>Episode severity has not been selected. Please go back.</p>
        <Button onClick={() => navigateTo('YOUNG_CHILD_EXACERBATION_SEVERITY_STEP')} className="mt-4">
          Assess Severity
        </Button>
      </Card>
    );
  }

  const isMildModerate = exacerbationSeverity === 'mildModerate';
  const plan = isMildModerate 
    ? exacerbationPlanDetails.youngChild.mildModerateAtHome 
    : exacerbationPlanDetails.youngChild.severeInER;

  const cardIcon = isMildModerate ? <Baby className="text-amber-600" /> : <ShieldAlert className="text-red-600" />;
  const cardBorderClass = isMildModerate ? "border-amber-400" : "border-red-400";
  const cardBgClass = isMildModerate ? "bg-amber-50" : "bg-red-50";
  

  return (
    <Card 
        title={plan.title} 
        icon={cardIcon}
        className={`${cardBgClass} ${cardBorderClass}`}
    >
      {('steps' in plan) && plan.steps && (
        <DetailSection title="Key Management Steps" icon={<ClipboardList className="text-slate-600" />}>
          <ul className="list-decimal list-inside space-y-2">
            {plan.steps.map((step, index) => <li key={index}>{step}</li>)}
          </ul>
        </DetailSection>
      )}

      {('keyTreatments' in plan) && plan.keyTreatments && (
         <DetailSection title="Key Emergency Treatments" icon={<HeartPulse className="text-slate-600"/>}>
          <ul className="list-disc list-inside space-y-1">
            {plan.keyTreatments.map((treatment, index) => <li key={index}>{treatment}</li>)}
          </ul>
        </DetailSection>
      )}
      
      {('whenToSeekUrgentHelp' in plan) && plan.whenToSeekUrgentHelp && (
        <div className={`mt-4 p-4 rounded-md border-l-4 ${isMildModerate ? 'bg-red-100 border-red-500' : 'bg-red-100 border-red-600'}`}>
          <h4 className={`font-semibold mb-2 flex items-center ${isMildModerate ? 'text-red-700' : 'text-red-800'}`}>
            <AlertTriangle size={18} className="mr-2"/>
            When to Seek Urgent Medical Attention
          </h4>
          <ul className={`list-disc list-inside space-y-1 pl-4 text-sm ${isMildModerate ? 'text-red-600' : 'text-red-700'}`}>
            {plan.whenToSeekUrgentHelp.map((item, index) => <li key={index}>{item}</li>)}
          </ul>
        </div>
      )}

      {('monitoring' in plan) && plan.monitoring && (
         <DetailSection title="Monitoring" icon={<Monitor className="text-slate-600"/>} className="mt-4">
          <ul className="list-disc list-inside space-y-1">
            {plan.monitoring.map((item, index) => <li key={index}>{item}</li>)}
          </ul>
        </DetailSection>
      )}

      {('notes' in plan) && plan.notes && (
        <div className="mt-4 p-3 bg-sky-100 border-l-4 border-sky-400 text-sky-800 text-sm rounded-r-md">
            <h4 className="font-semibold mb-1 flex items-center"><Info size={16} className="mr-2"/>Reference</h4>
            <p className="pl-6">{plan.notes}</p>
        </div>
      )}
       <p className="text-xs text-slate-500 mt-4 font-semibold">
            <strong>Crucial:</strong> Always use a pMDI with an appropriate valved holding chamber and facemask for children ≤5 years. Ensure parents are proficient in its use.
        </p>

      <div className="mt-8 pt-6 border-t border-slate-300">
        <div className="p-4 bg-slate-100 rounded-lg border border-slate-200">
            <h3 className="font-semibold text-slate-800 mb-3 flex items-center">
                <ClipboardList size={20} className="mr-2.5 text-slate-600" />
                Post-Episode Follow-up
            </h3>
            <p className="text-sm text-slate-600 mb-3">
                Any wheezing episode requiring urgent care is a significant event. A follow-up review with the child and their carers is essential.
            </p>
            <p className="text-sm font-semibold text-slate-700">The goals of this review are to:</p>
            <ul className="list-disc list-inside space-y-1 text-sm text-slate-600 mt-2 pl-4">
                <li>Review potential triggers and environmental factors.</li>
                <li>Confirm correct inhaler and spacer/facemask technique.</li>
                <li>Review the controller treatment plan and assess the need for initiation or step-up.</li>
                <li>Ensure the parents have and understand a written action plan.</li>
            </ul>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <Button 
            onClick={() => navigateTo('YOUNG_CHILD_TREATMENT_PLAN_STEP')}
            variant="primary"
            className="bg-violet-600 hover:bg-violet-700 focus:ring-violet-500"
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
            Start New Patient Assessment
        </Button>
      </div>
    </Card>
  );
};

export default YoungChildExacerbationPlanStep;