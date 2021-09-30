/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useMemo } from 'react';
import { Button, IconButton, Flex } from '@chakra-ui/react';
import MdiIcon from '@mdi/react';
import { mdiClose } from '@mdi/js';
import { FromContext, GroupContext } from '../data/formContext';
import { useForm } from '../data/formHook';

export const Row = ({ index, children }) => {
  const {
    name,
    min,
    numberOfGroups,
    formatter,
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
    onChange: (values) => group.handleRepeatGroupChange(values, name, index),
  });

  useEffect(() => {
    registerGroup({ name: name + index, ...group });

    return () => {
      unregisterGroup({ name: name + index, ...group });
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onRemoveGroup = () => clearRepeatGroup(name, index, min);

  return (
    <FromContext.Provider value={{ ...group, index }}>
      <Flex>
        {children}
        <IconButton
          mt={8}
          ml={3}
          isRound
          colorScheme="red"
          icon={<MdiIcon path={mdiClose} size={0.6} />}
          disabled={min && min === numberOfGroups}
          size="sm"
          onClick={onRemoveGroup}
        >
          Kill
        </IconButton>
      </Flex>
    </FromContext.Provider>
  );
};

export const GroupRepeat = ({ children, addNewButton, ...props }) => {
  const { min, max, name } = props;
  const {
    state,
    dispatch,
    appendRepeatGroup,
  } = useContext(FromContext);

  useEffect(() => {
    const group = state.values?.[name];
    const newGroup = Array.from(Array(min || 0), (_, i) => group[i] || ({}));
    const message = {
      type: 'UPDATE_VALUE',
      payload: { name, value: newGroup },
    };
    dispatch(message);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [min]);

  const numberOfGroups = useMemo(() => state.values?.[name]?.length,
    [name, state.values]);

  const groups = useMemo(() => {
    const group = (state.values?.[name] || []);
    return group.map((_, index) => `${index}-${new Date().getTime()}`);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numberOfGroups]);

  return (
    <GroupContext.Provider value={{ numberOfGroups, ...props }}>
      {groups?.map((key, idx) => (
        <Row key={key} index={idx} {...props}>{children}</Row>
      ))}
      <Button
        colorScheme="green"
        disabled={max && max === numberOfGroups}
        variant="outline"
        onClick={() => appendRepeatGroup(name, max)}
      >
        Add
      </Button>
    </GroupContext.Provider>
  );
};
export default GroupRepeat;
