
import React, { ReactNode } from 'react';
import { useNavigation } from '../../contexts/NavigationContext';
import { usePatientData } from '../../contexts/PatientDataContext';
import { useUIState } from '../../contexts/UIStateContext';
import Button from '../ui/Button'; // Import the Button component
import { ArrowLeft, RotateCcw, Info, BookOpen, Sparkles, ShieldCheck } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-slate-900 text-white shadow-lg">
      <div className="container mx-auto max-w-5xl p-4 flex items-center">
        <svg className="w-8 h-8 mr-3 text-sky-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.5 5.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zm3 0c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zm-1.5 11.5c-2.03 0-3.8-1.1-4.75-2.82.16-.54.38-1.05.66-1.52.85-1.43 2.24-2.16 4.09-2.16s3.24.73 4.09 2.16c.28.47.5.98.66 1.52-1.05 1.72-2.81 2.82-4.75 2.82z" fill="currentColor"/></svg>
        <h1 className="text-xl font-medium tracking-tight">Asthma : A Tool for using the GINA approach</h1>
      </div>
    </header>
  );
};

const Footer: React.FC = () => {
  const { history, goBack, resetNavigation, currentStepId, navigateTo } = useNavigation();
  const { openAIPanel, openGoalsModal } = useUIState();

  const handleGoBack = () => {
    if (currentStepId === 'ABBREVIATIONS_STEP') {
      const prevHistory = [...history];
      prevHistory.pop(); 
      if(prevHistory.length > 0) {
         goBack(); 
      } else {
        resetNavigation();
      }
    } else {
      goBack();
    }
  };


  return (
    <footer className="mt-auto py-8">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="flex justify-between items-center mb-8">
          {history.length > 1 ? (
            <Button
              onClick={handleGoBack}
              variant="secondary"
              leftIcon={<ArrowLeft size={18} />}
              aria-label="Go to previous step"
            >
              Back
            </Button>
          ) : (
            <div></div> // Placeholder if no back possible
          )}
          <div className="flex items-center space-x-3">
             <Button
              onClick={openAIPanel}
              variant="danger"
              aria-label="Open AI Assistant"
              leftIcon={<Sparkles size={18} />}
            >
              AI Assistant
            </Button>
            {currentStepId !== 'INITIAL_STEP' && (
               <Button
                  onClick={() => resetNavigation()}
                  variant="secondary"
                  leftIcon={<RotateCcw size={18} />}
                  aria-label="Restart guide"
                >
                  Restart
              </Button>
            )}
             <Button
                onClick={openGoalsModal}
                variant="success"
                leftIcon={<ShieldCheck size={18} />}
                aria-label="View GINA Goals of Management"
            >
                Goals
            </Button>
            {currentStepId !== 'ABBREVIATIONS_STEP' && (
                 <Button
                    onClick={() => navigateTo('ABBREVIATIONS_STEP')}
                    variant="info"
                    leftIcon={<BookOpen size={18} />}
                    aria-label="View abbreviations"
                >
                    Abbreviations
                </Button>
            )}
          </div>
        </div>

        <div className="bg-sky-50 border border-sky-300 p-4 rounded-lg text-sky-800 text-sm shadow-md">
          <div className="flex items-start">
            <Info size={20} className="mr-3 mt-0.5 flex-shrink-0 text-sky-500" />
            <div>
              <p className="font-semibold text-sky-900">IMPORTANT DISCLAIMER</p>
              <p className="leading-relaxed">
                This tool is a decision aid based on GINA recommendations. It does NOT replace professional
                clinical judgment. All treatment decisions must be individualized by a healthcare professional.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export const MainLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto max-w-5xl p-4 sm:p-6 md:p-8 flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};
