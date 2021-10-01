/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, {
  useContext, useEffect, useMemo,
} from 'react';
import {
  Button, CloseButton, Flex,
} from '@chakra-ui/react';
import { FromContext, GroupContext } from '../data/formContext';
import { useForm } from '../data/useForm';
import { useRepeatGroup } from '../data/useRepeatGroup';

export const Row = ({
  index,
  initialValues,
  initialErrors,
  children,
}) => {
  const { name } = useContext(GroupContext);
  const parent = useContext(FromContext);
  const group = useForm({
    ...parent,
    name,
    index,
    initialValues,
    initialErrors,
    onChange: (values) => group.handleRepeatGroupChange(values, name, index),
  });

  useEffect(() => {
    const { registerField, unregisterField } = parent;
    registerField({ name: name + index, ...group }, true);

    return () => {
      unregisterField({ name: name + index, ...group }, true);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FromContext.Provider value={{ ...group, index }}>
      <Flex>
        {children}
      </Flex>
    </FromContext.Provider>
  );
};

export const RepeatPattern = ({ children, forwardProps }) => {
  const groups = useRepeatGroup();
  const { clearRepeatGroup } = useContext(FromContext);
  const {
    min,
    max,
    name,
    numberOfGroups,
  } = useContext(GroupContext);

  return (
    groups?.map(({ key, initialValues, initialErrors }, index) => (
      <Row
        key={key}
        index={index}
        initialValues={initialValues}
        initialErrors={initialErrors}
        {...forwardProps}
      >
        { typeof children === 'function' && (
          children({
            min,
            max,
            numberOfGroups,
            onRemoveGroup: () => clearRepeatGroup(name, index, min),
          })
        ) }
        {typeof children !== 'function' && (
          <>
            {children}
            <CloseButton
              mt={8}
              ml={1}
              disabled={min && min === numberOfGroups}
              size="md"
              onClick={() => clearRepeatGroup(name, index, min)}
            />
          </>
        )}
      </Row>
    ))
  );
};

export const RepeatAddRow = ({ children, colorScheme, ...props }) => {
  const { appendRepeatGroup } = useContext(FromContext);
  const {
    name, max, numberOfGroups,
  } = useContext(GroupContext);

  if (typeof children === 'function') {
    return children({
      max,
      name,
      numberOfGroups,
      appendRepeatGroup,
    });
  }

  return (
    <Button
      colorScheme={colorScheme}
      disabled={max && max === numberOfGroups}
      onClick={() => appendRepeatGroup(name, max)}
      {...props}
    >
      {children}
    </Button>
  );
};

export const RepeatGroup = ({ children, ...props }) => {
  const { min, max, name } = props;
  const { state } = useContext(FromContext);
  const numberOfGroups = useMemo(() => state.values?.[name]?.length, [name, state.values]);

  const ctxValue = {
    numberOfGroups,
    name,
    min,
    max,
  };

  return (
    <GroupContext.Provider value={ctxValue}>
      {children}
    </GroupContext.Provider>
  );
};
