/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Tooltip,
} from '@chakra-ui/react';
import MdiIcon from '@mdi/react';
import { mdiHelpCircleOutline } from '@mdi/js';
import { Field } from './Field';

export const withFormControl = (Component, componentProps) => (props) => {
  const {
    isRequired,
    helperText,
    errorMessage,
    validator,
    tooltip,
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
          {label && (
          <FormLabel
            mt={0}
            mb={1}
            mr={0}
            fontFamily="Poppins"
            {...formLabelProps}
            flexDirection="row"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            {label}
            {tooltip && (
              <Tooltip
                hasArrow
                label={tooltip}
                placement="auto"
              >
                <MdiIcon path={mdiHelpCircleOutline} size={0.7} />
              </Tooltip>
            )}
          </FormLabel>
          )}
          <Component {...restProps} />
          <FormErrorMessage mt={1}>{errorMessage || errors[field.name]?.error}</FormErrorMessage>
          {helperText && <FormHelperText mt={1}>{helperText}</FormHelperText>}
        </FormControl>
      )}
    </Field>
  );
};
