import { Textarea } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { FieldContext } from '../data/formContext';
import { withFormControl } from '../withWrapper';

const TextArea = withFormControl((props) => {
  const field = useContext(FieldContext);

  return (
    <Textarea {...field} {...props} />
  );
});

export default TextArea;
