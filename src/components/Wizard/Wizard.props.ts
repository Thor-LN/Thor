import React, {ReactNode} from 'react';

import {FormikHelpers, FormikProps, FormikValues} from 'formik';

export type WizardControlProps = Partial<{
  hasBackButton: boolean;
}>;

export interface WizardProps<Values, Response> {
  initialValues: Values;
  onSubmit: (
    values: Values,
    formikHelpers: FormikHelpers<Values>,
  ) => void | Promise<Response> | Promise<void>;
  nextButton?: string;
  previousButton?: string;
  finishButton?: string;
  controlProps?: WizardControlProps;
  customControl?: ({
    previous,
    formik,
  }: WizardCustomControl<Values>) => ReactNode;
  disableControls?: boolean;
  stepper?: ReactNode;
  innerRef?: React.Ref<FormikProps<Values>>;
}

export interface WizardFormControlProps<Values> {
  innerRef?: React.Ref<FormikProps<Values>>;
}

export interface WizardContextData {
  previous: (values: FormikValues) => void;
  stepNumber: number;
  isLastStep: boolean;
}

export type WizardCustomControl<Values> = {
  previous: (values: Values) => void;
  formik: FormikProps<Values>;
  isFormValid: boolean;
  stepNumber: number;
};

export interface WizardStepProps<Values, Response> {
  onSubmit?: (
    values: Values,
    formikHelpers: FormikHelpers<Values>,
  ) => void | Promise<Response> | Promise<void>;
  validationSchema?: unknown;
  nextButton?: string;
  previousButton?: string;
  customControl?: ({
    previous,
    formik,
  }: WizardCustomControl<Values>) => ReactNode;
  requireIsValid?: boolean;
  disableControls?: boolean;
}

export type IWizardStepProps = {
  children: React.ReactElement[] | React.ReactElement;
};

export interface ControlsProps extends WizardControlProps {
  stepNumber: number;
  formik: FormikProps<FormikValues>;
  previous: (values: FormikValues) => void;
  previousButton: string | ReactNode;
  nextButton: string;
  isLastStep: boolean;
  finishButton?: string;
}
