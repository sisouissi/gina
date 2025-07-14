
import React from 'react';
import { useNavigation } from '../../../contexts/NavigationContext';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import { ChevronRight, HelpCircle, ClipboardList } from 'lucide-react';
import { ChildGINASteps } from '../../../types';

const ChildInitialAssessmentStep: React.FC = () => {
  const { navigateTo } = useNavigation();

  const handleSelection = (initialGinaStep: ChildGINASteps) => {
    navigateTo('CHILD_PATHWAY_SELECTION_STEP', {
      child_currentGinaStep: initialGinaStep,
    });
  };
  
  const FlowchartSection: React.FC<{
    title: string;
    description: React.ReactNode;
    startStep: string;
    recommendedTreatment: string;
    note?: string;
    children: React.ReactNode;
  }> = ({ title, description, startStep, recommendedTreatment, note, children }) => (
    <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
      <h3 className="font-bold text-lg text-slate-800">{title}</h3>
      <div className="text-sm text-slate-600 my-2">{description}</div>
      <div className="mt-3 p-3 bg-slate-50 rounded-md border border-slate-100">
        <p className="text-sm font-semibold text-slate-700">Recommended Start: <span className="text-emerald-600 font-bold">{startStep}</span></p>
        <div className="mt-2 text-xs space-y-1">
          <p><strong className="text-emerald-700">Initial Treatment:</strong> {recommendedTreatment}</p>
          {note && <p className="mt-1 text-slate-500">{note}</p>}
        </div>
      </div>
      <div className="mt-4">
        {children}
      </div>
    </div>
  );

  return (
    <Card title="Flowchart for Initial Treatment (Children 6-11)" icon={<ClipboardList className="text-emerald-600" />}>
      <p className="mb-6 text-sm text-slate-600 leading-relaxed">
        Based on the child's symptom pattern, select the most appropriate starting point for initial treatment as per GINA 2025, Box 4-11.
      </p>
      <div className="space-y-6">
        
        <FlowchartSection
          title="Severe Presentation / High Risk"
          description={
            <p>Symptoms most days or waking at night {'at least once per week'}, <strong>AND</strong> low lung function.</p>
          }
          startStep="Step 3/4"
          recommendedTreatment="Medium-dose ICS-LABA or medium-dose ICS. Consider referring for expert advice."
          note="MART is also an option. Initial treatment may be as an exacerbation."
        >
          <Button 
            onClick={() => handleSelection(4)} // Technically starts at Step 4 if referral is considered.
            variant="danger"
            fullWidth
            rightIcon={<ChevronRight />}
            size="lg"
          >
            Select Severe Presentation
          </Button>
        </FlowchartSection>

        <FlowchartSection
          title="Moderate, Persistent Symptoms"
          description={
            <p>Symptoms on <strong>most days</strong>, OR <strong>waking at night</strong> once or more a week.</p>
          }
          startStep="Step 3"
          recommendedTreatment="Low-dose ICS-LABA or medium-dose ICS, plus as-needed SABA. Very-low-dose ICS-formoterol MART is an alternative."
        >
          <Button
            onClick={() => handleSelection(3)}
            variant="orange"
            fullWidth
            rightIcon={<ChevronRight />}
            size="lg"
          >
            Select Moderate Symptoms
          </Button>
        </FlowchartSection>

        <FlowchartSection
          title="Mild, Persistent Symptoms"
          description={
             <p>Symptoms <strong>2-5 days a week</strong>.</p>
          }
          startStep="Step 2"
          recommendedTreatment="Daily low-dose ICS plus as-needed SABA."
        >
          <Button
            onClick={() => handleSelection(2)}
            variant="yellow"
            fullWidth
            rightIcon={<ChevronRight />}
            size="lg"
          >
            Select Mild Symptoms
          </Button>
        </FlowchartSection>

         <FlowchartSection
          title="Infrequent Symptoms"
          description={
             <p>Symptoms <strong>less than two days a week</strong>.</p>
          }
          startStep="Step 1"
          recommendedTreatment="Take low dose ICS whenever SABA is taken."
           note="Adherence to daily ICS is likely to be very poor in this group, making as-needed ICS a better option."
        >
          <Button
            onClick={() => handleSelection(1)}
            variant="secondary"
            fullWidth
            rightIcon={<ChevronRight />}
            size="lg"
          >
            Select Infrequent Symptoms
          </Button>
        </FlowchartSection>
      </div>

       <div className="mt-8 p-3 bg-slate-100 border border-slate-200 rounded-lg text-sm">
        <div className="flex items-start">
          <HelpCircle size={18} className="mr-2 mt-0.5 text-slate-500 flex-shrink-0" />
          <p className="text-slate-600">
            This flowchart guides the choice of the initial GINA treatment step. The next screen will allow you to select a treatment pathway.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default ChildInitialAssessmentStep;