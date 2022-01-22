import React from 'react';

import {Center, ISpinnerProps, Spinner} from 'native-base';

interface LoadingProps extends ISpinnerProps {
  full?: boolean;
}

const Loading = (props: LoadingProps) => {
  const {size = 'lg', full, ...rest} = props;

  return (
    <Center flex={full ? 1 : undefined}>
      <Spinner size={size} {...rest} />
    </Center>
  );
};

export default Loading;
