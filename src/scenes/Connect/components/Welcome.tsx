import React from 'react';
import {useTranslation} from 'react-i18next';

import Thor from '@/assets/svg/thor.svg';
import {Heading, VStack} from 'native-base';

const Welcome = () => {
  const {t} = useTranslation();

  return (
    <VStack space="md" alignItems="center">
      <Thor width={120} height={120} />
      <Heading>{t('Welcome to Thor')}</Heading>
      <Heading textAlign="center">
        {t("Let's get you up and running in a bit")}
      </Heading>
    </VStack>
  );
};

export default Welcome;
