
import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';

interface UIStateContextType {
  isAIPanelOpen: boolean;
  toggleAIPanel: () => void;
  openAIPanel: () => void;
  closeAIPanel: () => void;
  
  isGoalsModalOpen: boolean;
  openGoalsModal: () => void;
  closeGoalsModal: () => void;

  isInfoModalOpen: boolean;
  infoModalContent: { title: string; content: React.ReactNode } | null;
  openInfoModal: (title: string, content: React.ReactNode) => void;
  closeInfoModal: () => void;
  
  activePanel: 'management' | 'diagnosis' | 'severeAsthma' | null;
  openManagementPanel: () => void;
  openDiagnosisPanel: () => void;
  openSevereAsthmaPanel: () => void;
  closeSidePanel: () => void;
}

const UIStateContext = createContext<UIStateContextType | undefined>(undefined);

export const UIStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAIPanelOpen, setIsAIPanelOpen] = useState(false);
  const [isGoalsModalOpen, setIsGoalsModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [infoModalContent, setInfoModalContent] = useState<{ title: string; content: React.ReactNode } | null>(null);
  const [activePanel, setActivePanel] = useState<'management' | 'diagnosis' | 'severeAsthma' | null>(null);

  const toggleAIPanel = useCallback(() => setIsAIPanelOpen(prev => !prev), []);
  const openAIPanel = useCallback(() => setIsAIPanelOpen(true), []);
  const closeAIPanel = useCallback(() => setIsAIPanelOpen(false), []);

  const openGoalsModal = useCallback(() => setIsGoalsModalOpen(true), []);
  const closeGoalsModal = useCallback(() => setIsGoalsModalOpen(false), []);

  const openInfoModal = useCallback((title: string, content: React.ReactNode) => {
    setInfoModalContent({ title, content });
    setIsInfoModalOpen(true);
  }, []);

  const closeInfoModal = useCallback(() => {
    setIsInfoModalOpen(false);
    // Delay clearing content to prevent it from disappearing during the closing animation
    setTimeout(() => setInfoModalContent(null), 300);
  }, []);

  const openManagementPanel = useCallback(() => setActivePanel('management'), []);
  const openDiagnosisPanel = useCallback(() => setActivePanel('diagnosis'), []);
  const openSevereAsthmaPanel = useCallback(() => setActivePanel('severeAsthma'), []);
  const closeSidePanel = useCallback(() => setActivePanel(null), []);

  return (
    <UIStateContext.Provider value={{ 
      isAIPanelOpen, toggleAIPanel, openAIPanel, closeAIPanel, 
      isGoalsModalOpen, openGoalsModal, closeGoalsModal,
      isInfoModalOpen, infoModalContent, openInfoModal, closeInfoModal,
      activePanel, openManagementPanel, openDiagnosisPanel, openSevereAsthmaPanel, closeSidePanel
    }}>
      {children}
    </UIStateContext.Provider>
  );
};

export const useUIState = (): UIStateContextType => {
  const context = useContext(UIStateContext);
  if (!context) {
    throw new Error('useUIState must be used within a UIStateProvider');
  }
  return context;
};