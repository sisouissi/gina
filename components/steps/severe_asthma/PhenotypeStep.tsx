

import React, { useState } from 'react';
import { useNavigation } from '../../../contexts/NavigationContext';
import { useUIState } from '../../../contexts/UIStateContext';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import { Route, ArrowRight, ArrowLeft, Droplets, Activity, TestTubeDiagonal, User, CheckSquare, Square, CheckCircle2, AlertTriangle, RotateCcw } from 'lucide-react';
import NonT2TreatmentContent from '../../common/modal_content/NonT2TreatmentContent';

type Stage = 'initial' | 't2_high_question' | 't2_low_result';

const biomarkerCriteria = [
    { id: 'eos', label: 'Blood eosinophils ≥150/μL', icon: <Droplets className="text-red-500" /> },
    { id: 'feno', label: 'FeNO ≥20 ppb', icon: <Activity className="text-sky-500" /> },
    { id: 'sputum', label: 'Sputum eosinophils ≥2%', icon: <TestTubeDiagonal className="text-emerald-500" /> },
    { id: 'allergic', label: 'Asthma is clinically allergen-driven', icon: <User className="text-teal-500" /> },
];

const ChecklistItem: React.FC<{ item: typeof biomarkerCriteria[0], isChecked: boolean, onToggle: (id: string) => void }> = ({ item, isChecked, onToggle }) => {
    let clonedIcon = null;
    if (item.icon) {
        const existingClassName = (item.icon.props as any).className || '';
        let newClassName = 'mr-3';
        if (existingClassName) newClassName += ' ' + existingClassName;

        const iconProps = {
            size: 20,
            className: newClassName,
        };
        clonedIcon = React.cloneElement(item.icon as React.ReactElement<any>, iconProps);
    }
    
    return (
        <div
            onClick={() => onToggle(item.id)}
            role="checkbox"
            aria-checked={isChecked}
            className={`flex items-start p-3 rounded-lg cursor-pointer transition-all duration-200 border ${
                isChecked
                ? 'bg-sky-50 border-sky-400'
                : 'bg-white border-slate-300 hover:bg-slate-50'
            }`}
        >
            {isChecked ? <CheckSquare size={20} className="text-sky-600 mr-3 mt-0.5 flex-shrink-0" /> : <Square size={20} className="text-slate-400 mr-3 mt-0.5 flex-shrink-0" />}
            <div className="flex items-center">
                {clonedIcon}
                <span className={`text-sm ${isChecked ? 'font-semibold text-slate-800' : 'text-slate-700'}`}>{item.label}</span>
            </div>
        </div>
    );
};


const PhenotypeStep: React.FC = () => {
    const { navigateTo, goBack } = useNavigation();
    const { openInfoModal } = useUIState();
    const [stage, setStage] = useState<Stage>('initial');
    const [checkedItems, setCheckedItems] = useState<string[]>([]);

    const handleToggleCheck = (id: string) => {
        setCheckedItems(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };

    const handleConfirmAssessment = () => {
        if (checkedItems.length > 0) {
            setStage('t2_high_question');
        } else {
            setStage('t2_low_result');
        }
    };

    const renderInitialStage = () => (
        <>
            <p className="mb-6 text-sm text-slate-600">
                Assess for evidence of Type 2 inflammation to determine eligibility for biologic therapies. Check all criteria that apply to the patient (GINA 2025, Box 8-3).
            </p>
            <div className="space-y-3">
                {biomarkerCriteria.map(item => (
                   <ChecklistItem
                        key={item.id}
                        item={item}
                        isChecked={checkedItems.includes(item.id)}
                        onToggle={handleToggleCheck}
                    />
                ))}
            </div>
            <div className="mt-8">
                <Button
                    onClick={handleConfirmAssessment}
                    size="lg"
                    fullWidth
                    rightIcon={<ArrowRight />}
                    aria-label="Confirm Assessment"
                >
                    Confirm Assessment
                </Button>
            </div>
        </>
    );

    const renderT2HighQuestionStage = () => (
        <div className="p-4 bg-emerald-50 border-l-4 border-emerald-500 rounded-r-lg">
            <h3 className="font-semibold text-emerald-800 text-lg flex items-center mb-2">
                <CheckCircle2 size={22} className="mr-2"/>
                Severe Type 2 Inflammation Confirmed
            </h3>
            <p className="text-sm text-emerald-700 leading-relaxed mb-4">
                The patient shows evidence of Type 2 inflammation. A Type 2-targeted biologic therapy is indicated.
            </p>
            <div className="p-4 bg-white rounded-lg border border-slate-200 shadow-sm">
                <p className="font-semibold text-slate-700 mb-3 text-md">Is a suitable biologic available and affordable?</p>
                <div className="flex space-x-3">
                    <Button onClick={() => navigateTo('SEVERE_ASTHMA_DECISION_TREE_STEP_3')} variant="success" size="lg" fullWidth>Yes</Button>
                    <Button onClick={() => navigateTo('SEVERE_ASTHMA_DECISION_TREE_STEP_4')} variant="warning" size="lg" fullWidth>No</Button>
                </div>
                 <p className="text-xs text-slate-500 text-center mt-2">
                    If 'No', you will be directed to the 'Assess Response' section, which details ongoing management optimization as per Box 8-5.
                </p>
            </div>
        </div>
    );

    const renderT2LowResultStage = () => (
        <div className="p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-lg">
            <h3 className="font-semibold text-amber-800 text-lg flex items-center mb-2">
                <AlertTriangle size={22} className="mr-2"/>
                Severe T2-Low Asthma
            </h3>
            <p className="text-sm text-amber-700 leading-relaxed mb-4">
                No biomarkers for Type 2 inflammation were identified. T2-targeted biologics are unlikely to be effective. Continue to optimize management and consider other treatment options for non-Type 2 asthma.
            </p>
            <div className="flex space-x-3">
                <Button onClick={() => openInfoModal("Other Treatments (Non-Type 2)", <NonT2TreatmentContent />)} variant="secondary" size="lg">
                    View Non-Type 2 Options
                </Button>
                 <Button onClick={() => navigateTo('INITIAL_STEP')} variant="primary" size="lg" rightIcon={<RotateCcw />}>
                    Finish & Restart
                </Button>
            </div>
        </div>
    );

    return (
        <Card
            title="Severe Asthma Decision Tree: 3. Assess Inflammation Type"
            icon={<Route className="text-red-600" />}
        >
            {stage === 'initial' && renderInitialStage()}
            {stage === 't2_high_question' && renderT2HighQuestionStage()}
            {stage === 't2_low_result' && renderT2LowResultStage()}

            <div className="mt-8">
                <Button onClick={goBack} variant="secondary" leftIcon={<ArrowLeft />}>
                    Back
                </Button>
            </div>
        </Card>
    );
};

export default PhenotypeStep;