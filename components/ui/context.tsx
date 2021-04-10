import React, { useEffect } from 'react';

export interface State {
  dataset: string | null;
  augmentations: Augmentation[];
  preprocesses: Preprocess[];
  title: string | null;
}

export interface StateWithActions extends State {
  setDataset: (dataset: string) => void;
  clearDataset: () => void;
  addAugmentation: (augmentation: Augmentation) => void;
  removeAugmentation: (index: number) => void;
  addPreprocess: (preprocess: Preprocess) => void;
  removePreprocess: (index: number) => void;
  saveLearningProcess: () => void;
  restoreLearningProcess: () => void;
  setTitle: (title: string) => void;
}

const initialState: State = {
  dataset: null,
  augmentations: [],
  preprocesses: [],
  title: null,
};

const initialStateWithActions: StateWithActions = {
  ...initialState,
  setDataset: () => {},
  clearDataset: () => {},
  addAugmentation: () => {},
  removeAugmentation: () => {},
  addPreprocess: () => {},
  removePreprocess: () => {},
  saveLearningProcess: () => {},
  restoreLearningProcess: () => {},
  setTitle: () => {},
};

export const UIContext = React.createContext<StateWithActions>(
  initialStateWithActions,
);

export const UIProvider: React.FC = ({ ...props }) => {
  const [state, setState] = React.useState<State>(initialState);

  const setDataset = React.useCallback((dataset: string) => {
    setState((prev) => ({ ...prev, dataset }));
  }, []);

  const clearDataset = React.useCallback(() => {
    setState((prev) => ({ ...prev, dataset: null }));
  }, []);

  const addAugmentation = React.useCallback((augmentation: Augmentation) => {
    setState((prev) => ({
      ...prev,
      augmentations: [...prev.augmentations, augmentation],
    }));
  }, []);

  const removeAugmentation = React.useCallback((index: number) => {
    setState((prev) => ({
      ...prev,
      augmentations: prev.augmentations.filter((_, idx) => idx !== index),
    }));
  }, []);

  const addPreprocess = React.useCallback((preprocess: Preprocess) => {
    setState((prev) => ({
      ...prev,
      preprocesses: [...prev.preprocesses, preprocess],
    }));
  }, []);

  const removePreprocess = React.useCallback((index: number) => {
    setState((prev) => ({
      ...prev,
      preprocesses: prev.preprocesses.filter((_, idx) => idx !== index),
    }));
  }, []);

  const saveLearningProcess = React.useCallback(() => {
    sessionStorage.setItem('@UIContext', JSON.stringify(state));
  }, [state]);

  const restoreLearningProcess = React.useCallback(() => {
    const savedState = sessionStorage.getItem('@UIContext');
    if (savedState) setState(JSON.parse(savedState));
  }, []);

  const setTitle = React.useCallback((title: string) => {
    setState((prev) => ({
      ...prev,
      title,
    }));
  }, []);

  useEffect(() => {
    restoreLearningProcess();
  }, [restoreLearningProcess]);

  return (
    <UIContext.Provider
      value={{
        ...state,
        setDataset,
        clearDataset,
        addAugmentation,
        removeAugmentation,
        addPreprocess,
        removePreprocess,
        saveLearningProcess,
        restoreLearningProcess,
        setTitle,
      }}
      {...props}
    />
  );
};

export const useUI = () => {
  const context = React.useContext(UIContext);
  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
};

export const ManagedUIContext: React.FC = ({ children }) => (
  <UIProvider>{children}</UIProvider>
);

export default ManagedUIContext;
