import React, {useCallback, useEffect} from 'react';

import {useTheme} from '@/providers/ThemeProvider';
import {authenticateAsync} from 'expo-local-authentication';
import {Box} from 'native-base';

interface BiometricAuthenticationProps {
  onAuthenticate: () => void;
}

const BiometricAuthentication = ({
  onAuthenticate,
}: BiometricAuthenticationProps) => {
  const {theme} = useTheme();

  const handleAuthenticate = useCallback(async () => {
    const authentication = await authenticateAsync();

    if (authentication.success) {
      onAuthenticate();
    }
  }, [onAuthenticate]);

  useEffect(() => {
    handleAuthenticate();
  }, [handleAuthenticate]);

  return <Box flex={1} backgroundColor={theme.colors.background} />;
};

export default BiometricAuthentication;
