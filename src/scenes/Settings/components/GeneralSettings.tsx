import React from 'react';

import AppLock from '@/scenes/Settings/components/AppLock';
import BalancePricing from '@/scenes/Settings/components/BalancePricing';
import {VStack} from 'native-base';

const GeneralSettings = () => {
  return (
    <VStack space="md">
      <AppLock />
      <BalancePricing />
    </VStack>
  );
};

export default GeneralSettings;
