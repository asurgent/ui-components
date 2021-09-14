/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, {
  createRef,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import {
  Wrap,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react';
import { InputError } from './InputError';
import { Field } from './Field';

export const withWrapper = (Component, { formControllProps, formLabelProps }) => (props) => {
  const {
    name,
    validator,
    label,
    isRequired,
    helperText,
  } = props;

  return (
    <Field name={name} validator={validator}>
      <FormControl id={`field-${name}`} isRequired={isRequired} {...formControllProps}>
        {label && <FormLabel {...formLabelProps}>{label}</FormLabel>}
        <Component {...props} />
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
        <InputError />
      </FormControl>
    </Field>
  );
};
