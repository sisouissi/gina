
import React, { useState, useMemo } from 'react';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import { useNavigation } from '../../../contexts/NavigationContext';
import { Biohazard, Check, HelpCircle, Pill, RotateCcw } from 'lucide-react';

type PhenotypeKey = 'allergic' | 'eosinophilic' | 'feno' | 'none';
type Answer = 'yes' | 'no' | null;

const BiologicSelectionStep: React.FC = () => {
    const { resetNavigation } = useNavigation();
    const [answers, setAnswers] = useState<{ [key in PhenotypeKey]?: Answer }>({});

    const handleAnswer = (key: PhenotypeKey, answer: Answer) => {
        setAnswers(prev => ({ ...prev, [key]: answer }));
    };

    const biologics = {
        'Anti-IgE (Omalizumab)': ['allergic'],
        'Anti-IL5/5R (Mepo/Resli/Benra)': ['eosinophilic'],
        'Anti-IL4R (Dupilumab)': ['eosinophilic', 'feno', 'allergic'],
        'Anti-TSLP (Tezepelumab)': ['allergic', 'eosinophilic', 'feno', 'none'], // Broad indication
    };

    const recommendations = useMemo(() => {
        const phenotype: PhenotypeKey[] = [];
        if (answers.allergic === 'yes') phenotype.push('allergic');
        if (answers.eosinophilic === 'yes') phenotype.push('eosinophilic');
        if (answers.feno === 'yes') phenotype.push('feno');
        if (answers.allergic === 'no' && answers.eosinophilic === 'no' && answers.feno === 'no') {
            phenotype.push('none');
        }

        if (phenotype.length === 0) return [];
        
        return Object.entries(biologics).filter(([name, targets]) => {
           // Special case for Anti-TSLP with 'none'
            if (phenotype.includes('none') && targets.includes('none')) return true;
            // A biologic is recommended if it targets at least one of the patient's phenotypes
            return targets.some(target => phenotype.includes(target as PhenotypeKey));
        }).map(([name]) => name);
    }, [answers]);
    
    const Question: React.FC<{ qKey: PhenotypeKey; text: string; }> = ({ qKey, text }) => (
        <div className="p-4 border border-slate-200 rounded-lg bg-white shadow-sm">
            <p className="font-medium text-slate-700 mb-3 text-sm">{text}</p>
            <div className="flex space-x-2">
                <Button onClick={() => handleAnswer(qKey, 'yes')} variant={answers[qKey] === 'yes' ? 'success' : 'secondary'} size="md" fullWidth>Yes</Button>
                <Button onClick={() => handleAnswer(qKey, 'no')} variant={answers[qKey] === 'no' ? 'warning' : 'secondary'} size="md" fullWidth>No</Button>
            </div>
        </div>
    );

    return (
        <Card
            title="Biologic Selection Guide"
            icon={<Biohazard className="text-red-600" />}
        >
            <p className="mb-6 text-sm text-slate-600">
                This guide helps select a Type 2-targeted biologic based on key inflammatory drivers. The final choice also depends on local availability, cost, and patient preference.
            </p>

            <div className="space-y-4">
                <Question qKey="allergic" text="Is the asthma ALLERGIC? (i.e., symptoms linked to perennial allergen exposure + sensitization)" />
                <Question qKey="eosinophilic" text="Is the asthma EOSINOPHILIC? (e.g., blood eosinophils ≥150-300 cells/µL)" />
                <Question qKey="feno" text="Is FeNO elevated? (e.g., ≥20-25 ppb)" />
            </div>

            {recommendations.length > 0 && (
                <div className="mt-8 p-4 bg-sky-50 border border-sky-200 rounded-lg">
                    <h3 className="font-semibold text-sky-800 text-md mb-3 flex items-center">
                        <Pill size={20} className="mr-2"/>
                        Recommended Biologic Classes to Consider
                    </h3>
                    <ul className="space-y-2">
                        {recommendations.map(name => (
                             <li key={name} className="flex items-center text-sm text-sky-700">
                                <Check size={16} className="mr-2 text-emerald-600 flex-shrink-0" />
                                {name}
                            </li>
                        ))}
                    </ul>
                     <p className="text-xs text-slate-500 mt-4">
                        Refer to GINA Box 8-4 for detailed criteria and head-to-head evidence where available. Comorbidities (e.g., atopic dermatitis, CRSwNP) can also guide choice.
                    </p>
                </div>
            )}
             <div className="mt-8 text-center">
                <Button
                    onClick={resetNavigation}
                    variant="secondary"
                    leftIcon={<RotateCcw />}
                >
                    Return to Home
                </Button>
            </div>
        </Card>
    );
};

export default BiologicSelectionStep;
