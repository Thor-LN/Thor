import React, {useCallback, useEffect} from 'react';

import {useAuthentication} from '@/providers/AuthenticationProvider';
import {useTheme} from '@/providers/ThemeProvider';
import {authenticateAsync} from 'expo-local-authentication';
import {Box} from 'native-base';

const BiometricAuthentication = () => {
  const {setIsLocked} = useAuthentication();
  const {theme} = useTheme();

  const handleAuthenticate = useCallback(async () => {
    const authentication = await authenticateAsync();

    if (authentication.success) {
      setIsLocked(false);
    }
  }, [setIsLocked]);

  useEffect(() => {
    handleAuthenticate();
  }, [handleAuthenticate]);

  return <Box flex={1} backgroundColor={theme.colors.background} />;
};

export default BiometricAuthentication;
