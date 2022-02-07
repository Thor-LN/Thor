import React, {useCallback} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {useAuthentication} from '@/providers/AuthenticationProvider';
import {useTheme} from '@/providers/ThemeProvider';
import {usePinCodeStyles} from '@/styles/pinCode';
import PINCode from '@haskkor/react-native-pincode';
import {Box} from 'native-base';

MaterialIcons.loadFont();

const PinAuthentication = () => {
  const {theme} = useTheme();
  const {setIsLocked} = useAuthentication();
  const style = usePinCodeStyles();

  const handleUnlock = useCallback(() => {
    setIsLocked(false);
  }, [setIsLocked]);

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
