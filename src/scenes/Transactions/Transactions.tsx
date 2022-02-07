import React, {useCallback, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {RefreshControl, StyleSheet} from 'react-native';

import {Card} from '@/components/Card';
import {Currency} from '@/components/Currency';
import {Loading} from '@/components/Loading';
import {useGetTransactions} from '@/hooks/api/useGetTransactions';
import {useTheme} from '@/providers/ThemeProvider';
import EmptyList from '@/scenes/Transactions/components/EmptyList';
import {GetTransactions} from '@/types/GetTransactionsResponse';
import dayjs from 'dayjs';
import {FlatList, Heading, HStack, Text, VStack} from 'native-base';

const Transactions = () => {
  const {t} = useTranslation();
  const {data: transactions, mutate} = useGetTransactions();

  const {theme} = useTheme();

  const [isManualRefresh, setIsManualRefresh] = useState<boolean>(false);

  const getLabel = useCallback(
    (item: GetTransactions) => {
      if (Number(item.amount) < 0) {
        return t('Payment sent');
      }
      return t('Payment received');
    },
    [t],
  );

  const handleRefresh = useCallback(async () => {
    try {
      setIsManualRefresh(true);
      await mutate();
    } finally {
      setIsManualRefresh(false);
    }
  }, [mutate]);

  if (!transactions) {
    return <Loading full />;
  }

  return (
    <VStack flex={1} safeAreaTop px={2} space="md">
      <Heading>{t('Transactions')}</Heading>
      <FlatList
        contentContainerStyle={styles.listViewContainer}
        refreshControl={
          <RefreshControl
            refreshing={isManualRefresh}
            onRefresh={handleRefresh}
            colors={[theme.colors.text]}
            tintColor={theme.colors.text}
          />
        }
        data={transactions}
        ListEmptyComponent={<EmptyList />}
        renderItem={({item}) => (
          <Card p={2} my={2}>
            <VStack space="2xs">
              <HStack justifyContent="space-between">
                <Text>{getLabel(item)}</Text>
                <Text>{dayjs.unix(Number(item.timeStamp)).format('LLL')}</Text>
              </HStack>
              <HStack justifyContent="space-between">
                <Text flexShrink={1} numberOfLines={1} maxW={200}>
                  {item.address}
                </Text>
                <Currency amount={item.amount} component={<Text />} />
              </HStack>
            </VStack>
          </Card>
        )}
      />
    </VStack>
  );
};

const styles = StyleSheet.create({
  listViewContainer: {
    flex: 1,
  },
});

export default Transactions;
