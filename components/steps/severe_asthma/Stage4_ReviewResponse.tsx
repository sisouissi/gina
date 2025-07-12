
import React, { useState } from 'react';
import { useNavigation } from '../../../contexts/NavigationContext';
import AssessmentCard from './AssessmentCard';
import Button from '../../ui/Button';
import { Calendar, CheckCircle2, XCircle, AlertTriangle, ChevronRight, ListChecks, ArrowRight, TrendingDown, Square, CheckSquare, HelpCircle } from '../../../constants/icons';

interface ControlAnswers {
 [key: string]: boolean | null;
}

const questions = [
 { id: 'q1', text: 'In the past 4 weeks, has the patient had daytime symptoms more than twice a week?' },
 { id: 'q2', text: 'In the past 4 weeks, has the patient had any night waking due to asthma?' },
 { id: 'q3', text: 'In the past 4 weeks, has the patient needed SABA or ICS-formoterol for relief more than twice a week?' },
 { id: 'q4', text: 'In the past 4 weeks, has the patient had any activity limitation due to asthma?' },
];

const Stage4_ReviewResponse: React.FC = () => {
  const { navigateTo } = useNavigation();
  const [answers, setAnswers] = useState<ControlAnswers>({});
  const [controlResult, setControlResult] = useState<'controlled' | 'uncontrolled' | null>(null);
  const [stepDownResult, setStepDownResult] = useState<'yes' | 'no' | null>(null);

  const handleAnswer = (id: string, value: boolean) => {
    setAnswers(prev => ({...prev, [id]: value}));
    setControlResult(null); 
    setStepDownResult(null);
  };
  
  const handleStepDownAnswer = (value: 'yes' | 'no') => {
    setStepDownResult(value);
  };

  const allAnswered = questions.every(q => answers[q.id] !== undefined && answers[q.id] !== null);

  const assessControl = () => {
    const isUncontrolled = Object.values(answers).some(answer => answer === true);
    setControlResult(isUncontrolled ? 'uncontrolled' : 'controlled');
  };

  return (
    <AssessmentCard title="Review Response (after 3-6 months)" icon={<Calendar />}>
      {!controlResult && (
        <>
          <p className="text-sm text-slate-600 mb-4">
            After implementing optimizations from Stage 3, assess if the patient's asthma is now controlled. Answer the following based on the last 4 weeks.
          </p>

          <div className="space-y-4">
            {questions.map(q => (
              <div key={q.id} className="p-3 bg-white border border-slate-200 rounded-lg">
                <p className="font-medium text-slate-700 text-sm mb-2">{q.text}</p>
                <div className="flex space-x-2">
                <Button
                  onClick={() => handleAnswer(q.id, true)}
                  variant={answers[q.id] === true ? 'warning' : 'secondary'}
                  size="sm"
                  fullWidth
                  leftIcon={answers[q.id] === true ? <CheckSquare size={16}/> : <Square size={16}/>}
                >Yes</Button>
                <Button
                  onClick={() => handleAnswer(q.id, false)}
                  variant={answers[q.id] === false ? 'success' : 'secondary'}
                  size="sm"
                  fullWidth
                  leftIcon={answers[q.id] === false ? <CheckSquare size={16}/> : <Square size={16}/>}
                >No</Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t border-slate-200 pt-5">
            <Button onClick={assessControl} disabled={!allAnswered} fullWidth size="lg" leftIcon={<ListChecks/>}>
              Assess Control Level
            </Button>
          </div>
        </>
      )}

      {controlResult === 'uncontrolled' && (
        <div className="mt-2 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-md">
          <h4 className="font-semibold text-red-800 flex items-center mb-2">
            <XCircle size={20} className="mr-2"/>
            Conclusion: Asthma is Still Uncontrolled
          </h4>
          <p className="text-sm text-red-700 pl-7 mb-4">
            The diagnosis of severe asthma is likely. If not done by now, refer the patient to a specialist or severe asthma clinic if possible.
          </p>
          <div className="pl-7">
            <Button 
              onClick={() => navigateTo('SEVERE_ASTHMA_STAGE_5')}
              variant="danger"
              rightIcon={<ChevronRight/>}
            >
              Proceed to Specialist Assessment
            </Button>
          </div>
        </div>
      )}
      
      {controlResult === 'controlled' && (
        <div className="mt-2 p-4 bg-green-50 border-l-4 border-green-500 rounded-r-md">
          <h4 className="font-semibold text-green-800 flex items-center mb-2">
            <CheckCircle2 size={20} className="mr-2"/>
            Conclusion: Asthma is now well controlled
          </h4>
          <p className="text-sm text-green-700 pl-7">
            Consider stepping down treatment. Start by decreasing/ceasing OCS first (if used), checking for adrenal insufficiency, then consider removing other add-on therapy, then decrease ICS dose, but do not stop ICS.
          </p>

          <div className="mt-5 pt-4 border-t border-green-200">
             <h4 className="font-semibold text-slate-800 flex items-center mb-3">
              <HelpCircle size={20} className="mr-2"/>
              Next Question:
            </h4>
            <p className="font-medium text-slate-700 text-sm mb-3 pl-7">
              Does asthma become uncontrolled when treatment is stepped down?
            </p>
            {!stepDownResult && (
              <div className="flex space-x-3 pl-7">
                <Button onClick={() => handleStepDownAnswer('yes')} variant="warning" size="md">Yes</Button>
                <Button onClick={() => handleStepDownAnswer('no')} variant="success" size="md">No</Button>
              </div>
            )}
          </div>
        </div>
      )}
      
      {stepDownResult === 'yes' && (
        <div className="mt-4 p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-md">
          <h4 className="font-semibold text-amber-800 flex items-center mb-2">
            <AlertTriangle size={20} className="mr-2"/>
            Conclusion: Loss of Control on Step-Down
          </h4>
          <p className="text-sm text-amber-700 pl-7 mb-4">
            Asthma symptoms become uncontrolled or an exacerbation occurs when high-dose treatment is stepped down, the diagnosis of severe asthma is likely. Restore the patient's previous dose to regain good asthma control, and refer to a specialist or severe asthma clinic, if possible, if not done already.
          </p>
           <div className="pl-7">
            <Button 
              onClick={() => navigateTo('SEVERE_ASTHMA_STAGE_5')}
              variant="warning"
              rightIcon={<ChevronRight/>}
            >
              Proceed to Specialist Assessment
            </Button>
          </div>
        </div>
      )}

      {stepDownResult === 'no' && (
         <div className="mt-4 p-4 bg-sky-50 border-l-4 border-sky-500 rounded-r-md">
          <h4 className="font-semibold text-sky-800 flex items-center mb-2">
            <CheckCircle2 size={20} className="mr-2"/>
            Conclusion: Control Maintained on Step-Down
          </h4>
          <p className="text-sm text-sky-700 pl-7 mb-4">
            Symptoms and exacerbations remain well controlled despite treatment being stepped down, the patient does not have severe asthma.
          </p>
           <div className="pl-7">
            <Button 
              onClick={() => navigateTo('SEVERE_ASTHMA_STAGE_3')}
              variant="primary"
              rightIcon={<ArrowRight/>}
            >
              Return to Ongoing Management
            </Button>
          </div>
        </div>
      )}

    </AssessmentCard>
  );
};

export default Stage4_ReviewResponse;
