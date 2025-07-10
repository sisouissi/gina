
import React, { useMemo, useState } from 'react';
import { useNavigation } from '../../../contexts/NavigationContext';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import { Route, ArrowRight, ArrowLeft, HelpCircle, Biohazard, RotateCcw } from 'lucide-react';

type Answer = 'yes' | 'no' | null;
type EosLevel = 'high' | 'low' | null;

interface Answers {
    isAllergic: Answer;
    isEosinophilic: Answer;
    eosLevel: EosLevel;
}

const getRecommendations = (answers: Answers) => {
    const { isAllergic, isEosinophilic, eosLevel } = answers;

    if (isAllergic === 'no' && isEosinophilic === 'no') {
        return { isT2Low: true, options: ["Anti-TSLP (has broad indications, but review for non-T2 options)"] };
    }

    const recommended = new Set<string>();
    if (isAllergic === 'yes') {
        recommended.add("Anti-IgE (Omalizumab, if eligible)");
        recommended.add("Anti-IL4R (Dupilumab)");
        recommended.add("Anti-TSLP (Tezepelumab)");
    }
    if (isEosinophilic === 'yes') {
        recommended.add("Anti-IL4R (Dupilumab)");
        recommended.add("Anti-TSLP (Tezepelumab)");
        if (eosLevel === 'high') {
            recommended.add("Anti-IL5/5R (Mepolizumab, Reslizumab, Benralizumab)");
        } else if (eosLevel === 'low') {
            recommended.add("Consider Anti-IL5/5R (some efficacy for levels 150-299)");
        }
    }
    return { isT2Low: false, options: Array.from(recommended) };
};

const DecisionTreeStep3: React.FC = () => {
    const { navigateTo, goBack } = useNavigation();
    const [answers, setAnswers] = useState<Answers>({
        isAllergic: null,
        isEosinophilic: null,
        eosLevel: null,
    });

    const recommendations = useMemo(() => getRecommendations(answers), [answers]);

    const showEosinophilicQuestion = answers.isAllergic !== null;
    const showEosLevelQuestion = answers.isEosinophilic === 'yes';
    const showResult = (showEosinophilicQuestion && answers.isEosinophilic !== null && !showEosLevelQuestion) || (showEosLevelQuestion && answers.eosLevel !== null);
    
    const isNextDisabled = !showResult;
    
    const handleReset = () => {
        setAnswers({ isAllergic: null, isEosinophilic: null, eosLevel: null });
    };

    return (
        <Card
            title="Severe Asthma Decision Tree: 4. Choosing a Biologic"
            icon={<Route className="text-red-600" />}
        >
            <p className="mb-6 text-sm text-slate-600">
                This interactive guide helps choose an add-on biologic for severe Type 2 asthma based on the inflammatory phenotype (GINA 2025, Box 8-4). Answer the questions to see the recommended options.
            </p>

            <div className="space-y-5">
                {/* Question 1: Allergic */}
                <div className="p-4 bg-white rounded-lg border border-slate-200 shadow-sm">
                    <p className="font-semibold text-slate-700 mb-3 text-md">Question 1: Is the asthma ALLERGIC? (clinically-relevant sensitization)</p>
                    <div className="flex space-x-2">
                        <Button onClick={() => setAnswers(prev => ({...prev, isAllergic: 'yes'}))} variant={answers.isAllergic === 'yes' ? 'success' : 'secondary'} fullWidth>Yes</Button>
                        <Button onClick={() => setAnswers(prev => ({...prev, isAllergic: 'no'}))} variant={answers.isAllergic === 'no' ? 'warning' : 'secondary'} fullWidth>No</Button>
                    </div>
                </div>

                {/* Question 2: Eosinophilic */}
                {showEosinophilicQuestion && (
                    <div className="p-4 bg-white rounded-lg border border-slate-200 shadow-sm animate-fade-in">
                        <p className="font-semibold text-slate-700 mb-3 text-md">Question 2: Is the asthma EOSINOPHILIC? (e.g., blood eos ≥150/µL)</p>
                        <div className="flex space-x-2">
                           <Button onClick={() => setAnswers(prev => ({...prev, isEosinophilic: 'yes'}))} variant={answers.isEosinophilic === 'yes' ? 'success' : 'secondary'} fullWidth>Yes</Button>
                           <Button onClick={() => setAnswers(prev => ({...prev, isEosinophilic: 'no', eosLevel: null}))} variant={answers.isEosinophilic === 'no' ? 'warning' : 'secondary'} fullWidth>No</Button>
                        </div>
                    </div>
                )}
                
                 {/* Question 3: Eosinophil Level */}
                {showEosLevelQuestion && (
                    <div className="p-4 bg-white rounded-lg border border-slate-200 shadow-sm animate-fade-in">
                       <p className="font-semibold text-slate-700 mb-3 text-md">Question 3: If eosinophilic, is the blood eosinophil level high?</p>
                       <div className="flex space-x-2">
                           <Button onClick={() => setAnswers(prev => ({...prev, eosLevel: 'high'}))} variant={answers.eosLevel === 'high' ? 'success' : 'secondary'} fullWidth>≥ 300 cells/μL</Button>
                           <Button onClick={() => setAnswers(prev => ({...prev, eosLevel: 'low'}))} variant={answers.eosLevel === 'low' ? 'success' : 'secondary'} fullWidth>150-299 cells/μL</Button>
                       </div>
                   </div>
                )}

                {/* Results */}
                {showResult && (
                    <div className="mt-4 animate-fade-in pt-4 border-t border-slate-200">
                        {recommendations.isT2Low ? (
                            <div className="p-4 bg-amber-50 border-l-4 border-amber-400 text-amber-800">
                                <h4 className="font-semibold">Potentially T2-Low Phenotype</h4>
                                <p className="text-sm mt-1">
                                    Based on these answers, there is no clear evidence of allergic or eosinophilic drivers. Biologics may have limited effect.
                                </p>
                                <ul className="list-disc list-inside mt-2 pl-4 space-y-1 text-sm">
                                   {recommendations.options.map(opt => <li key={opt}>{opt}</li>)}
                                </ul>
                            </div>
                        ) : (
                            <div className="p-4 bg-emerald-50 border-l-4 border-emerald-400 text-emerald-800">
                                <h4 className="font-semibold flex items-center"><Biohazard size={18} className="mr-2"/>Recommended Biologic Classes</h4>
                                <p className="text-sm mt-2">Based on the phenotype(s), consider the following options:</p>
                                <ul className="list-disc list-inside mt-2 pl-4 space-y-1 text-sm">
                                    {recommendations.options.length > 0 ? recommendations.options.map(opt => <li key={opt}>{opt}</li>) : <li>No specific recommendation based on this combination.</li>}
                                </ul>
                            </div>
                        )}
                         <Button onClick={handleReset} variant="ghost" size="sm" className="mt-3" leftIcon={<RotateCcw size={14} />}>
                            Reset Algorithm
                        </Button>
                    </div>
                )}
            </div>

            <div className="mt-6 p-3 bg-slate-100 border border-slate-200 rounded-lg text-sm">
                <div className="flex items-start">
                  <HelpCircle size={20} className="mr-3 mt-0.5 flex-shrink-0 text-slate-500" />
                  <div>
                    <p className="font-semibold text-slate-700">Final Choice Considerations:</p>
                    <ul className="list-disc list-inside mt-1 text-slate-600 space-y-1">
                        <li>Patient comorbidities (e.g., atopic dermatitis, CRSwNP).</li>
                        <li>Dosing frequency and route of administration.</li>
                        <li>Local availability, eligibility criteria, and cost.</li>
                    </ul>
                  </div>
                </div>
            </div>

            <div className="mt-8 flex justify-between items-center">
                <Button onClick={goBack} variant="secondary" leftIcon={<ArrowLeft />}>
                    Back
                </Button>
                <Button onClick={() => navigateTo('SEVERE_ASTHMA_DECISION_TREE_STEP_4')} rightIcon={<ArrowRight />} disabled={isNextDisabled}>
                    Next: Assess Response
                </Button>
            </div>
        </Card>
    );
};

export default DecisionTreeStep3;
