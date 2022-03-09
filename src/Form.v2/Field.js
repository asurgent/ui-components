/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, {
  useContext,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { FromContext, FieldContext } from './data/formContext';

export const Field = ({
  children,
  name,
  ...props
}) => {
  const {
    getFieldProps,
    unregisterField,
    registerField,
    state,
  } = useContext(FromContext);

  useEffect(() => {
    registerField({ name, ...props });

    return () => unregisterField({ name, ...props });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = getFieldProps({ name, ...props });

  return (
    <FieldContext.Provider value={value}>
      {typeof children === 'function' ? children(value, state) : children}
    </FieldContext.Provider>
  );
};

Field.propTypes = {
  children: PropTypes.oneOfType([PropTypes.any]).isRequired,
};
