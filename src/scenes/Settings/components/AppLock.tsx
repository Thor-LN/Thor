import React, {useCallback, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';

import {changeGeneralSettings} from '@/actions/preferencesActions';
import {useTypedSelector} from '@/hooks/useTypedSelector';
import {SettingsRoutesTypes} from '@/routes/types/SettingsRoutesTypes';
import {
  deleteUserPinCode,
  hasUserSetPinCode,
} from '@haskkor/react-native-pincode';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {authenticateAsync} from 'expo-local-authentication';
import {HStack, Switch, Text, useToast, VStack} from 'native-base';

const AppLock = () => {
  const [hasLockEnabled, setHasLockEnabled] = useState<boolean>(false);

  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<SettingsRoutesTypes>>();
  const toast = useToast();
  const dispatch = useDispatch();
  const {generalSettings} = useTypedSelector(state => state.preferences);

  const triggerLock = useCallback(async () => {
    const isEnabled = await hasUserSetPinCode();
    setHasLockEnabled(isEnabled);
  }, []);

  useFocusEffect(() => {
    triggerLock();
  });

  const handleSetFaceId = useCallback(
    async (value: boolean) => {
      if (value) {
        try {
          const authentication = await authenticateAsync();

          if (!authentication.success) {
            throw new Error('Failed to enable Face ID/Touch ID');
          }

          dispatch(
            changeGeneralSettings({
              faceId: true,
            }),
          );
          toast.show({
            title: t('Face ID/Touch ID successfully enabled'),
            status: 'success',
          });
        } catch (e) {
          toast.show({
            title: t('We could not enable Face ID/Touch ID'),
            status: 'error',
          });
        }
        return;
      }

      dispatch(
        changeGeneralSettings({
          faceId: false,
        }),
      );
    },
    [dispatch, t, toast],
  );

  const handleSetAppLock = useCallback(
    async (value: boolean) => {
      if (!value) {
        await deleteUserPinCode();

        // delete face ID
        dispatch(
          changeGeneralSettings({
            faceId: false,
          }),
        );
        setHasLockEnabled(false);
        return;
      }
      navigation.navigate('PinCodeSet');
    },
    [dispatch, navigation],
  );

  return (
    <VStack space="md">
      <HStack justifyContent="space-between" alignItems="center">
        <Text>{t('Protect app')}</Text>
        <Switch isChecked={hasLockEnabled} onValueChange={handleSetAppLock} />
      </HStack>
      <HStack justifyContent="space-between" alignItems="center">
        <Text>{t('Use Face ID/Touch ID')}</Text>
        <Switch
          isChecked={generalSettings.faceId}
          onValueChange={handleSetFaceId}
          isDisabled={!hasLockEnabled}
        />
      </HStack>
    </VStack>
  );
};

export default AppLock;
