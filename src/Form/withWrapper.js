/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import {
  Wrap,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react';
import { Field } from './Field';

export const withFormControl = (Component, componentProps) => (props) => {
  const {
    name,
    validator,
    label,
    isRequired,
    helperText,
    errorMessage,
  } = props;

  const formControllProps = componentProps?.formControllProps || {};
  const formLabelProps = componentProps?.formLabelProps || {};
  const fieldProps = componentProps?.fieldProps || {};

  return (
    <Field name={name} validator={validator} {...fieldProps}>
      {(field, { errors }) => (
        <FormControl
          mb={4}
          isInvalid={errors[field.name]}
          id={`field-${name}`}
          isRequired={isRequired}
          {...formControllProps}
        >
          {label && <FormLabel mt={0} mb={1} fontFamily="Poppins" {...formLabelProps}>{label}</FormLabel>}
          <Component {...props} />
          <FormErrorMessage mt={1}>{errorMessage || errors[field.name]}</FormErrorMessage>
          {helperText && <FormHelperText mt={1}>{helperText}</FormHelperText>}
        </FormControl>
      )}
    </Field>
  );
};
