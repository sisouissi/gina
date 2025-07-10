
import React from 'react';
import { Droplets, ShieldCheck } from '../../../constants/icons';

const NonBiologicT2TreatmentContent: React.FC = () => {
    return (
        <div className="space-y-5">
            <p className="text-sm text-slate-600">
                For patients with evidence of Type 2 inflammation, there is a non-biologic option that may be considered in specific circumstances, particularly before initiating more costly biologic therapies.
            </p>

            <div className="p-4 bg-white rounded-lg border border-slate-200 shadow-sm">
                <h3 className="font-semibold text-slate-800 mb-2 flex items-center text-md">
                    <Droplets size={20} className="mr-2.5 text-teal-600" />
                    Sublingual Immunotherapy (SLIT) for House Dust Mite
                </h3>
                <div className="pl-[30px] space-y-2 text-slate-700 text-sm">
                    <p>For adults with allergic asthma sensitized to house dust mite (HDM) who have allergic rhinitis, consider a trial of HDM SLIT if:</p>
                     <ul className="list-disc list-inside mt-1">
                        <li>The FEV1 is greater than 70% predicted.</li>
                        <li>The patient is uncontrolled on low- to medium-dose ICS.</li>
                    </ul>
                    <p>This may reduce the risk of exacerbations, but the effect is modest compared to biologics.</p>
                     <p className="text-xs text-slate-500 mt-2">
                        It should only be initiated by a specialist and is not a replacement for standard controller medications.
                    </p>
                </div>
            </div>
            <div className="p-3 bg-slate-100 border-l-4 border-slate-400 text-slate-800 text-sm">
                <strong>Note:</strong> Allergen immunotherapy is generally not recommended for severe asthma due to the risk of anaphylaxis with subcutaneous routes and the limited evidence base for sublingual routes in this population compared to the proven efficacy of biologic therapies.
            </div>
            <p className="text-xs text-slate-500 text-center">Reference: GINA 2025 Report, p. 151</p>
        </div>
    );
};

export default NonBiologicT2TreatmentContent;
