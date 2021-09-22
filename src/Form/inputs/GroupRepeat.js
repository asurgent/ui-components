/* eslint-disable react/prop-types */
import React, { useContext, useEffect } from 'react';
import { Button } from '@chakra-ui/react';
import { FromContext, GroupContext } from '../data/formContext';
import { useGroupRepeat } from '../data/groupHook';

const Row = ({ index, children }) => {
  const { name, min, numberOfGroups } = useContext(GroupContext);
  const { clearRepeatGroup, ...form } = useContext(FromContext);
  const pattern = useGroupRepeat({ form, name, index });

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
    <FromContext.Provider value={{ ...form, ...pattern, index }}>
      {children}
      <Button colorScheme="red" disabled={min === numberOfGroups} variant="outline" onClick={onRemoveGroup}>kill</Button>
    </FromContext.Provider>
  );
};

const GroupRepeat = ({
  min,
  max,
  name,
  children,
  ...props
}) => {
  const {
    state,
    registerField,
    unregisterField,
    appendRepeatGroup,
  } = useContext(FromContext);

  useEffect(() => {
    registerField({ name, ...props });

    return () => {
      unregisterField({ name, ...props });
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const numberOfGroups = state.values?.[name].length;
  const onAddGroup = () => {
    if (typeof parseInt(max, 10) === 'number') {
      console.log(max, numberOfGroups, max < numberOfGroups);
      if (max > numberOfGroups) {
        appendRepeatGroup(name);
      }
    } else {
      appendRepeatGroup(name);
    }
  };

  return (
    <GroupContext.Provider value={{
      min, max, name, numberOfGroups,
    }}
    >
      {[...Array(numberOfGroups)].map((e, i) => (
        <Row key={i} index={i} restProps={props}>{children}</Row>
      ))}
      <Button colorScheme="green" disabled={max === numberOfGroups} variant="outline" onClick={onAddGroup}>add</Button>
    </GroupContext.Provider>
  );
};

export default GroupRepeat;
