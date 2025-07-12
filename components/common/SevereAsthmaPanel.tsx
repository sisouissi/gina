
import React from 'react';
import { useNavigation } from '../../contexts/NavigationContext';
import { useUIState } from '../../contexts/UIStateContext';
import Button from '../ui/Button';
import { Route, FlaskConical, TestTubeDiagonal, Beaker, Biohazard } from 'lucide-react';
import NonT2TreatmentContent from './modal_content/NonT2TreatmentContent';
import NonBiologicT2TreatmentContent from './modal_content/NonBiologicT2TreatmentContent';


const SevereAsthmaPanel: React.FC = () => {
    const { navigateTo } = useNavigation();
    const { openInfoModal } = useUIState();

    return (
        <div>
            <h2 className="text-lg font-semibold mb-5 text-slate-700">Severe Asthma Options:</h2>
            <div className="space-y-3">
                <Button
                    onClick={() => navigateTo('SEVERE_ASTHMA_STAGE_1')}
                    leftIcon={<Route />}
                    variant="primary"
                    className="w-full justify-start !py-2.5"
                    aria-label="Launch the Severe Asthma Pathway"
                >
                    Severe Asthma Pathway
                </Button>
                <Button
                    onClick={() => openInfoModal("Other Treatments (Non-Type 2)", <NonT2TreatmentContent />)}
                    leftIcon={<TestTubeDiagonal />}
                    variant="secondary"
                    className="w-full justify-start !py-2.5"
                    aria-label="View other treatments if no evidence of Type 2 inflammation"
                >
                    Other Treatments (non-Type 2)
                </Button>
                 <Button
                    onClick={() => openInfoModal("Non-Biologic Options (Type 2)", <NonBiologicT2TreatmentContent />)}
                    leftIcon={<Beaker />}
                    variant="secondary"
                    className="w-full justify-start !py-2.5"
                    aria-label="View non-biologic options in Type 2 inflammation"
                >
                    Non-biologic options (Type 2)
                </Button>
                 <Button
                    onClick={() => navigateTo('SEVERE_ASTHMA_STAGE_8')}
                    leftIcon={<Biohazard />}
                    variant="secondary"
                    className="w-full justify-start !py-2.5"
                    aria-label="Guide to select Type 2-targeted biologic therapy"
                >
                    Biologic Therapy Guide
                </Button>
            </div>
        </div>
    );
};

export default SevereAsthmaPanel;
