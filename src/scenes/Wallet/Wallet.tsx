import React, {useCallback} from 'react';
import {RefreshControl} from 'react-native';

import Chain from '@/assets/svg/chain.svg';
import Lightning from '@/assets/svg/thunderbolt.svg';
import {Currency} from '@/components/Currency';
import {Loading} from '@/components/Loading';
import {useGetBlockchainBalance} from '@/hooks/api/useGetBlockchainBalance';
import {useGetChannelsBalance} from '@/hooks/api/useGetChannelsBalance';
import {useGetInfo} from '@/hooks/api/useGetInfo';
import BalanceChart from '@/scenes/Wallet/components/BalanceChart';
import {Center, Heading, HStack, ScrollView, VStack} from 'native-base';

const Wallet = () => {
  const {
    data: getInfo,
    mutate: mutateGetInfo,
    isValidating: isValidatingGetInfo,
  } = useGetInfo();
  const {
    data: blockchainBalance,
    mutate: mutateBlockchainBalance,
    isValidating: isValidatingBlockchainBalance,
  } = useGetBlockchainBalance();
  const {
    data: channelsBalance,
    mutate: mutateChannelsBalance,
    isValidating: isValidatingChannelsBalance,
  } = useGetChannelsBalance();

  const refreshScreen = useCallback(async () => {
    await Promise.all([
      mutateGetInfo(),
      mutateBlockchainBalance(),
      mutateChannelsBalance(),
    ]);
  }, [mutateBlockchainBalance, mutateChannelsBalance, mutateGetInfo]);

  const isValidating =
    isValidatingGetInfo ||
    isValidatingBlockchainBalance ||
    isValidatingChannelsBalance;

  if (!getInfo) {
    return <Loading full />;
  }

  return (
    <ScrollView
      contentContainerStyle={{justifyContent: 'center', flexGrow: 1}}
      refreshControl={
        <RefreshControl refreshing={isValidating} onRefresh={refreshScreen} />
      }>
      <Center px={2} flex={1}>
        <VStack justifyContent="center" alignItems="center" space="md">
          <BalanceChart
            confirmedBalance={blockchainBalance?.confirmed_balance}
            pendingBalance={blockchainBalance?.unconfirmed_balance}
            localBalance={channelsBalance?.localBalance}
          />

          <HStack alignItems="center" space="md">
            <Chain height={20} width={20} fill="white" />
            <Currency
              amount={blockchainBalance?.total_balance || 0}
              component={<Heading />}
            />
          </HStack>

          <HStack alignItems="center" space="md">
            <Lightning height={20} width={20} fill="white" />
            <Currency
              amount={channelsBalance?.localBalance || 0}
              component={<Heading />}
            />
          </HStack>
        </VStack>
      </Center>
    </ScrollView>
  );
};

export default Wallet;
