
import React from 'react';
import { useNavigation } from '../../contexts/NavigationContext';
import { useUIState } from '../../contexts/UIStateContext';
import Button from '../ui/Button';
import { Route, FileText, Activity, AlertTriangle, ShieldAlert, ShieldCheck, TrendingDown } from 'lucide-react';
import Box12Content from './modal_content/Box12Content';
import Box13Content from './modal_content/Box13Content';
import Box14Content from './modal_content/Box14Content';
import Box15Content from './modal_content/Box15Content';
import BiomarkersContent from './modal_content/BiomarkersContent';

const DiagnosisPanel: React.FC = () => {
    const { navigateTo } = useNavigation();
    const { openInfoModal } = useUIState();

    return (
        <div>
            <h2 className="text-lg font-semibold mb-5 text-slate-700">Diagnosis Options:</h2>
            <div className="space-y-3">
                <Button
                    onClick={() => navigateTo('INITIAL_DIAGNOSIS_FLOWCHART_STEP')}
                    leftIcon={<Route />}
                    variant="primary"
                    className="w-full justify-start !py-2.5"
                    aria-label="Making the initial diagnosis (Flowchart)"
                >
                    Making the initial diagnosis
                </Button>
                <Button
                    onClick={() => openInfoModal("Criteria for Initial Diagnosis (Box 1-2)", <Box12Content />)}
                    leftIcon={<FileText />}
                    variant="secondary"
                    className="w-full justify-start !py-2.5"
                    aria-label="View criteria for initial diagnosis"
                >
                    Criteria for initial diagnosis
                </Button>
                <Button
                    onClick={() => openInfoModal("Patient Already on ICS Treatment (Box 1-4)", <Box14Content />)}
                    leftIcon={<ShieldAlert />}
                    variant="secondary"
                    className="w-full justify-start !py-2.5"
                    aria-label="View guidance for patient already taking ICS-containing treatment"
                >
                    Patient on ICS Treatment
                </Button>
                <Button
                    onClick={() => openInfoModal("Confirming the Diagnosis (Box 1-5)", <Box15Content />)}
                    leftIcon={<ShieldCheck />}
                    variant="secondary"
                    className="w-full justify-start !py-2.5"
                    aria-label="View step-wise approach to confirming the diagnosis"
                >
                    Confirming the diagnosis
                </Button>
                <Button
                    onClick={() => navigateTo('STEP_DOWN_ASSESS_STEP')}
                    leftIcon={<TrendingDown />}
                    variant="secondary"
                    className="w-full justify-start !py-2.5"
                    aria-label="View guide on how to step down ICS-containing treatment"
                >
                    How to step down ICS containing Treatment
                </Button>
                <Button
                    onClick={() => openInfoModal("Role of Type 2 Biomarkers", <BiomarkersContent />)}
                    leftIcon={<Activity />}
                    variant="secondary"
                    className="w-full justify-start !py-2.5"
                    aria-label="View role of Type 2 biomarkers"
                >
                    Role of Type 2 Biomarkers
                </Button>
                <Button
                    onClick={() => openInfoModal("Differential Diagnosis of Asthma (GINA 2025, Box 1-3)", <Box13Content />)}
                    leftIcon={<AlertTriangle />}
                    variant="secondary"
                    className="w-full justify-start !py-2.5"
                    aria-label="View differential diagnosis"
                >
                    Differential diagnosis
                </Button>
            </div>
        </div>
    );
};

export default DiagnosisPanel;
