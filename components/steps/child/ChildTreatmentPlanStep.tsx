

import React from 'react';
import { usePatientData } from '../../../contexts/PatientDataContext';
import { useNavigation } from '../../../contexts/NavigationContext';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import { childTreatments } from '../../../constants/treatmentData';
import { TreatmentDetail, ChildGINASteps, ChildPathway, ControlLevel } from '../../../types';
import { Pill, ChevronRight, PlusCircle, MinusCircle, AlertTriangle, Activity, Zap, ShieldCheck, BookOpen, CheckCircle2, XCircle, ListChecks, Info, TrendingUp } from 'lucide-react';
import DetailSection from '../../common/DetailSection';

const ChildTreatmentPlanStep: React.FC = () => {
  const { patientData, updatePatientData } = usePatientData();
  const { navigateTo } = useNavigation();
  const { child_currentGinaStep, child_pathway, child_controlLevel } = patientData;

  if (!child_currentGinaStep || !child_pathway) {
    return (
      <Card title="Error: Missing Data" icon={<AlertTriangle className="text-red-500" />} className="border-red-300 bg-red-50">
        <p>Information about the child's GINA step or therapeutic pathway is missing. Please return to previous steps.</p>
         <div className="mt-4">
            <Button onClick={() => navigateTo('CHILD_PATHWAY_SELECTION_STEP')} variant="secondary">
            Return to Pathway Selection
            </Button>
        </div>
      </Card>
    );
  }
  
  const pathwaySpecificTreatments = childTreatments[child_pathway as ChildPathway];
  const treatment: TreatmentDetail | undefined = pathwaySpecificTreatments ? pathwaySpecificTreatments[child_currentGinaStep as ChildGINASteps] : undefined;

  const currentStepName = `GINA Step ${child_currentGinaStep}`;
  const pathwayNameDisplay = child_pathway === 'track1' ? 'Track 1 (MART with ICS-formoterol)' : 'Track 2 (SABA Reliever)';


  const canStepUp = child_currentGinaSteplower than 4;
  const canStepDown = child_currentGinaStepgreater than 1;

  const handleStepChange = (newStep: number) => {
    if (newStep greater than or equal to  1 && newStep lower than or equal to  4) {
      updatePatientData({ 
        child_currentGinaStep: newStep as ChildGINASteps,
        child_controlLevel: null // Reset control level
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
        uncontrolled: "Step up treatment. Review adherence, technique, and risk factors. Consider a short course of OCS for severe cases."
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
                {(level === 'partlyControlled' || level === 'uncontrolled') && canStepUp && (
                     <Button onClick={() => handleStepChange(child_currentGinaStep + 1)} variant="warning" size="sm" leftIcon={<TrendingUp size={16} />}>
                        Step-Up Treatment
                    </Button>
                )}
            </div>
        </div>
    );
  };

  return (
    <Card title="Asthma Treatment Plan (Child 6-11 years)" icon={<Activity className="text-emerald-600" />}>
      <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
        <p className="text-md font-semibold text-emerald-700">{pathwayNameDisplay}</p>
        <p className="text-2xl font-bold text-emerald-800">{currentStepName}</p>
        <p className="text-xs text-slate-500 mt-1">Based on GINA 2025 recommendations for children 6-11 years.</p>
      </div>

      <ControlResultDisplay level={child_controlLevel} />

      <div className="space-y-5 bg-white p-4 rounded-md border border-slate-200">
          {treatment ? (
            <>
              {treatment.controller && (
                <DetailSection title="Controller Treatment" icon={<ShieldCheck className="text-emerald-500"/>}>
                  <p>{treatment.controller}</p>
                </DetailSection>
              )}
              {treatment.reliever && (
                <DetailSection title="Reliever Treatment" icon={<Zap className="text-blue-500"/>}>
                  <p>{treatment.reliever}</p>
                </DetailSection>
              )}
              {treatment.keyPoints && treatment.keyPoints.lengthgreater than 0 && (
                <DetailSection title="Key Points" icon={<Info className="text-sky-500"/>}>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    {treatment.keyPoints.map((point, index) => <li key={index}>{point}</li>)}
                  </ul>
                </DetailSection>
              )}
              {treatment.additional && (
                <DetailSection title="Additional Considerations / Options" icon={<PlusCircle className="text-cyan-500"/>}>
                  {typeof treatment.additional === 'string' ? (
                    <p className="text-sm">{treatment.additional}</p>
                  ) : (
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {treatment.additional.map((item, index) => <li key={index}>{item}</li>)}
                    </ul>
                  )}
                </DetailSection>
              )}
              {treatment.notes && (
                <div className="mt-3 p-3 bg-slate-100 border border-slate-200 rounded-md text-sm">
                    <h4 className="font-semibold text-slate-600 mb-1 flex items-center"><Info size={16} className="mr-2"/>Important Notes:</h4>
                    {typeof treatment.notes === 'string' ? (
                        <p className="text-slate-600 leading-relaxed pl-6">{treatment.notes}</p>
                    ) : (
                        <ul className="list-disc list-inside pl-6 text-slate-600 space-y-1 leading-relaxed">
                        {treatment.notes.map((item, index) => <li key={index}>{item}</li>)}
                        </ul>
                    )}
                </div>
              )}
              {treatment.referral && (
                <div className="mt-4 p-3 bg-amber-50 border-l-4 border-amber-400 rounded-md">
                   <h4 className="font-semibold text-amber-700 text-sm flex items-center"><AlertTriangle size={16} className="mr-2"/>Specialist Referral Recommended</h4>
                  <p className="text-sm text-amber-600 leading-relaxed pl-6">{treatment.referral}</p>
                </div>
              )}
            </>
          ) : (
            <p className="text-slate-600">No specific treatment details found for this step and track.</p>
          )}
      </div>

       <div className="mt-6 pt-4 border-t border-slate-200 bg-white p-4 rounded-md">
        <h3 className="text-base font-semibold text-slate-800 mb-2">Ongoing Risk Factor Management</h3>
        <ul className="list-none space-y-3">
            <li className="flex items-start text-sm"><BookOpen size={18} className="mr-3 mt-0.5 text-sky-600 flex-shrink-0" /><span>Provide a <strong>Written Asthma Action Plan</strong> and ensure parents/child understand its use.</span></li>
            <li className="flex items-start text-sm"><ShieldCheck size={18} className="mr-3 mt-0.5 text-emerald-600 flex-shrink-0" /><span>Check <strong>inhaler technique</strong> (with spacer) and <strong>adherence</strong> at every visit.</span></li>
            <li className="flex items-start text-sm"><AlertTriangle size={18} className="mr-3 mt-0.5 text-amber-600 flex-shrink-0" /><span>Discuss and address <strong>environmental triggers</strong> (e.g., tobacco smoke, allergens).</span></li>
        </ul>
      </div>

      <div className="mt-8 space-y-4" >
         <div>
            <h3 className="text-base font-semibold mb-2 text-center text-slate-700">Adjust Treatment Step ({pathwayNameDisplay}):</h3>
            <div className="flex justify-center items-center space-x-3 mb-2">
            <Button 
                onClick={() => handleStepChange(child_currentGinaStep - 1)} 
                disabled={!canStepDown}
                variant="secondary"
                leftIcon={<MinusCircle />}
                aria-label="Decrease treatment step"
                size="md"
            >
                Step Down
            </Button>
            <span className="text-lg font-bold text-emerald-600 w-24 text-center py-1.5 border border-slate-300 rounded-md bg-slate-50">Step {child_currentGinaStep}</span>
            <Button 
                onClick={() => handleStepChange(child_currentGinaStep + 1)} 
                disabled={!canStepUp}
                variant="secondary"
                leftIcon={<PlusCircle />}
                aria-label="Increase treatment step"
                size="md"
            >
                Step Up
            </Button>
            </div>
            <p className="text-xs text-slate-500 text-center">
            Step up if poorly controlled. Step down if well controlled for 3 months. Inhaler technique and adherence are crucial.
            </p>
        </div>
        <div className="pt-4 border-t border-slate-200 space-y-3">
            <Button 
                onClick={() => navigateTo('CHILD_CONTROL_ASSESSMENT_STEP')}
                fullWidth 
                variant="success" 
                size="lg"
                leftIcon={<ListChecks />}
                rightIcon={<ChevronRight />}
                aria-label="Assess current asthma control"
                >
                Assess Current Control
            </Button>
            <Button 
            onClick={() => navigateTo('CHILD_EXACERBATION_INTRO_STEP')} 
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

export default ChildTreatmentPlanStep;