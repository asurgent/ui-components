/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useContext, useEffect } from 'react';
import { Button } from '@chakra-ui/react';
import { FromContext, GroupContext } from '../data/formContext';
import { useForm } from '../data/formHook';

const Row = ({ index, children }) => {
  const {
    name, min, numberOfGroups, formatter,
  } = useContext(GroupContext);
  const {
    registerGroup,
    unregisterGroup,
    clearRepeatGroup,
    ...form
  } = useContext(FromContext);

  const group = useForm({
    ...form,
    name,
    index,
    formatter,
    initialValues: form.state.values[name]?.[index] || {},
    initialErrors: form.state.errors[name]?.[index] || {},
    onChange: (values) => {
      const groupValues = form.state.values[name];
      if (groupValues) {
        const newGroupValues = groupValues.map((item, i) => (index === i ? { ...values } : item));
        form.handleChange({ target: { name, value: newGroupValues } });
      } else {
        form.handleChange({ target: { name, value: [{ ...values }] } });
      }
    },
  });

  useEffect(() => {
    registerGroup({ name: name + index, ...group });

    return () => {
      unregisterGroup({ name: name + index, ...group });
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onRemoveGroup = () => {
    if (typeof parseInt(min, 10) === 'number') {
      if (min < numberOfGroups) {
        clearRepeatGroup(name, index);
      }
    } else {
      clearRepeatGroup(name, index);
    }
  };

  return (
    <FromContext.Provider value={{ ...group, index }}>
      {children}
      <Button
        colorScheme="red"
        disabled={min === numberOfGroups}
        variant="outline"
        onClick={onRemoveGroup}
      >
        Kill
      </Button>
    </FromContext.Provider>
  );
};

const GroupRepeat = ({ children, ...props }) => {
  const { max, name } = props;
  const { state, appendRepeatGroup } = useContext(FromContext);

  const numberOfGroups = state.values?.[name]?.length;

  const onAddGroup = () => {
    if (typeof parseInt(max, 10) === 'number') {
      if (max > numberOfGroups) {
        appendRepeatGroup(name);
      }
    } else {
      appendRepeatGroup(name);
    }
  };

  return (
    <GroupContext.Provider value={{ numberOfGroups, ...props }}>
      {[...Array(numberOfGroups)].map((e, i) => (
        <Row key={i} index={i} {...props}>{children}</Row>
      ))}
      <Button
        colorScheme="green"
        disabled={max === numberOfGroups}
        variant="outline"
        onClick={onAddGroup}
      >
        Add
      </Button>
    </GroupContext.Provider>
  );
};

export default GroupRepeat;
