import React, {useCallback} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {useTheme} from '@/providers/ThemeProvider';
import {usePinCodeStyles} from '@/styles/pinCode';
import PINCode from '@haskkor/react-native-pincode';
import {Box} from 'native-base';

MaterialIcons.loadFont();

interface PinAuthenticationProps {
  onAuthenticate: () => void;
}

const PinAuthentication = ({onAuthenticate}: PinAuthenticationProps) => {
  const {theme} = useTheme();
  const style = usePinCodeStyles();

  const handleUnlock = useCallback(() => {
    onAuthenticate();
  }, [onAuthenticate]);

  return (
    <Box flex={1} backgroundColor={theme.colors.background}>
      <PINCode
        status="enter"
        touchIDDisabled
        finishProcess={handleUnlock}
        {...style}
      />
    </Box>
  );
};

export default PinAuthentication;
