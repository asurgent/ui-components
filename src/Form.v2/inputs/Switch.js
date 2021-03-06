import { Switch } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { FieldContext } from '../data/formContext';
import { withFormControl } from '../withWrapper';

const SwitchComponent = withFormControl((props) => {
  const {
    name,
    value,
    onChange,
  } = useContext(FieldContext);

  return (
    <Switch
      {...props}
      isChecked={value}
      name={name}
      onChange={({ target }) => onChange({ target: { value: target.checked, name } })}
    />
  );
});

export default SwitchComponent;
