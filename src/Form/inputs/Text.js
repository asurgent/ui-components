/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { FieldContext } from '../data/formContext';
import { withWrapper } from '../withWrapper';

const Text = withWrapper((props) => {
  const field = useContext(FieldContext);

  return (
    <input {...field} type="text" style={{ border: '1px solid black' }} />
  );
});

export { Text };
