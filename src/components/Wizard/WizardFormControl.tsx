import React from 'react';

import {useFormikContext} from 'formik';

import {WizardFormControlProps} from './Wizard.props';

function WizardFormControl<Values>({innerRef}: WizardFormControlProps<Values>) {
  const formikbag = useFormikContext<Values>();

  // allow pass a inner ref to component
  React.useImperativeHandle(innerRef, () => formikbag);

  return null;
}

export default WizardFormControl;
