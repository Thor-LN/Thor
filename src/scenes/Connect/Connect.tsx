import React from 'react';

import {Center, Heading, VStack} from 'native-base';

import Thor from '../../assets/svg/thor.svg';

const Connect = () => {
  return (
    <Center flex={1}>
      <VStack space={2} alignItems="center">
        <Thor width={120} height={120} />
        <Heading>Welcome to Thor</Heading>
        <Heading>Let&apos;s get you running in a bit</Heading>
      </VStack>
    </Center>
  );
};

export default Connect;
