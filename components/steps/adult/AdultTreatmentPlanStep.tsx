

import React from 'react';
import { usePatientData } from '../../../contexts/PatientDataContext';
import { useNavigation } from '../../../contexts/NavigationContext';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import { adultTreatments } from '../../../constants/treatmentData';
import { TreatmentDetail, ControlLevel } from '../../../types';
import { Pill, ChevronRight, PlusCircle, MinusCircle, AlertTriangle, Zap, Wind, ShieldCheck, Route, FileText, Info, CheckCircle2, XCircle, ListChecks, TrendingDown, TrendingUp } from 'lucide-react';
import DetailSection from '../../common/DetailSection';

const AdultTreatmentPlanStep: React.FC = () => {
 const { patientData, updatePatientData } = usePatientData();
 const { navigateTo } = useNavigation();
 const { adult_pathway, adult_currentGinaStep, adult_controlLevel } = patientData;

 if (!adult_pathway || !adult_currentGinaStep) {
  return (
   <Card title="Error: Missing Data" icon={<AlertTriangle className="text-red-500" />} className="border-red-300 bg-red-50">
    <p>Information about the therapeutic pathway or GINA step is missing. Please return to previous steps.</p>
    <div className="mt-4">
      <Button onClick={() => navigateTo('ADULT_PATHWAY_SELECTION_STEP')} variant="secondary">
      Return to Pathway Selection
      </Button>
    </div>
   </Card>
  );
 }

 const pathwayTreatments = adult_pathway === 'pathway1' ? adultTreatments.pathway1 : adultTreatments.pathway2;
 const treatment: TreatmentDetail | undefined = pathwayTreatments[adult_currentGinaStep as keyof typeof pathwayTreatments];

 const currentStepName = `GINA Step ${adult_currentGinaStep}`;
 const pathwayName = adult_pathway === 'pathway1' ? 'Pathway 1 (ICS-formoterol reliever)' : 'Pathway 2 (SABA reliever)';

 const canStepUp = adult_currentGinaSteplower than 5;
 const canStepDown = adult_currentGinaStepgreater than 1;

 const handleStepChange = (newStep: number) => {
  if (newStep greater than or equal to 1 && newStep lower than or equal to 5) {
   updatePatientData({ 
    adult_currentGinaStep: newStep as 1 | 2 | 3 | 4 | 5,
    adult_controlLevel: null // Reset control level when step is changed
   });
  }
 };
 
 const ControlResultDisplay: React.FC<{ level: ControlLevel | null }> = ({ level }) => {
  if (!level) return null;

  const styles = {
    wellControlled: { bg: 'bg-emerald-50', border: 'border-emerald-500', text: 'text-emerald-700', icon: <CheckCircle2 size={24} className="text-emerald-600 mr-3" /> },
    partlyControlled: { bg: 'bg-amber-50', border: 'border-amber-500', text: 'text-amber-700', icon: <AlertTriangle size={24} className="text-amber-600 mr-3" /> },
    uncontrolled: { bg: 'bg-red-50', border: 'border-red-500', text: 'text-red-700', icon: <XCircle size={24} className="text-red-600 mr-3" /> },
  };

  const style = styles[level];
  const levelText = level === 'wellControlled' ? 'Well Controlled' : level === 'partlyControlled' ? 'Partly Controlled' : 'Uncontrolled';
  const advice = {
    wellControlled: "Maintain current step. Consider stepping down after 3 months of stability.",
    partlyControlled: "Consider stepping up treatment. Review adherence, inhaler technique, and modifiable risk factors.",
    uncontrolled: "Step up treatment. Review adherence, technique, and risk factors. Consider a short course of OCS if severe."
  };
  
  return (
    <div className={`my-6 p-4 rounded-lg border-l-4 ${style.bg} ${style.border}`}>
      <div className="flex items-center">
        {style.icon}
        <h3 className={`text-lg font-semibold ${style.text}`}>
        Asthma is {levelText}
        </h3>
      </div>
      <p className={`text-sm ${style.text} mt-2 pl-9`}>{advice[level]}</p>
      <div className="mt-3 pl-9">
        {level === 'wellControlled' && canStepDown && (
          <Button onClick={() => navigateTo('STEP_DOWN_ASSESS_STEP')} variant="secondary" size="sm" leftIcon={<TrendingDown size={16}/>}>
            View Step-Down Guide
          </Button>
        )}
        {(level === 'partlyControlled' || level === 'uncontrolled') && canStepUp && (
          <Button onClick={() => handleStepChange(adult_currentGinaStep + 1)} variant="warning" size="sm" leftIcon={<TrendingUp size={16}/>}>
            Step-Up Treatment
          </Button>
        )}
      </div>
    </div>
  );
 };


 return (
  <Card title="Adult Asthma Treatment Plan" icon={<Pill className="text-sky-600" />}>
   <div className="mb-6 p-4 bg-sky-50 border border-sky-200 rounded-lg">
    <p className="text-md font-semibold text-sky-700">{pathwayName}</p>
    <p className="text-2xl font-bold text-sky-800">{currentStepName}</p>
    <p className="text-sm font-semibold text-slate-600 mt-1">{treatment?.name}</p>
   </div>

   <ControlResultDisplay level={adult_controlLevel} />

   <div className="space-y-1 divide-y divide-slate-100">
    {treatment ? (
     <div className="space-y-1 bg-white p-4 rounded-md border border-slate-200">
      {treatment.controller && (
       <DetailSection title="Controller" icon={<ShieldCheck className="text-emerald-500"/>}>
        <p>{treatment.controller}</p>
       </DetailSection>
      )}
      {treatment.reliever && (
       <DetailSection title="Reliever" icon={<Wind className="text-blue-500"/>}>
        <p>{treatment.reliever}</p>
       </DetailSection>
          )}
            {treatment.additional && (
              <DetailSection title="Additional / Alternative Controller Options" icon={<PlusCircle className="text-cyan-500"/>}>
                 {typeof treatment.additional === 'string' ? <p>{treatment.additional}</p> : <ul className="list-disc list-inside space-y-1">{treatment.additional.map((item, i) => <li key={i}>{item}</li>)}</ul>}
              </DetailSection>
            )}
            {treatment.keyPoints && treatment.keyPoints.lengthgreater than 0 && (
               <DetailSection title="Key Points" icon={<Info className="text-sky-500"/>}>
                <ul className="list-disc list-inside space-y-1">
                  {treatment.keyPoints.map((point, index) => <li key={index}>{point}</li>)}
                </ul>
              </DetailSection>
            )}
             {treatment.notes && (
               <DetailSection title="Notes" icon={<FileText className="text-slate-500"/>}>
                {typeof treatment.notes === 'string' ? <p>{treatment.notes}</p> : <ul className="list-disc list-inside space-y-1">{treatment.notes.map((item, i) => <li key={i}>{item}</li>)}</ul>}
              </DetailSection>
            )}
            {treatment.referral && (
                <div className="mt-3 p-3 bg-amber-50 border-l-4 border-amber-400 rounded-r-md">
                    <h4 className="font-semibold text-amber-800 flex items-center text-sm"><AlertTriangle size={16} className="mr-2"/>Specialist Referral</h4>
                    <p className="text-sm text-amber-700 mt-1 pl-6">{treatment.referral}</p>
                </div>
            )}
          </div>
        ) : (
          <p className="text-slate-600">No specific treatment details found for this step/pathway combination.</p>
        )}

        <div className="space-y-2 bg-white p-4 rounded-md border border-slate-200 mt-4">
          <DetailSection title="Non-Pharmacological Strategies" icon={<Route className="text-indigo-500"/>}>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li><strong>Smoking/Vaping Cessation:</strong> Strongly advise quitting and provide support. Avoid environmental tobacco smoke.</li>
              <li><strong>Physical Activity:</strong> Encourage regular physical activity. Advise on preventing exercise-induced symptoms.</li>
              <li><strong>Trigger Management:</strong> Identify and avoid confirmed triggers (e.g., allergens, occupational exposures, medications like NSAIDs).</li>
              <li><strong>Action Plan:</strong> Provide and explain a written asthma action plan.</li>
            </ul>
          </DetailSection>
        </div>
      </div>
      
      <div className="mt-8 space-y-4" >
         <div>
            <h3 className="text-base font-semibold mb-2 text-center text-slate-700">Adjust Treatment Step:</h3>
            <div className="flex justify-center items-center space-x-3 mb-2">
            <Button 
                onClick={() => handleStepChange(adult_currentGinaStep - 1)} 
                disabled={!canStepDown}
                variant="secondary"
                leftIcon={<MinusCircle />}
                aria-label="Decrease treatment step"
                size="sm"
            >
                Step Down
            </Button>
            <span className="text-lg font-bold text-sky-600 w-24 text-center py-1.5 border border-slate-300 rounded-md bg-slate-50">Step {adult_currentGinaStep}</span>
            <Button 
                onClick={() => handleStepChange(adult_currentGinaStep + 1)} 
                disabled={!canStepUp}
                variant="secondary"
                leftIcon={<PlusCircle />}
                aria-label="Increase treatment step"
                size="sm"
            >
                Step Up
            </Button>
            </div>
            <p className="text-xs text-slate-500 text-center">
            Step up if poorly controlled. Step down if well controlled for 3 months. Review factors before stepping up.
            </p>
        </div>
        <div className="pt-4 border-t border-slate-200 space-y-3">
             <Button 
            onClick={() => navigateTo('ADULT_CONTROL_ASSESSMENT_STEP')} 
            fullWidth 
            variant="primary"
            size="lg"
            leftIcon={<ListChecks />}
            rightIcon={<ChevronRight />}
            aria-label="Assess current asthma control"
            >
            Assess Current Control
            </Button>
            <Button 
            onClick={() => navigateTo('ADULT_EXACERBATION_INTRO_STEP')} 
            fullWidth 
            variant="warning" 
            size="lg"
            leftIcon={<Zap />}
            rightIcon={<ChevronRight />}
            aria-label="View exacerbation plan"
            >
            Manage Exacerbation
            </Button>
        </div>
      </div>
    </Card>
  );
};

export default AdultTreatmentPlanStep;