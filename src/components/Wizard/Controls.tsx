import React from 'react';

import {Button, Center, VStack} from 'native-base';

import {ControlsProps} from './Wizard.props';

const Controls = (props: ControlsProps) => {
  const {
    stepNumber,
    previous,
    formik,
    previousButton,
    nextButton,
    isLastStep,
    finishButton,
    hasBackButton = true,
    disableNextButton = false,
  } = props;

  return (
    <Center marginY={4} safeAreaBottom>
      <VStack space="md">
        {hasBackButton && stepNumber > 0 && (
          <Button onPress={() => previous(formik.values)}>
            {previousButton || 'Back'}
          </Button>
        )}
        {isLastStep ? (
          <Button
            isDisabled={disableNextButton}
            isLoading={formik.isSubmitting}
            onPress={formik.handleSubmit}>
            {finishButton || 'Submit'}
          </Button>
        ) : (
          <Button
            isDisabled={disableNextButton}
            isLoading={formik.isSubmitting}
            onPress={formik.handleSubmit}>
            {nextButton || 'Next'}
          </Button>
        )}
      </VStack>
    </Center>
  );
};

export default Controls;
