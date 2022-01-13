import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from 'react-native-paper';

import {ControlsProps} from './Wizard.props';

const Controls = (props: ControlsProps) => {
  const {
    stepNumber,
    previous,
    formik,
    previousButton,
    nextButton,
    isLastStep,
    disabledNextButton = false,
    finishLabel,
    hasBackButton = true,
  } = props;

  return (
    <View style={styles.container}>
      {hasBackButton && stepNumber > 0 && (
        <Button onPress={() => previous(formik.values)}>
          {previousButton || 'Back'}
        </Button>
      )}
      {isLastStep ? (
        <Button
          loading={formik.isSubmitting}
          disabled={formik.isSubmitting || disabledNextButton}
          onPress={formik.handleSubmit}>
          {finishLabel || 'Submit'}
        </Button>
      ) : (
        <Button
          loading={formik.isSubmitting}
          disabled={formik.isSubmitting || disabledNextButton}
          onPress={formik.handleSubmit}>
          {nextButton || 'Next'}
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 2,
  },
});

export default Controls;
