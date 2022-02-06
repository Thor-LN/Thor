import React, {useCallback, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';

import {changeGeneralSettings} from '@/actions/preferencesActions';
import useFetch from '@/hooks/api/config/useFetch';
import {useTypedSelector} from '@/hooks/useTypedSelector';
import {HStack, Select, Text} from 'native-base';

const REMOVE_LIST = ['BTC', 'SATS'];

const BalancePricing = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const {balanceCurrency} = useTypedSelector(
    state => state.preferences.generalSettings,
  );

  const {data} = useFetch<string[]>(
    'https://api.coingecko.com/api/v3/simple/supported_vs_currencies',
  );

  const currencies = useMemo(() => {
    if (!data) {
      return [];
    }

    return data
      .map(currency => currency.toUpperCase())
      .sort()
      .filter(currency => !REMOVE_LIST.includes(currency));
  }, [data]);

  const handleChangeCurrency = useCallback(
    (value: string) => {
      dispatch(
        changeGeneralSettings({
          balanceCurrency: value,
        }),
      );
    },
    [dispatch],
  );

  return (
    <HStack justifyContent="space-between" alignItems="center">
      <Text>{t('Balance in')}</Text>
      <Select
        onValueChange={handleChangeCurrency}
        selectedValue={balanceCurrency}
        minWidth="60">
        {currencies.map(currency => (
          <Select.Item key={currency} label={currency} value={currency} />
        ))}
      </Select>
    </HStack>
  );
};

export default BalancePricing;
