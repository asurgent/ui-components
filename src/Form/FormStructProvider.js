import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from '@chakra-ui/react';
import { FromContext } from './data/formContext';
import { useForm } from './data/useForm';

import TextInput from './inputs/Text';
import TextAreaInput from './inputs/TextArea';
import NumberInput from './inputs/Number';
import SwitchInput from './inputs/Switch';
import EmailInput from './inputs/Email';
import DateInput from './inputs/Date';
import RadioGroupInput from './inputs/RadioGroup';
import FilterSelect from './inputs/FilterSelect';

export const FormStructProvider = ({
  struct, services, children, ...props
}) => {
  const form = useForm(props);
  const { handleReset, handleSubmit } = form;

  return (
    <FromContext.Provider value={{ ...props, ...form }}>
      <form onReset={handleReset} onSubmit={handleSubmit} action="#">
        <Flex flexDirection="column">
          {struct.map(({
            type,
            name,
            label,
            helperText,
            tooltip,
            options,
            service,
            placeholder,
            facet,
            props: fieldProps,
          }) => {
            switch (type) {
              case 'text':
                return (
                  <TextInput
                    key={name}
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
                    key={name}
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
                    key={name}
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
                    key={name}
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
                    key={name}
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
                    key={name}
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
                    key={name}
                    tooltip={tooltip}
                    label={label}
                    helperText={helperText}
                    name={name}
                    options={options}
                    {...fieldProps}
                  />
                );
              case 'filterSelect':
                return (
                  <FilterSelect
                    key={name}
                    label={label}
                    name={name}
                    tooltip={tooltip}
                    helperText={helperText}
                    filterPlaceholder={placeholder}
                    facet={facet || services?.[name]?.facet}
                    service={service || services?.[name]?.service}
                    {...fieldProps}
                  />
                );
              default:
                return <TextInput />;
            }
          })}
        </Flex>
        {typeof children === 'function' ? children(form) : children}
      </form>
    </FromContext.Provider>
  );
};

FormStructProvider.defaultProps = {
  services: {},
};
FormStructProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.any]).isRequired,
  struct: PropTypes.oneOfType([PropTypes.array]).isRequired,
  services: PropTypes.instanceOf(Object),
};
