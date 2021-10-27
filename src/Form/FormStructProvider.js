import React from 'react';
import PropTypes from 'prop-types';
import { FromContext } from './data/formContext';
import { useForm } from './data/useForm';

import TextInput from './inputs/Text';
import TextAreaInput from './inputs/TextArea';
import NumberInput from './inputs/Number';
import SwitchInput from './inputs/Switch';
import EmailInput from './inputs/Email';
import DateInput from './inputs/Date';
import RadioGroupInput from './inputs/RadioGroup';

export const FormStructProvider = ({ struct, ...props }) => {
  const form = useForm(props);
  const { handleReset, handleSubmit } = form;

  return (
    <FromContext.Provider value={{ ...props, ...form }}>
      <form onReset={handleReset} onSubmit={handleSubmit} action="#">
        {struct.map(({
          type,
          name,
          label,
          helperText,
          tooltip,
          options,
          props: fieldProps,
        }) => {
          switch (type) {
            case 'text':
              return (
                <TextInput
                  tooltip={tooltip}
                  label={label}
                  helperText={helperText}
                  name={name}
                  {...fieldProps}
                />
              );
            case 'textarea':
              return (
                <TextAreaInput
                  tooltip={tooltip}
                  label={label}
                  helperText={helperText}
                  name={name}
                  {...fieldProps}
                />
              );
            case 'number':
              return (
                <NumberInput
                  tooltip={tooltip}
                  label={label}
                  helperText={helperText}
                  name={name}
                  {...fieldProps}
                />
              );
            case 'switch':
              return (
                <SwitchInput
                  tooltip={tooltip}
                  label={label}
                  helperText={helperText}
                  name={name}
                  {...fieldProps}
                />
              );
            case 'email':
              return (
                <EmailInput
                  tooltip={tooltip}
                  label={label}
                  helperText={helperText}
                  name={name}
                  {...fieldProps}
                />
              );
            case 'date':
              return (
                <DateInput
                  tooltip={tooltip}
                  label={label}
                  helperText={helperText}
                  name={name}
                  {...fieldProps}
                />
              );
            case 'radiogroup':
              return (
                <RadioGroupInput
                  tooltip={tooltip}
                  label={label}
                  helperText={helperText}
                  name={name}
                  options={options}
                  {...fieldProps}
                />
              );
            default:
              return <TextInput />;
          }
        })}
      </form>
    </FromContext.Provider>
  );
};

FormStructProvider.propTypes = {
  struct: PropTypes.oneOfType([PropTypes.array]).isRequired,
};
