/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react';
import { Field } from './Field';

export const withFormControl = (Component, componentProps) => (props) => {
  const {
    isRequired,
    helperText,
    errorMessage,
    validator,
    ...restProps
  } = props;

  const {
    name,
    label,
  } = restProps;

  const formControllProps = componentProps?.formControllProps || {};
  const formLabelProps = componentProps?.formLabelProps || {};
  const fieldProps = componentProps?.fieldProps || {};

  return (
    <Field {...fieldProps} validator={validator} {...restProps}>
      {(field, { errors }) => (
        <FormControl
          mb={4}
          isInvalid={errors[field.name]?.error}
          id={`field-${name}`}
          isRequired={isRequired}
          {...formControllProps}
        >
          {label && <FormLabel mt={0} mb={1} fontFamily="Poppins" {...formLabelProps}>{label}</FormLabel>}
          <Component {...restProps} />
          <FormErrorMessage mt={1}>{errorMessage || errors[field.name]?.error}</FormErrorMessage>
          {helperText && <FormHelperText mt={1}>{helperText}</FormHelperText>}
        </FormControl>
      )}
    </Field>
  );
};
