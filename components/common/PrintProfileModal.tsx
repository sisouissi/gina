

import React from 'react';
import { useUIState } from '../../contexts/UIStateContext';
import { usePatientData } from '../../contexts/PatientDataContext';
import Button from '../ui/Button';
import { XCircle, Printer, User, AlertTriangle, Route, ClipboardList } from '../../constants/icons';
import { adultRiskFactorsList, childRiskFactorsList, youngChildRiskFactorsList } from '../../constants/riskFactorData';
import { adultTreatments, childTreatments, youngChildTreatments } from '../../constants/treatmentData';
import { TreatmentDetail, ControlAnswers } from '../../types';

const controlQuestionLabels: Record<keyof ControlAnswers, string> = {
    daytimeSymptoms: 'Daytime symptoms >2x/week?',
    nocturnalSymptoms: 'Any night waking?',
    relieverNeed: 'Reliever need >2x/week?',
    activityLimitation: 'Any activity limitation?',
};

const SummarySection: React.FC<{ title: string; icon: React.ReactElement; children: React.ReactNode }> = ({ title, icon, children }) => (
    <div className="py-4 border-b border-slate-200 last:border-b-0">
        <h3 className="font-semibold text-slate-800 mb-3 flex items-center text-lg">
            {React.cloneElement(icon as React.ReactElement<any>, { size: 22, className: "mr-3 text-slate-500"})}
            {title}
        </h3>
        <div className="pl-10 space-y-2 text-sm text-slate-700">
            {children}
        </div>
    </div>
);

const SummaryItem: React.FC<{ label: string; value: string | number | boolean | null | undefined }> = ({ label, value }) => {
    let displayValue: React.ReactNode;
    if (typeof value === 'boolean') {
        displayValue = value ? 'Yes' : 'No';
    } else if (value === null || value === undefined || value === '') {
        displayValue = <span className="text-slate-400 italic">Not specified</span>;
    } else {
        displayValue = String(value);
    }
    
    return (
        <div className="flex justify-between items-start py-1">
            <span className="font-medium text-slate-600 mr-4">{label}:</span>
            <span className="text-right font-semibold text-slate-800">{displayValue}</span>
        </div>
    );
};

const ListSummary: React.FC<{ label: string; items: string[] }> = ({ label, items }) => (
    <div>
        <span className="font-medium text-slate-600">{label}:</span>
        {items.length > 0 ? (
            <ul className="list-disc list-inside mt-1 pl-2">
                {items.map(item => <li key={item} className="text-slate-800 font-semibold">{item}</li>)}
            </ul>
        ) : (
            <span className="text-slate-400 italic ml-2">None specified</span>
        )}
    </div>
);

const PrintProfileModal: React.FC = () => {
    const { isPrintProfileModalOpen, closePrintProfileModal } = useUIState();
    const { patientData } = usePatientData();

    if (!isPrintProfileModalOpen) {
        return null;
    }
    
    const { ageGroup } = patientData;
    
    const renderContent = () => {
        if (!ageGroup) {
            return <p className="text-center text-slate-500 p-8">Please select an age group from the home screen to generate a profile.</p>
        }
        
        // Data extraction and mapping
        const riskFactorIds = patientData[`${ageGroup}_riskFactors`] || [];
        let sourceList: { id: string, label: string }[] = [];
        switch (ageGroup) {
            case 'adult': sourceList = adultRiskFactorsList; break;
            case 'child': sourceList = childRiskFactorsList; break;
            case 'youngChild': sourceList = youngChildRiskFactorsList; break;
        }
        
        const riskFactorLabels = riskFactorIds.map(id => {
            const factor = sourceList.find(f => f.id === id);
            return factor ? factor.label : id; // Fallback to id if not found
        });

        const ginaStep = patientData[`${ageGroup}_currentGinaStep`];
        const controlLevel = patientData[`${ageGroup}_controlLevel`];
        const controlAnswers = patientData[`${ageGroup}_controlAssessmentAnswers`];
        const pathway = patientData[`${ageGroup}_pathway` as const] || patientData.youngChild_symptomPattern;
        const pathwayLabel = ageGroup === 'adult' ? 'Pathway' : ageGroup === 'child' ? 'Track' : 'Symptom Pattern';
        const pathwayValue = ageGroup === 'adult' 
            ? (pathway === 'pathway1' ? '1 (ICS-formoterol reliever)' : '2 (SABA reliever)')
            : ageGroup === 'child' 
            ? (pathway === 'track1' ? '1 (MART)' : '2 (Classic SABA)')
            : (pathway === 'infrequentViralWheeze' ? 'Infrequent Viral Wheeze' : 'Frequent Wheeze / Persistent Asthma');

        let treatmentDetails: TreatmentDetail | undefined;
        if (ageGroup === 'adult') {
            const { adult_pathway, adult_currentGinaStep } = patientData;
            if (adult_pathway && adult_currentGinaStep) {
                treatmentDetails = adultTreatments[adult_pathway]?.[adult_currentGinaStep];
            }
        } else if (ageGroup === 'child') {
            const { child_pathway, child_currentGinaStep } = patientData;
            if (child_pathway && child_currentGinaStep) {
                treatmentDetails = childTreatments[child_pathway]?.[child_currentGinaStep];
            }
        } else if (ageGroup === 'youngChild') {
            const { youngChild_currentGinaStep, youngChild_currentTreatmentStrategy } = patientData;
            if (youngChild_currentGinaStep && youngChild_currentTreatmentStrategy) {
                const stepDetails = youngChildTreatments[youngChild_currentGinaStep];
                if (stepDetails) {
                    if (youngChild_currentTreatmentStrategy === 'preferred') {
                        treatmentDetails = stepDetails.preferred;
                    } else {
                        treatmentDetails = stepDetails.alternatives?.find(alt => alt.id === youngChild_currentTreatmentStrategy);
                    }
                }
            }
        }


        return (
            <div id="print-profile-content" className="p-6 space-y-1">
                <SummarySection title="Patient Demographics" icon={<User />}>
                    <SummaryItem label="Age Group" value={patientData.age || undefined} />
                    <SummaryItem label="Diagnosis Confirmed" value={patientData.diagnosisConfirmed} />
                </SummarySection>

                <SummarySection title="Risk Factor Assessment" icon={<AlertTriangle />}>
                    <ListSummary label="Identified Risk Factors" items={riskFactorLabels} />
                </SummarySection>

                <SummarySection title="Control Level" icon={<ClipboardList />}>
                    <SummaryItem label="Most Recent Assessment" value={controlLevel ? controlLevel.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()) : 'Not Assessed'} />
                    {controlAnswers && (
                        <div className="mt-3 pt-3 border-t border-slate-200">
                            <h4 className="font-medium text-slate-600 mb-2">Detailed Assessment:</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                                {Object.entries(controlQuestionLabels).map(([key, label]) => (
                                    <div key={key} className="flex justify-between items-center p-2 bg-slate-100 rounded">
                                        <span className="text-slate-500">{label}</span>
                                        <span className={`font-bold ${controlAnswers[key as keyof ControlAnswers] ? 'text-red-600' : 'text-emerald-600'}`}>
                                            {controlAnswers[key as keyof ControlAnswers] === null ? 'N/A' : (controlAnswers[key as keyof ControlAnswers] ? 'Yes' : 'No')}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </SummarySection>


                <SummarySection title="Current Treatment Plan" icon={<Route />}>
                    <SummaryItem label="GINA Step" value={ginaStep || 'Not Determined'} />
                    <SummaryItem label={pathwayLabel} value={pathway ? pathwayValue : 'Not Determined'} />
                    {ageGroup === 'youngChild' && <SummaryItem label="Treatment Strategy" value={patientData.youngChild_currentTreatmentStrategy || 'Not set'} />}
                
                    {treatmentDetails && (
                        <div className="mt-3 pt-3 border-t border-slate-200 space-y-3">
                            {treatmentDetails.controller && (
                                <div>
                                    <span className="font-medium text-slate-600">Controller:</span>
                                    <p className="text-slate-800 font-semibold pl-2">{treatmentDetails.controller}</p>
                                </div>
                            )}
                            {treatmentDetails.reliever && (
                                <div>
                                    <span className="font-medium text-slate-600">Reliever:</span>
                                    <p className="text-slate-800 font-semibold pl-2">{treatmentDetails.reliever}</p>
                                </div>
                            )}
                            {treatmentDetails.additional && (
                                <div>
                                    <ListSummary label="Additional Options" items={Array.isArray(treatmentDetails.additional) ? treatmentDetails.additional : [treatmentDetails.additional]} />
                                </div>
                            )}
                        </div>
                    )}
                </SummarySection>
            </div>
        )
    };
    
    const handlePrint = () => {
        const printContent = document.getElementById('print-profile-content')?.innerHTML;
        
        if (printContent) {
            const printWindow = window.open('', '_blank', 'height=800,width=800');
            if (printWindow) {
                printWindow.document.write(`
                    <html>
                        <head>
                            <title>Clinical Profile Report</title>
                            <script src="https://cdn.tailwindcss.com"></script>
                            <style>
                                body { 
                                    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif; 
                                    padding: 1rem; 
                                }
                                @media print {
                                    body {
                                        -webkit-print-color-adjust: exact;
                                        print-color-adjust: exact;
                                    }
                                }
                            </style>
                        </head>
                        <body>
                            <h1 class="text-2xl font-bold mb-4 border-b pb-2">Asthma Clinical Profile Report</h1>
                            ${printContent}
                        </body>
                    </html>
                `);
                printWindow.document.close();
                printWindow.onload = () => { // Ensure styles are loaded
                    printWindow.focus();
                    printWindow.print();
                    printWindow.close();
                };
            }
        }
    };

    return (
        <div 
          className="fixed inset-0 bg-black bg-opacity-60 z-40 flex items-center justify-center p-4 transition-opacity duration-300"
          onClick={closePrintProfileModal}
          aria-modal="true"
          role="dialog"
        >
            <div 
                className="w-full max-w-2xl bg-slate-50 shadow-2xl rounded-lg z-50 flex flex-col transform transition-all duration-300 max-h-[90vh]"
                onClick={e => e.stopPropagation()}
            >
                <header className="flex items-center justify-between p-4 bg-slate-800 text-white rounded-t-lg border-b border-slate-700 no-print">
                    <div className="flex items-center">
                        <Printer className="text-teal-400 mr-3" size={24} />
                        <h2 className="text-lg font-semibold">Clinical Profile Report</h2>
                    </div>
                    <Button variant="ghost" onClick={closePrintProfileModal} size="sm" className="!p-2 text-white hover:bg-slate-700" aria-label="Close modal">
                        <XCircle size={20} />
                    </Button>
                </header>

                <main className="overflow-y-auto">
                    {renderContent()}
                </main>
                
                <footer className="p-4 bg-slate-100 rounded-b-lg text-right sticky bottom-0 border-t border-slate-200 no-print">
                    <div className="flex justify-between">
                         <Button onClick={closePrintProfileModal} variant="secondary">
                            Close
                        </Button>
                        <Button onClick={handlePrint} variant="success" leftIcon={<Printer />}>
                            Print Report
                        </Button>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default PrintProfileModal;
