import React from 'react';

import {InputProps} from '@/components/Input/Input.props';
import {useWizard} from '@/components/Wizard';
import {errorMessage, hasErrors} from '@/utils/formikHelpers';
import {
  Box,
  FormControl,
  Input as NBInput,
  WarningOutlineIcon,
} from 'native-base';

const Input = (props: InputProps) => {
  const {name, label, ...rest} = props;

  const {handleChange, handleBlur, values, touched, errors} = useWizard<any>();

  const value = values[name];

  return (
    <Box flexDir="row">
      <FormControl isInvalid={hasErrors(name, touched, errors)}>
        {label && <FormControl.Label>{label}</FormControl.Label>}
        <NBInput
          value={value}
          onChangeText={handleChange(name)}
          onBlur={handleBlur(name)}
          variant="rounded"
          {...rest}
        />
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          {errorMessage(name, touched, errors)}
        </FormControl.ErrorMessage>
      </FormControl>
    </Box>
  );
};

export default Input;
