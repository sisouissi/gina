
import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';

interface UIStateContextType {
  isAIPanelOpen: boolean;
  toggleAIPanel: () => void;
  openAIPanel: () => void;
  closeAIPanel: () => void;
  isGoalsModalOpen: boolean;
  openGoalsModal: () => void;
  closeGoalsModal: () => void;
}

const UIStateContext = createContext<UIStateContextType | undefined>(undefined);

export const UIStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAIPanelOpen, setIsAIPanelOpen] = useState(false);
  const [isGoalsModalOpen, setIsGoalsModalOpen] = useState(false);

  const toggleAIPanel = useCallback(() => {
    setIsAIPanelOpen(prev => !prev);
  }, []);

  const openAIPanel = useCallback(() => {
    setIsAIPanelOpen(true);
  }, []);

  const closeAIPanel = useCallback(() => {
    setIsAIPanelOpen(false);
  }, []);

  const openGoalsModal = useCallback(() => {
    setIsGoalsModalOpen(true);
  }, []);

  const closeGoalsModal = useCallback(() => {
    setIsGoalsModalOpen(false);
  }, []);


  return (
    <UIStateContext.Provider value={{ isAIPanelOpen, toggleAIPanel, openAIPanel, closeAIPanel, isGoalsModalOpen, openGoalsModal, closeGoalsModal }}>
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
