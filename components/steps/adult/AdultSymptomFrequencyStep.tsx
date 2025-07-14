
import React from 'react';
import { useNavigation } from '../../../contexts/NavigationContext';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import { AdultSymptomFrequency } from '../../../types';
import { ClipboardList, ChevronRight, HelpCircle } from 'lucide-react';

const AdultSymptomFrequencyStep: React.FC = () => {
  const { navigateTo } = useNavigation();

  const handleSelection = (frequency: AdultSymptomFrequency, initialGinaStep: 1 | 2 | 3 | 4) => {
    navigateTo('ADULT_PATHWAY_SELECTION_STEP', {
      adult_symptomFrequency: frequency,
      adult_currentGinaStep: initialGinaStep,
    });
  };

  const FlowchartSection: React.FC<{
    title: string;
    description: React.ReactNode;
    startStep: string;
    track1Treatment: string;
    track2Treatment: string;
    children: React.ReactNode;
  }> = ({ title, description, startStep, track1Treatment, track2Treatment, children }) => (
    <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
      <h3 className="font-bold text-lg text-slate-800">{title}</h3>
      <div className="text-sm text-slate-600 my-2">{description}</div>
      <div className="mt-3 p-3 bg-slate-50 rounded-md border border-slate-100">
        <p className="text-sm font-semibold text-slate-700">Recommended Start: <span className="text-sky-600 font-bold">{startStep}</span></p>
        <div className="mt-2 text-xs space-y-1">
          <p><strong className="text-emerald-600">Track 1 (Preferred):</strong> {track1Treatment}</p>
          <p><strong className="text-sky-600">Track 2 (Alternative):</strong> {track2Treatment}</p>
        </div>
      </div>
      <div className="mt-4">
        {children}
      </div>
    </div>
  );

  return (
    <Card title="Flowchart for Initial Treatment Selection (Adults)" icon={<ClipboardList className="text-sky-600" />}>
      <p className="mb-6 text-sm text-slate-600 leading-relaxed">
        Based on the patient's symptoms and risk profile, select the most appropriate starting point for initial asthma treatment as per GINA 2025, Box 4-5.
      </p>
      <div className="space-y-6">
        
        <FlowchartSection
          title="Markedly Uncontrolled Symptoms & High Risk"
          description={
            <p>{'Patient has '}<strong>both</strong>{' a high symptom burden (symptoms daily or waking at night once a week or more) '}<strong>AND</strong>{' has low lung function or had a recent exacerbation.'}</p>
          }
          startStep="Step 4"
          track1Treatment="Medium-dose ICS-formoterol MART"
          track2Treatment="Medium-dose ICS-LABA + as-needed SABA"
        >
          <Button 
            onClick={() => handleSelection('severeDailyOrExacerbation', 4)}
            variant="danger"
            fullWidth
            rightIcon={<ChevronRight />}
            size="lg"
          >
            Select this presentation (Start at Step 4)
          </Button>
        </FlowchartSection>

        <FlowchartSection
          title="Troublesome Asthma Symptoms"
          description={
            <p>Patient has symptoms on <strong>most days</strong> OR is <strong>waking at night</strong> at least once a week, OR has reduced lung function.</p>
          }
          startStep="Step 3"
          track1Treatment="Low-dose ICS-formoterol MART"
          track2Treatment="Low-dose ICS-LABA + as-needed SABA"
        >
          <Button
            onClick={() => handleSelection('mostDaysOrWakingWeekly', 3)}
            variant="primary"
            fullWidth
            rightIcon={<ChevronRight />}
            size="lg"
          >
            Select this presentation (Start at Step 3)
          </Button>
        </FlowchartSection>

        <FlowchartSection
          title="More Frequent Symptoms"
          description={
             <p>Patient has symptoms <strong>twice a month or more</strong>, but not most days. Includes waking from asthma less than once a week.</p>
          }
          startStep="Step 2"
          track1Treatment="As-needed low-dose ICS-formoterol"
          track2Treatment="Daily low-dose ICS + as-needed SABA"
        >
          <Button
            onClick={() => handleSelection('twiceAMonthOrMore', 2)}
            variant="secondary"
            fullWidth
            rightIcon={<ChevronRight />}
            size="lg"
          >
            Select this presentation (Start at Step 2)
          </Button>
        </FlowchartSection>

         <FlowchartSection
          title="Infrequent Symptoms"
          description={
             <p>Patient has symptoms <strong>less than twice a month</strong> and no waking due to asthma.</p>
          }
          startStep="Step 1"
          track1Treatment="As-needed low-dose ICS-formoterol"
          track2Treatment="ICS taken whenever SABA is used"
        >
          <Button
            onClick={() => handleSelection('lessThanTwiceAMonth', 1)}
            variant="secondary"
            fullWidth
            rightIcon={<ChevronRight />}
            size="lg"
          >
            Select this presentation (Start at Step 1)
          </Button>
        </FlowchartSection>
      </div>

       <div className="mt-8 p-3 bg-slate-100 border border-slate-200 rounded-lg text-sm">
        <div className="flex items-start">
          <HelpCircle size={18} className="mr-2 mt-0.5 text-slate-500 flex-shrink-0" />
          <p className="text-slate-600">
            This flowchart guides the choice of the initial GINA step. After this, you will select the preferred treatment pathway.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default AdultSymptomFrequencyStep;