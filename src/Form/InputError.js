/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, {
  createRef,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import PropTypes from 'prop-types';
import { FieldContext } from './data/formContext';

export const InputError = ({
  children,
  name,
  ...props
}) => {
  const field = useContext(FieldContext);
  console.log(field);
  return (
    <p>
      hello
    </p>
  );
};

InputError.propTypes = {
  children: PropTypes.oneOfType([PropTypes.any]).isRequired,
};
