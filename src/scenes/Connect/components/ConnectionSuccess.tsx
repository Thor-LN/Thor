import React from 'react';

import success from '@/assets/lottie/success.json';
import {Loading} from '@/components/Loading';
import {useGetInfo} from '@/hooks/api/useGetInfo';
import {lottieStyle} from '@/styles';
import LottieView from 'lottie-react-native';
import {Heading, VStack} from 'native-base';

const ConnectionSuccess = () => {
  const {data: nodeInfo} = useGetInfo();

  if (!nodeInfo) {
    return <Loading />;
  }

  const {alias} = nodeInfo;

  return (
    <VStack space="md" justifyContent="center" alignItems="center">
      <LottieView
        source={success}
        style={lottieStyle(200, 200).container}
        autoPlay
        loop={false}
      />

      <Heading numberOfLines={2}>Connected to {alias}!</Heading>
    </VStack>
  );
};

export default ConnectionSuccess;
