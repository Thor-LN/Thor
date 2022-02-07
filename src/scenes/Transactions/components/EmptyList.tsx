import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';

import empty from '@/assets/lottie/empty.json';
import LottieView from 'lottie-react-native';
import {Center, Heading} from 'native-base';

const EmptyList = () => {
  const {t} = useTranslation();

  return (
    <Center flex={1} px={2}>
      <LottieView source={empty} autoPlay loop={false} style={styles.lottie} />
      <Heading textAlign="center">
        {t("You don't have any transactions")}
      </Heading>
    </Center>
  );
};

const styles = StyleSheet.create({
  lottie: {
    width: 100,
  },
});

export default EmptyList;
