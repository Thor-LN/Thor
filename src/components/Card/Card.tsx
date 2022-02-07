import React from 'react';

import {Box, IBoxProps} from 'native-base';

const Card: React.FC<IBoxProps> = ({children, ...rest}) => {
  return (
    <Box backgroundColor="rgba(255, 255, 255, 0.1)" borderRadius={4} {...rest}>
      {children}
    </Box>
  );
};

export default Card;
