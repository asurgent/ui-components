import { Input } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { FieldContext } from '../data/formContext';
import { withFormControl } from '../withWrapper';

const Text = withFormControl((props) => {
  const field = useContext(FieldContext);

  return (
    <Input {...field} {...props} type="text" />
  );
});

export default Text;
