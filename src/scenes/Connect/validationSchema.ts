import * as yup from 'yup';

export const urlStringTest = yup
  .string()
  .matches(/lndconnect/gi)
  .required();

export const nodeInfoValidationSchema = yup.object().shape({
  urlString: urlStringTest,
});
