import React, {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {SettingsRoutesTypes} from '@/routes/types/SettingsRoutesTypes';
import {usePinCodeStyles} from '@/styles/pinCode';
import PINCode from '@haskkor/react-native-pincode';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useToast} from 'native-base';

MaterialIcons.loadFont();

const PinCodeSet = () => {
  const {t} = useTranslation();
  const toast = useToast();
  const styles = usePinCodeStyles();
  const navigation =
    useNavigation<
      NativeStackNavigationProp<SettingsRoutesTypes, 'PinCodeSet'>
    >();

  const handleSetPinCode = useCallback(() => {
    toast.show({
      title: t('PIN successfully set'),
      status: 'success',
    });

    navigation.pop();
  }, [navigation, t, toast]);

  return (
    <PINCode
      status="choose"
      touchIDDisabled
      finishProcess={handleSetPinCode}
      {...styles}
    />
  );
};

export default PinCodeSet;
