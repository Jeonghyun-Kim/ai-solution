import React, { useEffect } from 'react';

export interface State {
  dataset: string | null;
  augmentations: Augmentation[];
  preprocesses: Preprocess[];
  user: UserInfo | null;
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
  mutateUser: () => void;
}

const initialState: State = {
  dataset: null,
  augmentations: [],
  preprocesses: [],
  user: null,
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
  mutateUser: () => {},
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

  const mutateUser = React.useCallback(() => {
    const user = sessionStorage.getItem('@user');

    setState((prev) => ({
      ...prev,
      user: user === null ? null : JSON.parse(user),
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
        mutateUser,
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
