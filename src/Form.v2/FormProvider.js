/* eslint-disable react/jsx-no-constructed-context-values */
import React from 'react';
import PropTypes from 'prop-types';
import { FromContext } from './data/formContext';
import { useForm } from './data/useForm';

export const FormProvider = ({ children, ...props }) => {
  const form = useForm(props);
  const { handleReset, handleSubmit } = form;

  return (
    <FromContext.Provider value={{ ...props, ...form }}>
      <form onReset={handleReset} onSubmit={handleSubmit} action="#">
        {typeof children === 'function' ? children(form) : children}
      </form>
    </FromContext.Provider>
  );
};

FormProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.any]).isRequired,
};
