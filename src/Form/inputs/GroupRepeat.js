/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useContext, useEffect } from 'react';
import { Button } from '@chakra-ui/react';
import { FromContext, GroupContext } from '../data/formContext';
import { useGroupRepeat } from '../data/groupHook';

const Row = ({ index, children }) => {
  const { name, min, numberOfGroups } = useContext(GroupContext);
  const {
    clearRepeatGroup,
    ...form
  } = useContext(FromContext);

  const pattern = useGroupRepeat({ form, name, index });

  // const childrenWithProps = React.Children.map(children, (child) => {
  //   if (React.isValidElement(child)) {
  //     return React.cloneElement(child, {
  //       ...child.props,
  //       name: `${child.props.name}`,
  //     });
  //   }
  //   return child;
  // });

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

  const numberOfGroups = state.values?.[name].length;

  const validators = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return { validator: child.props.validator };
    }
    return child;
  });

  useEffect(() => {
    const groupValidator = (event) => {
      const { groupIndex } = event;
      if (validators[groupIndex]?.validator) {
        const { validator } = validators[groupIndex];
        const result = validator(event);
        console.log(result);
        return result;
      }
      console.log('first', event);
      return null;
    };

    registerField({ name, validator: groupValidator, ...props });

    return () => {
      unregisterField({ name, ...props });
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    <GroupContext.Provider value={{
      min, max, name, numberOfGroups,
    }}
    >
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
