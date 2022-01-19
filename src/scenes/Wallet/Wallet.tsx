import React from 'react';
import {useTranslation} from 'react-i18next';

import {Loading} from '@/components/Loading';
import {useGetInfo} from '@/hooks/api/useGetInfo';
import {Center, Heading} from 'native-base';

const Wallet = () => {
  const {data: getInfo} = useGetInfo();
  const {t} = useTranslation();

  if (!getInfo) {
    return <Loading />;
  }

  return (
    <Center px={2}>
      <Heading>{t('Connected to {{alias}}', {alias: getInfo.alias})}</Heading>
    </Center>
  );
};

export default Wallet;
