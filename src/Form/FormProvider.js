/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, {
  useCallback, useRef, useEffect, useReducer,
} from 'react';
import PropTypes from 'prop-types';
import { FromContext } from './data/formContext';
import { useForm } from './data/formHook';

export const FormProvider = ({
  children,
  ...props
  // validateOnChange,
  // initialValues,
  // initialErrors,
  // validators,
  // onSubmit,
  // onReset,
  // onChange,
}) => {
  const form = useForm(props);
  const { handleReset, handleSubmit } = form;

  return (
    <FromContext.Provider value={{ ...form }}>
      <form onReset={handleReset} onSubmit={handleSubmit} action="#">
        {typeof children === 'function' ? children(form) : children}
      </form>
    </FromContext.Provider>
  );
};

FormProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.any]).isRequired,
};
