import React from 'react';

import {useAuthentication} from '@/providers/AuthenticationProvider';
import PinAuthentication from '@/scenes/Authentication/components/PinAuthentication';

import BiometricAuthentication from './components/BiometricAuthentication';

interface AuthenticationsProps {
  onAuthenticate: () => void;
}

const Authentication = ({onAuthenticate}: AuthenticationsProps) => {
  const {hasBiometricsSet} = useAuthentication();

  if (hasBiometricsSet) {
    return <BiometricAuthentication onAuthenticate={onAuthenticate} />;
  }

  return <PinAuthentication onAuthenticate={onAuthenticate} />;
};

export default Authentication;
