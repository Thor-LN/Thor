import React, {useCallback} from 'react';

import Chain from '@/assets/svg/chain.svg';
import Pending from '@/assets/svg/pending.svg';
import Lightning from '@/assets/svg/thunderbolt.svg';
import {Currency} from '@/components/Currency';
import {Loading} from '@/components/Loading';
import ScrollRefreshView from '@/components/ScrollRefreshView/ScrollRefreshView';
import {useGetBlockchainBalance} from '@/hooks/api/useGetBlockchainBalance';
import {useGetChannelsBalance} from '@/hooks/api/useGetChannelsBalance';
import {useGetInfo} from '@/hooks/api/useGetInfo';
import {useTheme} from '@/providers/ThemeProvider';
import BalanceChart from '@/scenes/Wallet/components/BalanceChart';
import {Center, Heading, HStack, VStack} from 'native-base';

const Wallet = () => {
  const {theme} = useTheme();

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

  const handleRefreshScreen = useCallback(async () => {
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

  if (!getInfo || !blockchainBalance || !channelsBalance) {
    return <Loading full />;
  }

  return (
    <ScrollRefreshView
      onRefresh={handleRefreshScreen}
      refreshing={isValidating}
      flex={1}
      safeAreaTop>
      <Center px={2} flex={1}>
        <VStack justifyContent="center" alignItems="center" space="md">
          <BalanceChart
            confirmedBalance={blockchainBalance?.confirmed_balance}
            pendingBalance={blockchainBalance?.unconfirmed_balance}
            localBalance={channelsBalance?.localBalance}
          />

          <HStack alignItems="center" space="md">
            <Chain height={20} width={20} fill={theme.colors.text} />
            <Currency
              amount={blockchainBalance?.total_balance || 0}
              component={<Heading />}
            />
          </HStack>

          <HStack alignItems="center" space="md">
            <Lightning height={20} width={20} />
            <Currency
              amount={channelsBalance?.localBalance || 0}
              component={<Heading />}
            />
          </HStack>

          {Number(blockchainBalance.unconfirmed_balance) > 0 && (
            <HStack alignItems="center" space="md">
              <Pending height={20} width={20} fill={theme.colors.text} />
              <Currency
                amount={blockchainBalance.unconfirmed_balance}
                component={<Heading />}
              />
            </HStack>
          )}
        </VStack>
      </Center>
    </ScrollRefreshView>
  );
};

export default Wallet;
