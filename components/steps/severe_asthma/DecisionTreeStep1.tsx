import React, { useState } from 'react';
import { useNavigation } from '../../../contexts/NavigationContext';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import { Route, ArrowRight, CheckSquare, Square, CheckCircle2, XCircle, HelpCircle, ShieldAlert } from 'lucide-react';

type Stage = 'optimize' | 'review' | 'result';
type ReviewOutcome = 'uncontrolled' | 'controlled' | null;

const ChecklistItem: React.FC<{
  id: string;
  label: string;
  details: string;
  isChecked: boolean;
  onToggle: (id: string) => void;
}> = ({ id, label, details, isChecked, onToggle }) => {
    return (
        <div
            onClick={() => onToggle(id)}
            role="checkbox"
            aria-checked={isChecked}
            className={`flex items-start p-3 rounded-lg cursor-pointer transition-all duration-200 border ${
                isChecked
                ? 'bg-sky-50 border-sky-400'
                : 'bg-white border-slate-300 hover:bg-slate-50'
            }`}
        >
            {isChecked ? (
                <CheckSquare size={20} className="text-sky-600 mr-3 mt-0.5 flex-shrink-0" />
            ) : (
                <Square size={20} className="text-slate-400 mr-3 mt-0.5 flex-shrink-0" />
            )}
            <div className="flex-grow">
                <span className={`text-sm ${isChecked ? 'font-semibold text-slate-800' : 'text-slate-700'}`}>
                    {label}
                </span>
                <p className="text-xs text-slate-500 mt-1">{details}</p>
            </div>
        </div>
    );
};


const DecisionTreeStep1: React.FC = () => {
    const { navigateTo, resetNavigation } = useNavigation();
    const [stage, setStage] = useState<Stage>('optimize');
    const [checkedItems, setCheckedItems] = useState<string[]>([]);
    const [reviewOutcome, setReviewOutcome] = useState<ReviewOutcome>(null);
    
    const optimizationChecklist = [
        { id: 'confirm_dx', label: 'Confirm Asthma Diagnosis', details: 'Review lifetime records for objective evidence of variable airflow limitation and rule out alternative diagnoses.' },
        { id: 'check_adherence', label: 'Check Medication Adherence', details: 'Objectively check prescription records and discuss patient beliefs about their medication.' },
        { id: 'check_technique', label: 'Check Inhaler Technique', details: 'Observe the patient using their inhalers at every visit and provide training.' },
        { id: 'check_comorbidities', label: 'Assess & Manage Comorbidities', details: 'Screen for and manage rhinosinusitis, GERD, obesity, OSA, anxiety, and depression.' },
        { id: 'check_risks', label: 'Assess & Manage Risk Factors', details: 'Address smoking/vaping, relevant allergen/occupational exposures, and review medications (e.g., beta-blockers, NSAIDs).' },
    ];
    
    const handleToggleCheck = (id: string) => {
        setCheckedItems(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };
    
    const allChecked = checkedItems.length === optimizationChecklist.length;

    const renderOptimizeStage = () => (
        <>
            <p className="mb-6 text-sm text-slate-600">
                This is the first step in the systematic assessment of a patient with difficult-to-treat asthma (GINA 2025, Box 8-2). Before diagnosing severe asthma, confirm the diagnosis and ensure basics are optimized. Check off each item as it is addressed.
            </p>
            <div className="space-y-3">
                {optimizationChecklist.map(item => (
                    <ChecklistItem
                        key={item.id}
                        id={item.id}
                        label={item.label}
                        details={item.details}
                        isChecked={checkedItems.includes(item.id)}
                        onToggle={handleToggleCheck}
                    />
                ))}
            </div>
             <div className="mt-8">
                <Button
                    onClick={() => setStage('review')}
                    size="lg"
                    fullWidth
                    rightIcon={<ArrowRight />}
                    disabled={!allChecked}
                    aria-label="Proceed to review after 3-6 months"
                >
                    Proceed to Review after 3-6 Months
                </Button>
                {!allChecked && <p className="text-xs text-center mt-2 text-slate-500">Please confirm all items have been assessed and managed.</p>}
            </div>
        </>
    );

    const renderReviewStage = () => (
        <>
            <p className="mb-6 text-sm text-slate-600">
                After addressing all the previous points for a period of <strong>3-6 months</strong>, you can now assess the patient's response to this optimized management.
            </p>
            <div className="p-5 bg-sky-50 border border-sky-200 rounded-lg text-center">
                 <h3 className="font-semibold text-slate-800 text-md mb-3">Is the patient's asthma still uncontrolled on high-dose ICS-LABA?</h3>
                 <div className="flex justify-center space-x-3">
                    <Button onClick={() => { setReviewOutcome('uncontrolled'); setStage('result'); }} variant="danger" size="lg">Yes, Uncontrolled</Button>
                    <Button onClick={() => { setReviewOutcome('controlled'); setStage('result'); }} variant="success" size="lg">No, Now Controlled</Button>
                 </div>
            </div>
        </>
    );
    
     const renderResultStage = () => {
        if (reviewOutcome === 'uncontrolled') {
            return (
                <div className="p-5 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
                     <h3 className="font-semibold text-red-800 text-lg flex items-center mb-2">
                        <XCircle size={22} className="mr-2"/>
                        Diagnosis: Severe Asthma
                    </h3>
                    <p className="text-sm text-red-700 leading-relaxed">
                        The patient's condition remains uncontrolled despite optimizing management and high-dose controller therapy. This confirms a diagnosis of severe asthma.
                    </p>
                    <div className="mt-4 p-3 bg-red-100 border border-red-300 rounded-md">
                        <p className="font-bold text-red-800 flex items-center">
                           <ShieldAlert size={18} className="mr-2"/>
                           Action Required: Specialist Referral
                        </p>
                        <p className="text-sm text-red-700 mt-1 pl-7">
                           This patient must be referred to a specialist with expertise in severe asthma for further assessment and management.
                        </p>
                    </div>
                     <div className="mt-6 text-right">
                        <Button
                            onClick={() => navigateTo('SEVERE_ASTHMA_DECISION_TREE_STEP_2')}
                            size="lg"
                            rightIcon={<ArrowRight />}
                        >
                            Next: Phenotype Assessment
                        </Button>
                    </div>
                </div>
            );
        }
        
        if (reviewOutcome === 'controlled') {
             return (
                <div className="p-5 bg-emerald-50 border-l-4 border-emerald-500 rounded-r-lg">
                    <h3 className="font-semibold text-emerald-800 text-lg flex items-center mb-2">
                        <CheckCircle2 size={22} className="mr-2"/>
                        Diagnosis: Difficult-to-Treat (but not Severe) Asthma
                    </h3>
                    <p className="text-sm text-emerald-700 leading-relaxed">
                        The patient's asthma is now controlled after addressing contributing factors (e.g., adherence, comorbidities). This is 'difficult-to-treat' asthma, but it does not meet the criteria for 'severe' asthma. Continue to manage and monitor.
                    </p>
                     <div className="mt-6 text-right">
                        <Button
                            onClick={resetNavigation}
                            variant="success"
                            size="lg"
                        >
                            Finish & Restart Guide
                        </Button>
                    </div>
                </div>
            );
        }
        
        return null;
    };


    return (
        <Card
            title="Severe Asthma Decision Tree: Step 1"
            icon={<Route className="text-red-600" />}
        >
            {stage === 'optimize' && renderOptimizeStage()}
            {stage === 'review' && renderReviewStage()}
            {stage === 'result' && renderResultStage()}
            
             {stage !== 'result' && (
                <div className="mt-6 p-3 bg-slate-100 border border-slate-200 rounded-lg text-xs">
                    <div className="flex items-start">
                        <HelpCircle size={16} className="mr-2 mt-0.5 text-slate-500 flex-shrink-0" />
                        <p className="text-slate-600">
                           <strong>Reference: GINA 2025, Box 8-2.</strong> This initial assessment is crucial. Many patients with 'difficult' asthma can achieve control by optimizing these factors, avoiding the need for more complex therapies.
                        </p>
                    </div>
                </div>
            )}
        </Card>
    );
};

export default DecisionTreeStep1;