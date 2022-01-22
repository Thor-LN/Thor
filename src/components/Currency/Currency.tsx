import React, {useCallback} from 'react';
import {useDispatch} from 'react-redux';

import {toggleUnits} from '@/actions/preferencesActions';
import {useFormattedCurrency} from '@/hooks/useFormattedCurrency';

interface CurrencyProps {
  amount: string | number;
  component: React.ReactElement;
}

const Currency = ({amount, component}: CurrencyProps) => {
  const dispatch = useDispatch();
  const parsedAmount = useFormattedCurrency();

  const handleClick = useCallback(() => {
    dispatch(toggleUnits());
  }, [dispatch]);

  return React.cloneElement(component, {
    children: parsedAmount(amount),
    onPress: handleClick,
  });
};

export default Currency;
