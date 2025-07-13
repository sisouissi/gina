
import React from 'react';
import { useNavigation } from '../../../contexts/NavigationContext';
import { StepId } from '../../../types';
import { ChevronDown, ChevronUp, ArrowLeft, ArrowRight } from 'lucide-react';
import Button from '../../ui/Button';

import Stage1 from './Stage1_PatientAssessment';
import Stage2 from './Stage2_RiskFactors';
import Stage3 from './Stage3_OptimizeManagement';
import Stage4 from './Stage4_ReviewResponse';
import Stage5 from './Stage5_SpecialistAssessment';
import Stage6 from './Stage6_PhenotypeAssessment';
import Stage7 from './Stage7_TreatmentOptions';
import Stage8 from './Stage8_BiologicTherapy';
import Stage9 from './Stage9_MonitorResponse';
import Stage10 from './Stage10_OngoingCare';
import Stage11 from './Stage11_SummaryReport';

const stages = [
    { id: 1, stepId: 'SEVERE_ASTHMA_STAGE_1', title: "Patient Assessment", color: "bg-green-500" },
    { id: 2, stepId: 'SEVERE_ASTHMA_STAGE_2', title: "Risk Factors", color: "bg-green-500" },
    { id: 3, stepId: 'SEVERE_ASTHMA_STAGE_3', title: "Optimize Management", color: "bg-green-500" },
    { id: 4, stepId: 'SEVERE_ASTHMA_STAGE_4', title: "Review Response", color: "bg-green-500" },
    { id: 5, stepId: 'SEVERE_ASTHMA_STAGE_5', title: "Specialist Assessment", color: "bg-blue-500" },
    { id: 6, stepId: 'SEVERE_ASTHMA_STAGE_6', title: "Phenotype Assessment", color: "bg-blue-500" },
    { id: 7, stepId: 'SEVERE_ASTHMA_STAGE_7', title: "Treatment Options", color: "bg-blue-500" },
    { id: 8, stepId: 'SEVERE_ASTHMA_STAGE_8', title: "Biologic Therapy", color: "bg-blue-500" },
    { id: 9, stepId: 'SEVERE_ASTHMA_STAGE_9', title: "Monitor Response", color: "bg-amber-600" },
    { id: 10, stepId: 'SEVERE_ASTHMA_STAGE_10', title: "Ongoing Care", color: "bg-amber-600" },
    { id: 11, stepId: 'SEVERE_ASTHMA_STAGE_11', title: "Summary Report", color: "bg-slate-600" }
];

const StageHeader: React.FC<{ stage: any, isActive: boolean, onClick: () => void }> = ({ stage, isActive, onClick }) => (
    <div 
      className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
        isActive ? `${stage.color} text-white shadow-lg` : 'bg-gray-100 hover:bg-gray-200'
      }`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <span className="font-semibold text-sm">Stage {stage.id}: {stage.title}</span>
        {isActive ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </div>
    </div>
);

const SevereAsthmaPathway: React.FC = () => {
    const { currentStepId, navigateTo } = useNavigation();
    
    const activeStage = stages.find(s => s.stepId === currentStepId);
    const activeStageId = activeStage ? activeStage.id : 1;
    const stagesWithInternalNav = [1, 2, 3, 4, 5, 7, 8];

    const handleStageClick = (stepId: StepId) => {
        navigateTo(stepId);
    };

    const handlePreviousStage = () => {
        if (activeStageId > 1) {
            const prevStage = stages.find(s => s.id === activeStageId - 1);
            if (prevStage) navigateTo(prevStage.stepId as StepId);
        }
    };
    
    const handleNextStage = () => {
        if (activeStageId < stages.length) {
             const nextStage = stages.find(s => s.id === activeStageId + 1);
             if (nextStage) navigateTo(nextStage.stepId as StepId);
        }
    };
    
    const renderCurrentStage = () => {
        switch(currentStepId) {
            case 'SEVERE_ASTHMA_STAGE_1': return <Stage1 />;
            case 'SEVERE_ASTHMA_STAGE_2': return <Stage2 />;
            case 'SEVERE_ASTHMA_STAGE_3': return <Stage3 />;
            case 'SEVERE_ASTHMA_STAGE_4': return <Stage4 />;
            case 'SEVERE_ASTHMA_STAGE_5': return <Stage5 />;
            case 'SEVERE_ASTHMA_STAGE_6': return <Stage6 />;
            case 'SEVERE_ASTHMA_STAGE_7': return <Stage7 />;
            case 'SEVERE_ASTHMA_STAGE_8': return <Stage8 />;
            case 'SEVERE_ASTHMA_STAGE_9': return <Stage9 />;
            case 'SEVERE_ASTHMA_STAGE_10': return <Stage10 />;
            case 'SEVERE_ASTHMA_STAGE_11': return <Stage11 />;
            default: return <Stage1 />;
        }
    };

    return (
        <div className="max-w-7xl mx-auto">
            <header className="bg-white rounded-lg shadow-md p-6 mb-6 text-center">
                <h1 className="text-3xl font-bold text-red-800 mb-2">Severe Asthma Management System</h1>
                <p className="text-gray-600">A GINA-based clinical decision support tool for difficult-to-treat and severe asthma</p>
            </header>

            <div className="flex flex-col lg:flex-row gap-6">
                <div className="w-full lg:w-80 flex-shrink-0">
                    <div className="bg-white rounded-lg shadow-md p-4 sticky top-6">
                        <h2 className="text-lg font-semibold mb-4 text-center">Management Stages</h2>
                        <div className="space-y-2">
                            {stages.map((stage) => (
                                <StageHeader
                                key={stage.id}
                                stage={stage}
                                isActive={activeStageId === stage.id}
                                onClick={() => handleStageClick(stage.stepId as StepId)}
                                />
                            ))}
                        </div>
            
                        <div className="flex flex-col gap-3 mt-6 pt-4 border-t">
                        <Button
                            onClick={handlePreviousStage}
                            disabled={activeStageId === 1}
                            variant="secondary"
                            fullWidth
                            leftIcon={<ArrowLeft/>}
                        >
                            Previous Stage
                        </Button>
                        <Button
                            onClick={handleNextStage}
                            disabled={activeStageId >= stages.length || stagesWithInternalNav.includes(activeStageId)}
                            variant="primary"
                            fullWidth
                            rightIcon={<ArrowRight/>}
                        >
                            Next Stage
                        </Button>
                        </div>
                    </div>
                </div>

                <div className="flex-1 min-w-0">
                    <div className="bg-white rounded-lg shadow-xl p-4 sm:p-6 md:p-8">
                        {renderCurrentStage()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SevereAsthmaPathway;
