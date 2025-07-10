
import React, { useState } from 'react';
import { useNavigation } from '../../../contexts/NavigationContext';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import { Route, ArrowLeft, RotateCcw, CheckSquare, Square, XCircle, CheckCircle2 } from 'lucide-react';

const checklistItems = [
    { id: 'discordance', label: 'Investigate for biomarker discordance', details: 'e.g., high FeNO but low eosinophils. Could indicate non-adherence to ICS.' },
    { id: 'adherence', label: 'Re-confirm adherence to medication', details: 'Use objective measures if possible (e.g., pharmacy records).' },
    { id: 'technique', label: 'Re-confirm correct inhaler technique', details: 'Observe the patient again. Even experienced patients can have issues.' },
    { id: 'comorbidities', label: 'Assess and manage comorbidities', details: 'Especially chronic rhinosinusitis, GERD, obesity, and anxiety/depression.' },
    { id: 'support', label: 'Provide patient education and support', details: 'Discuss treatment goals, preferences, and ensure shared decision-making.' },
];

const DecisionTreeStep2: React.FC = () => {
    const { navigateTo, resetNavigation, goBack } = useNavigation();
    const [checkedItems, setCheckedItems] = useState<string[]>([]);
    const [isReviewed, setIsReviewed] = useState(false);

    const handleToggleCheck = (id: string) => {
        setCheckedItems(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };
    
    const allChecked = checkedItems.length === checklistItems.length;

    return (
        <Card
            title="Severe Asthma Decision Tree: 2. Investigate & Support"
            icon={<Route className="text-red-600" />}
        >
            <p className="mb-6 text-sm text-slate-600">
                After confirming a likely diagnosis of severe asthma, perform a final detailed check for other contributing factors and provide patient support before assessing for biologic therapies (GINA 2025, Box 8-3, part 5).
            </p>
            
            <div className="space-y-3">
                {checklistItems.map(item => (
                    <div
                        key={item.id}
                        onClick={() => handleToggleCheck(item.id)}
                        role="checkbox"
                        aria-checked={checkedItems.includes(item.id)}
                        className={`flex items-start p-3 rounded-lg cursor-pointer transition-all duration-200 border ${
                            checkedItems.includes(item.id)
                            ? 'bg-sky-50 border-sky-400'
                            : 'bg-white border-slate-300 hover:bg-slate-50'
                        }`}
                    >
                        {checkedItems.includes(item.id) ? (
                            <CheckSquare size={20} className="text-sky-600 mr-3 mt-0.5 flex-shrink-0" />
                        ) : (
                            <Square size={20} className="text-slate-400 mr-3 mt-0.5 flex-shrink-0" />
                        )}
                         <div className="flex-grow">
                            <span className={`text-sm ${checkedItems.includes(item.id) ? 'font-semibold text-slate-800' : 'text-slate-700'}`}>
                                {item.label}
                            </span>
                             <p className="text-xs text-slate-500 mt-1">{item.details}</p>
                        </div>
                    </div>
                ))}
            </div>

            {allChecked && !isReviewed && (
                 <div className="mt-8 pt-6 border-t border-slate-200">
                    <h3 className="text-md font-semibold text-slate-800 mb-3 text-center">After these interventions, has asthma control improved?</h3>
                    <div className="flex justify-center space-x-3">
                        <Button
                            onClick={() => {
                                // Improved control, so it's not severe asthma
                                setIsReviewed(true);
                            }}
                            variant="success"
                            size="lg"
                        >
                            Yes, control improved
                        </Button>
                        <Button
                            onClick={() => {
                                // Still uncontrolled, proceed to biomarker assessment
                                navigateTo('SEVERE_ASTHMA_PHENOTYPE_STEP');
                            }}
                            variant="danger"
                            size="lg"
                        >
                            No, still uncontrolled
                        </Button>
                    </div>
                </div>
            )}
            
            {isReviewed && (
                 <div className="mt-6 p-5 bg-emerald-50 border-l-4 border-emerald-500 rounded-r-lg">
                    <h3 className="font-semibold text-emerald-800 text-lg flex items-center mb-2">
                        <CheckCircle2 size={22} className="mr-2"/>
                        Asthma Now Controlled
                    </h3>
                    <p className="text-sm text-emerald-700 leading-relaxed">
                        The patient's asthma is now controlled after addressing these contributing factors. This was 'difficult-to-treat' asthma, but it does not meet the criteria for 'severe' asthma. Continue to manage and monitor.
                    </p>
                     <div className="mt-6 text-right">
                        <Button
                            onClick={resetNavigation}
                            variant="success"
                            size="lg"
                            rightIcon={<RotateCcw />}
                        >
                            Finish & Restart Guide
                        </Button>
                    </div>
                </div>
            )}


            <div className="mt-8 flex justify-between items-center">
                <Button onClick={goBack} variant="secondary" leftIcon={<ArrowLeft />}>
                    Back
                </Button>
                {/* The "Next" button is conditional, handled by the review section above */}
            </div>
        </Card>
    );
};

export default DecisionTreeStep2;
