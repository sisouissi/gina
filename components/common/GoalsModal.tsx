
import React from 'react';
import { useUIState } from '../../contexts/UIStateContext';
import Button from '../ui/Button';
import { ShieldCheck, XCircle, CheckCircle2, AlertTriangle } from '../../constants/icons';

const GoalsModal: React.FC = () => {
  const { isGoalsModalOpen, closeGoalsModal } = useUIState();

  if (!isGoalsModalOpen) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 z-40 flex items-center justify-center p-4 transition-opacity duration-300"
      onClick={closeGoalsModal}
      aria-modal="true"
      role="dialog"
    >
        <div 
            className="w-full max-w-xl bg-slate-50 shadow-2xl rounded-lg z-50 flex flex-col transform transition-all duration-300"
            onClick={e => e.stopPropagation()}
        >
            <header className="flex items-center justify-between p-4 bg-slate-800 text-white rounded-t-lg border-b border-slate-700">
                <div className="flex items-center">
                    <ShieldCheck className="text-emerald-400 mr-3" size={24} />
                    <h2 className="text-lg font-semibold">GINA 2025: Goals of Asthma Management</h2>
                </div>
                <Button variant="ghost" onClick={closeGoalsModal} size="sm" className="!p-2 text-white hover:bg-slate-700" aria-label="Close goals modal">
                    <XCircle size={20} />
                </Button>
            </header>

            <main className="p-6 space-y-6">
                <p className="text-slate-600 text-sm">
                    The long-term goals of asthma management are a partnership between the patient and healthcare provider. They are twofold:
                </p>

                <div className="p-4 bg-white rounded-lg border border-slate-200 shadow-sm">
                    <h3 className="font-semibold text-slate-800 mb-2 flex items-center">
                        <CheckCircle2 size={20} className="text-sky-600 mr-2" />
                        1. Symptom Control
                    </h3>
                    <p className="text-slate-700 pl-7">
                        To achieve good control of day-to-day symptoms and enable patients to maintain normal activity levels, including work, school, and leisure activities.
                    </p>
                </div>
                
                <div className="p-4 bg-white rounded-lg border border-slate-200 shadow-sm">
                    <h3 className="font-semibold text-slate-800 mb-2 flex items-center">
                        <AlertTriangle size={20} className="text-amber-600 mr-2" />
                        2. Future Risk Reduction
                    </h3>
                    <p className="text-slate-700 pl-7">
                        To minimize the future risk of asthma-related outcomes, including:
                    </p>
                    <ul className="list-disc list-inside text-slate-700 mt-2 pl-7 space-y-1">
                        <li>Asthma exacerbations (flare-ups or attacks).</li>
                        <li>Asthma-related mortality.</li>
                        <li>Persistent airflow limitation.</li>
                        <li>Medication side-effects.</li>
                    </ul>
                </div>
            </main>
            
            <footer className="p-4 bg-slate-100 rounded-b-lg text-right">
                <Button onClick={closeGoalsModal} variant="secondary">
                    Close
                </Button>
            </footer>
        </div>
    </div>
  );
};

export default GoalsModal;
