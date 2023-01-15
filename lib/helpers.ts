// export yup helper form scheme
import * as Yup from 'yup';

export const FormSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .matches(/\w*[a-z]\w*/, 'Password must have a small letter')
      .matches(/\w*[A-Z]\w*/, 'Password must have a capital letter')
      .matches(/\d/, 'Password must have a number')
      .matches(
        /[!@#$%^&*()\-_"=+{}; :,<.>]/,
        'Password must have a special character'
      )
      .min(8, ({ min }) => `Password must be at least ${min} characters`)
      .required('Password is required'),
  });
  export const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
  });