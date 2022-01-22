import {useCallback} from 'react';

import {useTypedSelector} from '@/hooks/useTypedSelector';
import {Units} from '@/reducers/preferencesReducer/types';
import convertToBtc from '@/utils/convertToBtc';
import CurrencyFunc from '@/utils/currency';

export const useFormattedCurrency = () => {
  const {unit} = useTypedSelector(state => state.preferences);

  return useCallback(
    (amount: string | number) => {
      switch (unit) {
        case Units.btc:
          return CurrencyFunc(convertToBtc(amount), {
            precision: 8,
            symbol: '₿ ',
          }).format();
        default:
          return CurrencyFunc(amount, {
            symbol: 'sats',
            pattern: '# !',
            precision: 0,
          }).format();
      }
    },
    [unit],
  );
};
