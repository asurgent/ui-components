import { RadioGroup, Radio, Stack } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { FieldContext } from '../data/formContext';
import { withFormControl } from '../withWrapper';

const RadioGroupComponent = withFormControl((props) => {
  const {
    name,
    onChange,
    value: selected,
  } = useContext(FieldContext);
  const { direction, options } = props;

  return (
    <RadioGroup
      name={name}
      onChange={(val) => onChange({ target: { value: val, name } })}
      value={selected}
    >
      <Stack direction={direction || 'row'}>
        { options.map(({ value, label }) => (
          <Radio value={`${value}`} key={value}>{label}</Radio>
        ))}
      </Stack>
    </RadioGroup>
  );
});

export default RadioGroupComponent;
