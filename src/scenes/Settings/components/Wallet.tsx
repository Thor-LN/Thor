import React, {useCallback, useMemo} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import {useDispatch} from 'react-redux';

import {setStorage} from '@/actions/storageActions';
import {Card} from '@/components/Card';
import {useTypedSelector} from '@/hooks/useTypedSelector';
import {useTheme} from '@/providers/ThemeProvider';
import {Wallets} from '@/reducers/preferencesReducer/types';
import {HStack, Pressable, Text} from 'native-base';

Entypo.loadFont();

interface WalletProps {
  wallet: Wallets;
}

const Wallet = ({wallet}: WalletProps) => {
  const {theme} = useTheme();
  const dispatch = useDispatch();
  const {host, port} = useTypedSelector(state => state.storage);

  const isConnected = useMemo(() => {
    return wallet.host === host && wallet.port === port;
  }, [host, port, wallet.host, wallet.port]);

  const handleSelectWallet = useCallback(() => {
    dispatch(setStorage(wallet));
  }, [dispatch, wallet]);

  return (
    <Pressable onPress={handleSelectWallet}>
      <Card h={10}>
        <HStack
          alignItems="center"
          justifyContent="space-between"
          flex={1}
          px={2}
          space="md">
          <HStack space="md" alignItems="center">
            <Entypo name="wallet" color={theme.colors.text} />
            <Text>{wallet.name}</Text>
          </HStack>
          {isConnected && (
            <Entypo name="check" color={theme.colors.green['500']} />
          )}
        </HStack>
      </Card>
    </Pressable>
  );
};

export default Wallet;
