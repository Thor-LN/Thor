import React from 'react';
import {useTranslation} from 'react-i18next';

import {Heading, VStack} from 'native-base';

import Lightning from '../../../assets/svg/lightning.svg';

const NodeInfo = () => {
  const {t} = useTranslation();

  return (
    <VStack alignItems="center" space="md">
      <Lightning width={120} height={120} />
      <Heading textAlign="center">
        {t(
          'You can use this wallet to connect to you LND node, manage channels, receive and make payments',
        )}
      </Heading>
    </VStack>
  );
};

export default NodeInfo;
