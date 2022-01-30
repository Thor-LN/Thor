import React from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList} from 'react-native';

import {useTypedSelector} from '@/hooks/useTypedSelector';
import Wallet from '@/scenes/Settings/components/Wallet';
import {Box, Heading, VStack} from 'native-base';

const Settings = () => {
  const {t} = useTranslation();
  const {wallets} = useTypedSelector(state => state.preferences);

  return (
    <Box px={2} safeAreaTop flex={1}>
      <VStack space="md" flex={1}>
        <Heading>{t('Settings')}</Heading>
        <FlatList
          data={wallets}
          renderItem={({item}) => <Wallet wallet={item} />}
          keyExtractor={item => `${item.host}-${item.port}`}
        />
      </VStack>
    </Box>
  );
};

export default Settings;
