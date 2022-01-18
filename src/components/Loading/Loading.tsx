import React from 'react';

import {Center, ISpinnerProps, Spinner} from 'native-base';

const Loading = (props: ISpinnerProps) => {
  const {size = 'lg', ...rest} = props;

  return (
    <Center>
      <Spinner size={size} {...rest} />
    </Center>
  );
};

export default Loading;
