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

// const useRepeatGroup = () => {
//   const {
//     name, min, numberOfGroups,
//   } = useContext(GroupContext);
//   const { dispatch, state, initialValues } = useContext(FromContext);

//   useEffect(() => {
//     const group = initialValues?.[name];
//     const total = group?.length > (min || 0) ? group?.length : min;
//     const newGroup = Array.from(Array(total || 0), (_, i) => group[i] || ({}));
//     dispatch({
//       type: 'UPDATE_VALUE',
//       payload: { name, value: newGroup },
//     });
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [min]);

//   const groups = useMemo(() => {
//     const group = (state.values?.[name] || []);

//     return group.map((_, index) => ({
//       key: `${index}-${new Date().getTime()}`,
//       initialValues: state.values[name]?.[index] || {},
//       initialErrors: state.errors[name]?.[index] || {},
//     }));
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [numberOfGroups]);

//   return groups;
// };

export const Row = ({
  index,
  initialValues,
  initialErrors,
  children,
}) => {
  const { name, formatter } = useContext(GroupContext);

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
    initialValues,
    initialErrors,
    onChange: (values) => group.handleRepeatGroupChange(values, name, index),
  });

  useEffect(() => {
    registerGroup({ name: name + index, ...group });

    return () => {
      unregisterGroup({ name: name + index, ...group });
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
    return children();
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
  const {
    state,
    dispatch,
    initialValues,
  } = useContext(FromContext);

  // useEffect(() => {
  //   const group = initialValues?.[name];
  //   const total = group?.length > (min || 0) ? group?.length : min;
  //   const newGroup = Array.from(Array(total || 0), (_, i) => group[i] || ({}));
  //   const message = {
  //     type: 'UPDATE_VALUE',
  //     payload: { name, value: newGroup },
  //   };
  //   dispatch(message);
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [min]);

  const numberOfGroups = useMemo(() => state.values?.[name]?.length,
    [name, state.values]);

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
