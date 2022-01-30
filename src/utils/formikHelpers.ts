import {FormikErrors, FormikTouched} from 'formik';

export const hasErrors = (
  name: string,
  touched: FormikTouched<any>,
  errors: FormikErrors<any>,
) => {
  return !!(touched[name] && errors[name]);
};

export const errorMessage = (
  name: string,
  touched: FormikTouched<any>,
  errors: FormikErrors<any>,
) => {
  return touched[name] && errors[name];
};
