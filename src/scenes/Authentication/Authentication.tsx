import React from 'react';

import {useAuthentication} from '@/providers/AuthenticationProvider';
import PinAuthentication from '@/scenes/Authentication/components/PinAuthentication';

import BiometricAuthentication from './components/BiometricAuthentication';

const Authentication = () => {
  const {hasBiometricsSet} = useAuthentication();

  if (hasBiometricsSet) {
    return <BiometricAuthentication />;
  }

  return <PinAuthentication />;
};

export default Authentication;
