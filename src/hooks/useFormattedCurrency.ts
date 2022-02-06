import {useCallback, useMemo} from 'react';

import useFetch from '@/hooks/api/config/useFetch';
import {useTypedSelector} from '@/hooks/useTypedSelector';
import {Units} from '@/reducers/preferencesReducer/types';
import convertToBtc from '@/utils/convertToBtc';
import CurrencyFunc from '@/utils/currency';

interface FetchPrice {
  bitcoin: {
    [currency: string]: number;
  };
}

export const useFormattedCurrency = () => {
  const {unit} = useTypedSelector(state => state.preferences);
  const {balanceCurrency} = useTypedSelector(
    state => state.preferences.generalSettings,
  );

  const {data} = useFetch<FetchPrice>(
    `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=${balanceCurrency.toLowerCase()}`,
  );

  const price = useMemo(() => {
    if (data) {
      return data.bitcoin[balanceCurrency.toLowerCase()];
    }
    return 0;
  }, [balanceCurrency, data]);

  return useCallback(
    (amount: string | number) => {
      switch (unit) {
        case Units.btc:
          return CurrencyFunc(convertToBtc(amount), {
            precision: 8,
            symbol: '₿ ',
          }).format();

        case Units.fiat:
          return CurrencyFunc(amount)
            .multiply(price)
            .divide(10 ** 8)
            .format();

        default:
          return CurrencyFunc(amount, {
            symbol: 'sats',
            pattern: '# !',
            precision: 0,
          }).format();
      }
    },
    [price, unit],
  );
};
