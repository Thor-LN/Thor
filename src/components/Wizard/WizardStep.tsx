import React from 'react';

import {IWizardStepProps, WizardStepProps} from './Wizard.props';

const WizardStep = <Values, Response extends Record<string, unknown>>(
  props: WizardStepProps<Values, Response> & IWizardStepProps,
) => {
  const {children} = props;
  return <>{children}</>;
};

export default WizardStep;
