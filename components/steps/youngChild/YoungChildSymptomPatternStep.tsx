

import React from 'react';
import { useNavigation } from '../../../contexts/NavigationContext';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import { YoungChildSymptomPattern, YoungChildGinaSteps, YoungChildTreatmentStrategyKey } from '../../../types';
import { ChevronRight, HelpCircle, Baby } from 'lucide-react';

const YoungChildSymptomPatternStep: React.FC = () => {
  const { navigateTo } = useNavigation();

  const handleSelection = (
    pattern: YoungChildSymptomPattern, 
    initialGinaStep: YoungChildGinaSteps
  ) => {
    navigateTo('YOUNG_CHILD_RISK_ASSESSMENT_STEP', {
      youngChild_symptomPattern: pattern,
      youngChild_currentGinaStep: initialGinaStep,
      youngChild_currentTreatmentStrategy: 'preferred', 
    });
  };
  
  const options = [
    {
      label: "Infrequent viral wheeze AND few interval symptoms",
      description: "Less than 3 episodes/year, asymptomatic between. GINA Step 1 considered.",
      pattern: 'infrequentViralWheeze' as YoungChildSymptomPattern,
      initialGinaStep: 1 as YoungChildGinaSteps,
      ginaRef: "GINA 2025 Box 11-2, Step 1"
    },
    {
      label: "Asthma diagnosis OR wheezing episodes 3 or more times per year OR interval symptoms",
      description: "More frequent wheezing or intercurrent symptoms. GINA Step 2 considered.",
      pattern: 'persistentAsthmaOrFrequentWheeze' as YoungChildSymptomPattern,
      initialGinaStep: 2 as YoungChildGinaSteps,
      ginaRef: "GINA 2025 Box 11-2, Step 2" 
    },
     {
      label: "Severe symptoms or uncertain diagnosis, OR failure of initial therapies",
      description: "Requires specialist assessment. GINA Step 4 (Referral).",
      pattern: 'persistentAsthmaOrFrequentWheeze' as YoungChildSymptomPattern,
      initialGinaStep: 4 as YoungChildGinaSteps, 
      ginaRef: "GINA 2025 Box 11-2, Step 4 (Referral)"
    }
  ];

  return (
    <Card title="Symptom Pattern in Young Child (<=5 years)" icon={<Baby className="text-violet-600" />}>
      <p className="mb-6 text-sm text-slate-600 leading-relaxed">
        Determine the child's respiratory symptom pattern to guide the initial therapeutic strategy (GINA 2025, Box 11-2).
      </p>
      <div className="space-y-3">
        {options.map((opt) => (
          <Button
            key={opt.label} 
            onClick={() => handleSelection(opt.pattern, opt.initialGinaStep)}
            variant="secondary"
            fullWidth
            justify="between"
            size="lg"
            className="!py-4 text-left h-auto"
            aria-label={`${opt.label}. ${opt.description}. ${opt.ginaRef}`}
          >
            <div className="flex-grow">
              <h3 className="font-semibold text-violet-700 text-base whitespace-normal">{opt.label}</h3>
              <p className="text-sm text-slate-600 mt-1 font-normal whitespace-normal">{opt.description}</p>
              <p className="text-xs text-violet-500 mt-1.5 font-medium whitespace-normal">{opt.ginaRef}</p>
            </div>
            <ChevronRight size={20} className="text-slate-400 flex-shrink-0 ml-2" />
          </Button>
        ))}
      </div>
       <div className="mt-6 p-3 bg-slate-100 border border-slate-200 rounded-lg text-sm">
        <div className="flex items-start">
          <HelpCircle size={18} className="mr-2 mt-0.5 text-slate-500 flex-shrink-0" />
          <p className="text-slate-600">
            This assessment helps select an initial management approach. Ensure correct inhaler technique (pMDI with spacer and age-appropriate facemask).
          </p>
        </div>
      </div>
    </Card>
  );
};

export default YoungChildSymptomPatternStep;