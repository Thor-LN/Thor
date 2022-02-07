import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import useAppState from 'react-native-appstate-hook';

import {Loading} from '@/components/Loading';
import {useTypedSelector} from '@/hooks/useTypedSelector';
import Authentication from '@/scenes/Authentication/Authentication';
import {hasUserSetPinCode} from '@haskkor/react-native-pincode';
import {hasHardwareAsync, isEnrolledAsync} from 'expo-local-authentication';

interface AuthenticationContextData {
  setIsLocked: React.Dispatch<React.SetStateAction<boolean>>;
  hasAuthenticationSet: boolean;
  hasBiometricsSet: boolean;
  isBiometricSupported: boolean;
}

const AuthenticationContext = createContext<AuthenticationContextData>({
  setIsLocked: () => {},
  hasAuthenticationSet: false,
  hasBiometricsSet: false,
  isBiometricSupported: false,
});

export const useAuthentication = (): AuthenticationContextData => {
  const context = useContext(AuthenticationContext);

  if (!context) {
    throw new Error(
      'useAuthentication must be used within an AuthenticationProvider',
    );
  }

  return context;
};

const AuthenticationProvider: React.FC = ({children}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasAuthenticationSet, setHasAuthenticationSet] = useState(false);
  const [isBiometricSupported, setIsBiometricSupported] = React.useState(false);
  const [hasBiometricsSet, setHasBiometricsSet] = useState<boolean>(false);
  const [isLocked, setIsLocked] = useState(true);
  const {generalSettings} = useTypedSelector(state => state.preferences);

  // verify the state of the authentication
  const handleCheckAuthentication = useCallback(async () => {
    try {
      const authentication = await hasUserSetPinCode();
      const isBiometricsCompatible = await hasHardwareAsync();
      const biometrics = await isEnrolledAsync();
      const biometricsEnabled = generalSettings.faceId;

      setIsBiometricSupported(isBiometricsCompatible);

      if (authentication) {
        setHasAuthenticationSet(true);
        setHasBiometricsSet(biometrics && biometricsEnabled);
      } else {
        setHasAuthenticationSet(false);
        setIsLocked(false);
      }

      setIsLoading(false);
    } catch (e) {
      throw new Error('Could not read Async Storage');
    }
  }, [generalSettings.faceId]);

  // whenever the app goes to background, set state to locked
  // whenever the app goes to foreground, check authentication
  useAppState({
    onBackground: () => setIsLocked(true),
    onForeground: () => handleCheckAuthentication(),
  });

  // on load app, verify authentication
  useEffect(() => {
    handleCheckAuthentication();
  }, [handleCheckAuthentication]);

  const contextData = useMemo<AuthenticationContextData>(
    () => ({
      setIsLocked,
      hasAuthenticationSet,
      hasBiometricsSet,
      isBiometricSupported,
    }),
    [hasAuthenticationSet, hasBiometricsSet, isBiometricSupported],
  );

  const shouldShowAuthentication = useMemo(() => {
    // skip when in dev env
    if (__DEV__) {
      return false;
    }
    return hasAuthenticationSet && isLocked;
  }, [hasAuthenticationSet, isLocked]);

  if (isLoading) {
    return <Loading full />;
  }

  return (
    <AuthenticationContext.Provider value={contextData}>
      {shouldShowAuthentication ? <Authentication /> : children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationProvider;
