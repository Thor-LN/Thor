import React from 'react';
import {useTranslation} from 'react-i18next';

import {useTypedSelector} from '@/hooks/useTypedSelector';
import GeneralSettings from '@/scenes/Settings/components/GeneralSettings';
import Wallet from '@/scenes/Settings/components/Wallet';
import {Box, Heading, VStack} from 'native-base';

const Settings = () => {
  const {t} = useTranslation();
  const {wallets} = useTypedSelector(state => state.preferences);

  return (
    <Box px={2} safeAreaTop flex={1}>
      <VStack space="md" flex={1}>
        <Heading>{t('Settings')}</Heading>
        {wallets.map(wallet => (
          <Wallet key={`${wallet.host}-${wallet.port}`} wallet={wallet} />
        ))}
        <GeneralSettings />
      </VStack>
    </Box>
  );
};

export default Settings;
