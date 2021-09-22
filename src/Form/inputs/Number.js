/* eslint-disable no-unused-vars */
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';
import React, { useContext } from 'react';
import { FieldContext } from '../data/formContext';
import { withFormControl } from '../withWrapper';

const Number = withFormControl((props) => {
  const {
    name,
    value,
    onChange,
  } = useContext(FieldContext);

  return (
    <NumberInput
      value={value}
      onChange={(val) => onChange({ target: { value: val * 1, name } })}
      {...props}
    >
      <NumberInputField name={name} value={value} />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  );
}, {
  fieldProps: {
    type: 'number',
    asInt: true,
    asBool: false,
    asString: false,
  },
});

export default Number;
