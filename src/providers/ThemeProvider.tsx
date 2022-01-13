import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import {Theme} from '@react-navigation/native';

import {CombinedDarkTheme, CombinedDefaultTheme} from '../styles/theme';

interface ThemeProviderContextInterface {
  toggleTheme: () => void;
  theme: ReactNativePaper.Theme & Theme;
}

interface ThemeProviderProps {
  children: ({
    theme,
  }: {
    theme: ReactNativePaper.Theme & Theme;
  }) => React.ReactNode;
}

const ThemeProviderContext = createContext<ThemeProviderContextInterface>({
  toggleTheme: () => {},
  theme: CombinedDefaultTheme,
});

const ThemeProvider = ({children}: ThemeProviderProps) => {
  const [isThemeDark, setIsThemeDark] = useState(false);

  const theme = useMemo<ReactNativePaper.Theme & Theme>(
    () => (isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme),
    [isThemeDark],
  );

  const toggleTheme = useCallback(
    () => setIsThemeDark(prevState => !prevState),
    [],
  );

  const preferences = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeProviderContext.Provider value={preferences}>
      {children({theme})}
    </ThemeProviderContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (!context) {
    throw new Error('useWizard must be used within a WizardProvider');
  }

  return context;
};

export default ThemeProvider;
