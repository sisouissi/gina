

import React from 'react';
import { useNavigation } from '../../../contexts/NavigationContext';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import { Route, ArrowLeft, RotateCcw, ListChecks, Pill, TrendingUp, Calendar, ShieldCheck } from 'lucide-react';

const DecisionTreeStep4: React.FC = () => {
    const { goBack, resetNavigation } = useNavigation();

    const AssessmentPoint: React.FC<{ icon: React.ReactElement; title: string; children: React.ReactNode; }> = ({ icon, title, children }) => {
        let clonedIcon = null;
        if (icon) {
            const existingClassName = (icon.props as any).className || '';
            let newClassName = 'mr-3 mt-1 text-sky-600 flex-shrink-0';
            if (existingClassName) newClassName += ' ' + existingClassName;

            const iconProps = {
                size: 22,
                className: newClassName,
            };
            clonedIcon = React.cloneElement(icon as React.ReactElement<any>, iconProps);
        }
        
        return (
            <div className="flex items-start p-3 bg-white rounded-md border border-slate-200">
                {clonedIcon}
                <div>
                    <h4 className="font-semibold text-slate-700">{title}</h4>
                    <p className="text-sm text-slate-600">{children}</p>
                </div>
            </div>
        );
    };

    return (
        <Card
            title="Severe Asthma Decision Tree: 5. Assess Response"
            icon={<Route className="text-red-600" />}
        >
            <p className="mb-6 text-sm text-slate-600">
                After initiating a biologic, a comprehensive assessment of the response is crucial to determine its effectiveness and guide future management (GINA 2025, Box 8-5).
            </p>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg mb-6">
                <h3 className="font-semibold text-slate-800 flex items-center mb-2">
                    <Calendar size={20} className="mr-2 text-sky-700"/>
                    When to Assess
                </h3>
                <p className="text-sm text-slate-600 pl-7">
                    A formal review should be conducted after at least <strong>4-6 months</strong> of treatment to allow sufficient time for a clinical response.
                </p>
            </div>
            
            <h3 className="text-md font-semibold text-slate-800 mb-3">Key Parameters to Review:</h3>
            <div className="space-y-3">
                <AssessmentPoint icon={<ShieldCheck />} title="Exacerbation Rate">
                    Has the frequency of severe exacerbations requiring oral corticosteroids decreased? This is a primary outcome.
                </AssessmentPoint>
                 <AssessmentPoint icon={<ListChecks />} title="Symptom Control">
                    Has there been a clinically significant improvement in symptom control scores (e.g., ACQ, ACT)?
                </AssessmentPoint>
                <AssessmentPoint icon={<TrendingUp />} title="Lung Function">
                    Has FEV1 improved? While desirable, it may not change significantly for all patients.
                </AssessmentPoint>
                <AssessmentPoint icon={<Pill />} title="Oral Corticosteroid (OCS) Dose">
                    For patients on maintenance OCS, has the dose been successfully reduced or stopped?
                </AssessmentPoint>
            </div>
            
             <div className="mt-6 p-4 bg-emerald-50 border-l-4 border-emerald-400 text-emerald-800 text-sm">
                <strong>Good Response:</strong> A significant improvement in the most important outcomes for the patient (e.g., stopping OCS, >50% reduction in exacerbations) indicates treatment should be continued. If response is partial or absent, reconsider the phenotype, check adherence, and consider switching to a different biologic.
            </div>

            <div className="mt-8 flex justify-between items-center">
                <Button onClick={goBack} variant="secondary" leftIcon={<ArrowLeft />}>
                    Back
                </Button>
                <Button onClick={resetNavigation} variant="success" rightIcon={<RotateCcw />}>
                    Finish & Restart
                </Button>
            </div>
        </Card>
    );
};

export default DecisionTreeStep4;