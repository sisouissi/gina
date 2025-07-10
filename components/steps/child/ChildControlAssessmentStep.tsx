
import React, { useState } from 'react';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import { useNavigation } from '../../../contexts/NavigationContext';
import { ControlLevel } from '../../../types';
import { CheckCircle2, AlertTriangle, XCircle, ChevronRight, ListChecks } from 'lucide-react';

interface ControlQuestion {
  id: keyof ControlAnswers;
  questionText: string;
  options: { label: string; value: number }[];
}

interface ControlAnswers {
  daytimeSymptoms: number | null;
  activityLimitation: number | null;
  nocturnalSymptoms: number | null;
  relieverNeed: number | null;
}

const questions: ControlQuestion[] = [
  {
    id: 'daytimeSymptoms',
    questionText: 'In the past 4 weeks, has the child had daytime asthma symptoms more than twice a week?',
    options: [{ label: 'Yes', value: 1 }, { label: 'No', value: 0 }],
  },
  {
    id: 'activityLimitation',
    questionText: 'In the past 4 weeks, has the child had any activity limitation due to asthma?',
    options: [{ label: 'Yes', value: 1 }, { label: 'No', value: 0 }],
  },
  {
    id: 'nocturnalSymptoms',
    questionText: 'In the past 4 weeks, has the child had any night waking due to asthma?',
    options: [{ label: 'Yes', value: 1 }, { label: 'No', value: 0 }],
  },
  {
    id: 'relieverNeed',
    questionText: 'In the past 4 weeks, has the child needed SABA reliever for symptoms more than twice a week?',
    options: [{ label: 'Yes', value: 1 }, { label: 'No', value: 0 }],
  },
];

const ChildControlAssessmentStep: React.FC = () => {
  const { navigateTo } = useNavigation();
  const [answers, setAnswers] = useState<ControlAnswers>({
    daytimeSymptoms: null,
    activityLimitation: null,
    nocturnalSymptoms: null,
    relieverNeed: null,
  });

  const handleAnswerChange = (questionId: keyof ControlAnswers, value: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const assessAndNavigate = () => {
    const score = Object.values(answers).reduce((acc, val) => acc + (val || 0), 0);
    let level: ControlLevel;
    if (score === 0) {
      level = 'wellControlled';
    } else if (score >= 1 && score <= 2) {
      level = 'partlyControlled';
    } else {
      level = 'uncontrolled';
    }
    navigateTo('CHILD_TREATMENT_PLAN_STEP', { child_controlLevel: level });
  };

  const allQuestionsAnswered = Object.values(answers).every(ans => ans !== null);

  return (
    <Card title="Asthma Control Assessment (Child 6-11 years)" icon={<ListChecks className="text-emerald-600" />}>
      <p className="mb-1 text-sm text-slate-600">
        Based on parent/caregiver and child report for the <strong>past 4 weeks</strong>, assess the level of symptom control (GINA 2025, Box 2-2A).
      </p>
      
      <div className="space-y-6 mt-6">
        {questions.map(q => (
          <div key={q.id} className="p-4 border border-slate-200 rounded-lg bg-white shadow-sm">
            <p className="font-medium text-slate-700 mb-3 text-sm">{q.questionText}</p>
            <div className="flex space-x-2">
              {q.options.map(opt => (
                <Button
                  key={opt.value}
                  onClick={() => handleAnswerChange(q.id, opt.value)}
                  variant={answers[q.id] === opt.value ? (opt.value === 1 ? 'warning' : 'success') : 'secondary'}
                  size="md"
                  fullWidth
                  aria-pressed={answers[q.id] === opt.value}
                >
                  {opt.label}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <Button onClick={assessAndNavigate} disabled={!allQuestionsAnswered} fullWidth rightIcon={<ChevronRight />} variant="success" size="xl">
          Complete Assessment & Review Plan
        </Button>
      </div>
    </Card>
  );
};

export default ChildControlAssessmentStep;
