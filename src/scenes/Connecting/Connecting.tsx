import React from 'react';
import {useTranslation} from 'react-i18next';

import {Loading} from '@/components/Loading';
import {Center, Heading, VStack} from 'native-base';

const Connecting = () => {
  const {t} = useTranslation();

  return (
    <Center flex={1}>
      <VStack space="md">
        <Loading />
        <Heading>{t('Connecting')}</Heading>
      </VStack>
    </Center>
  );
};

export default Connecting;
