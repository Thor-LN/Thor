import * as yup from 'yup';

export const nodeInfoValidationSchema = yup.object().shape({
  urlString: yup.string().matches(/lndconnect/gi),
});
