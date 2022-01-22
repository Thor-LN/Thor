import React from 'react';

import {Currency} from '@/components/Currency';
import {Loading} from '@/components/Loading';
import {useGetBlockchainBalance} from '@/hooks/api/useGetBlockchainBalance';
import {useGetInfo} from '@/hooks/api/useGetInfo';
import BalanceChart from '@/scenes/Wallet/components/BalanceChart';
import {Center, Heading} from 'native-base';

const Wallet = () => {
  const {data: getInfo} = useGetInfo();
  const {data: blockchainBalance} = useGetBlockchainBalance();

  if (!getInfo) {
    return <Loading full />;
  }

  return (
    <Center px={2} flex={1}>
      <BalanceChart
        confirmedBalance={blockchainBalance?.confirmed_balance}
        pendingBalance={blockchainBalance?.unconfirmed_balance}
      />
      <Currency
        amount={blockchainBalance?.total_balance || 0}
        component={<Heading />}
      />
    </Center>
  );
};

export default Wallet;
