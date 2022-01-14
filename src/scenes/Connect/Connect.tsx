import React from 'react';
import {useTranslation} from 'react-i18next';
import PaginationDot from 'react-native-animated-pagination-dot';

import {Box, Button, Center, Heading, VStack} from 'native-base';

import Thor from '../../assets/svg/thor.svg';

const Connect = () => {
  const {t} = useTranslation();

  return (
    <Box flex={1}>
      <Center flex={1} px={2}>
        <VStack space={3} alignItems="center">
          <Thor width={120} height={120} />
          <Heading>{t('Welcome to Thor')}</Heading>
          <Heading textAlign="center">
            {t("Let's get you running in a bit")}
          </Heading>
          <PaginationDot activeDotColor="white" curPage={0} maxPage={3} />
        </VStack>
      </Center>
      <Center safeAreaBottom>
        <Button size="lg" width={200}>
          {t('Next')}
        </Button>
      </Center>
    </Box>
  );
};

export default Connect;
