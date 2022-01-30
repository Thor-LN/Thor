import React, {
  createContext,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';

import {Formik, FormikHelpers, FormikProps, FormikValues} from 'formik';
import {Center} from 'native-base';

import Controls from './Controls';
import {WizardContextData, WizardProps} from './Wizard.props';
import WizardFormControl from './WizardFormControl';

export const WizardContext = createContext<WizardContextData>({
  previous: () => {},
  stepNumber: 0,
  isLastStep: false,
});

const Wizard = <Values, Response extends Record<string, unknown>>(
  props: WizardProps<Values, Response> & {children: React.ReactNode},
): React.ReactElement | null => {
  const {
    children,
    initialValues,
    onSubmit,
    nextButton,
    previousButton,
    finishButton,
    controlProps,
    customControl,
    disableControls,
    stepper = null,
    innerRef,
  } = props;

  const formRef = useRef<FormikProps<Values>>(null);

  const [stepNumber, setStepNumber] = useState<number>(0);
  const [snapshot, setSnapshot] = useState<Values>(initialValues);

  const steps = useMemo(() => React.Children.toArray(children), [children]);

  const step = useMemo(() => steps[stepNumber], [stepNumber, steps]);
  const totalSteps = useMemo(() => steps.length, [steps.length]);
  const isLastStep = useMemo(
    () => stepNumber === totalSteps - 1,
    [stepNumber, totalSteps],
  );

  // force revalidate form on step change
  React.useEffect(() => {
    if (React.isValidElement(step)) {
      if (formRef.current && step.props?.validationSchema) {
        formRef.current.validateForm();
      }
    }
  }, [step, formRef]);

  // update form state when initial values is changed
  React.useEffect(() => {
    if (formRef.current) {
      formRef.current.setValues(initialValues);
    }
  }, [initialValues]);

  const currentStepRequireIsValid = React.useMemo<boolean>(() => {
    if (React.isValidElement(step)) {
      if (step.props?.requireIsValid === undefined) {
        return true;
      }
      return !!step.props?.requireIsValid;
    }
    return false;
  }, [step]);

  const next = useCallback(
    (values: Values) => {
      setSnapshot(values);
      setStepNumber(Math.min(stepNumber + 1, totalSteps - 1));
    },
    [stepNumber, totalSteps],
  );

  const previous = useCallback(
    (values: Values) => {
      setSnapshot(values);
      setStepNumber(Math.max(stepNumber - 1, 0));
    },
    [stepNumber],
  );

  const handleSubmit = useCallback(
    async (
      values: Values,
      bag: FormikHelpers<Values>,
    ): Promise<void | Response> => {
      try {
        if (!React.isValidElement(step)) {
          return;
        }

        if (step.props?.onSubmit) {
          await step.props.onSubmit(values, bag);
        }
        if (isLastStep) {
          return onSubmit(values, bag);
        } else {
          bag.setTouched({});
          next(values);
        }
      } catch (e) {
        console.log(e);
      }
    },
    [isLastStep, next, onSubmit, step],
  );

  const getControlsConfig = React.useCallback(
    (formik: FormikProps<Values>) => {
      if (!React.isValidElement(step)) {
        return null;
      }

      if (!step.props.validationSchema) {
        return {disableNextButton: false};
      }
      if (currentStepRequireIsValid && !formik.isValid) {
        return {disableNextButton: true};
      }
      return {};
    },
    [currentStepRequireIsValid, step],
  );

  const context = useMemo(
    () => ({
      previous,
      stepNumber,
      isLastStep,
    }),
    [isLastStep, previous, stepNumber],
  ) as WizardContextData;

  const renderControls = useCallback(
    (formik: FormikProps<Values>) => {
      if (!React.isValidElement(step)) {
        return null;
      }

      // in case we want to disable the controls
      if (step.props.disableControls || disableControls) {
        return null;
      }

      if (step.props.customControl) {
        return step.props.customControl({
          previous,
          formik,
          isFormValid: formik.isValid && formik.dirty,
          stepNumber,
        });
      }
      if (customControl) {
        return customControl({
          previous,
          formik,
          isFormValid: formik.isValid && formik.dirty,
          stepNumber,
        });
      }
      return (
        <Controls
          stepNumber={stepNumber}
          formik={formik as FormikProps<any>}
          previous={previous as (values: FormikValues) => void}
          previousButton={step.props.previousButton || previousButton}
          nextButton={step.props.nextButton || nextButton}
          isLastStep={isLastStep}
          hasBackButton={controlProps?.hasBackButton}
          finishButton={finishButton}
          {...getControlsConfig(formik)}
        />
      );
    },
    [
      controlProps?.hasBackButton,
      customControl,
      disableControls,
      finishButton,
      getControlsConfig,
      isLastStep,
      nextButton,
      previous,
      previousButton,
      step,
      stepNumber,
    ],
  );

  if (!React.isValidElement(step)) {
    return null;
  }

  return (
    <WizardContext.Provider value={context}>
      <Formik
        initialValues={snapshot}
        onSubmit={handleSubmit}
        validationSchema={step.props?.validationSchema}
        innerRef={formRef}>
        {formik => (
          <>
            <WizardFormControl innerRef={innerRef} />
            <Center flex={1}>
              {step}
              {stepper}
            </Center>
            {renderControls(formik)}
          </>
        )}
      </Formik>
    </WizardContext.Provider>
  );
};

export default Wizard;
