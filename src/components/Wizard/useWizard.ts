import {useContext} from 'react';

import {FormikContextType, useFormikContext} from 'formik';

import {WizardContext} from './Wizard';
import {WizardContextData} from './Wizard.props';

export type UseWizard<Values> = WizardContextData & FormikContextType<Values>;

const useWizard = <Values>(): UseWizard<Values> => {
  const context = useContext(WizardContext);
  const formikContext = useFormikContext<Values>();

  if (!context || !formikContext) {
    throw new Error('useWizard must be used within a WizardProvider');
  }

  return {...context, ...formikContext};
};

export default useWizard;
