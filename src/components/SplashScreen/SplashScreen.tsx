import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
import Reanimated, {FadeIn, FadeOut} from 'react-native-reanimated';

import {Loading} from '@/components/Loading';
import {useGetInfo} from '@/hooks/api/useGetInfo';
import {useTheme} from '@/providers/ThemeProvider';
import {Box, Center, Heading} from 'native-base';

const SplashScreen = () => {
  const {t} = useTranslation();
  const {data: getInfo} = useGetInfo();

  if (!getInfo) {
    return <Loading full />;
  }

  return (
    <Center px={2} flex={1}>
      <Heading>{t('Connected to {{alias}}', {alias: getInfo.alias})}</Heading>
    </Center>
  );
};

const SplashContainer = () => {
  const {theme} = useTheme();

  return (
    <Box flex={1} backgroundColor={theme.colors.background}>
      <Reanimated.View
        style={StyleSheet.absoluteFill}
        entering={FadeIn}
        exiting={FadeOut}>
        <SplashScreen />
      </Reanimated.View>
    </Box>
  );
};

export default SplashContainer;
