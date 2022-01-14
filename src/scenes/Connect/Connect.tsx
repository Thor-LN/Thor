import React from 'react';
import {useTranslation} from 'react-i18next';

import {Center, Heading, VStack} from 'native-base';

import Thor from '../../assets/svg/thor.svg';

const Connect = () => {
  const {t} = useTranslation();

  return (
    <Center flex={1} px={2}>
      <VStack space={3} alignItems="center">
        <Thor width={120} height={120} />
        <Heading>{t('Welcome to Thor')}</Heading>
        <Heading textAlign="center">
          {t("Let's get you running in a bit")}
        </Heading>
      </VStack>
    </Center>
  );
};

export default Connect;
