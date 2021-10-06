/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, {
  useMemo,
  useEffect,
  useContext,
} from 'react';
import {
  Flex,
  Button,
  CloseButton,
  IconButton,
  Tooltip,
  Box,
} from '@chakra-ui/react';
import MdiIcon from '@mdi/react';
import { mdiPlus, mdiAlertDecagram } from '@mdi/js';
import { FromContext, GroupContext } from '../data/formContext';
import { useForm } from '../data/useForm';
import { useRepeatPattern } from '../data/useRepeatPattern';
import translation from '../Form.translation';

export const Row = ({
  name,
  index,
  initialValues,
  initialErrors,
  children,
}) => {
  const parent = useContext(FromContext);
  const { handleRepeatGroupChange } = useRepeatPattern();
  const group = useForm({
    ...parent,
    name,
    index,
    initialValues,
    initialErrors,
    onChange: (values) => handleRepeatGroupChange(values, index),
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
      {children}
    </FromContext.Provider>
  );
};

export const RepeatPattern = ({ children, forwardProps }) => {
  const { t } = translation;
  const { clearRepeatGroup, groups } = useRepeatPattern(true);
  const { min, numberOfGroups, name } = useContext(GroupContext);
  const disabled = useMemo(() => (min && min >= numberOfGroups), [min, numberOfGroups]);

  return (
    groups?.map(({ key, initialValues, initialErrors }, index) => (
      <Row
        key={key}
        name={name}
        index={index}
        initialValues={initialValues}
        initialErrors={initialErrors}
        {...forwardProps}
      >
        { typeof children === 'function' && (
          children({
            disabled,
            onAddRow: () => clearRepeatGroup(index),
          })
        )}

        {typeof children !== 'function' && (
          <Flex
            marginX={2}
            p={4}
            pb={0}
            borderBottom="1px solid"
            borderColor="gray.300"
            _last={{ borderBottom: 'none' }}
          >
            {children}
            <Tooltip
              hasArrow
              label={disabled ? t('removeRowDisabled', 'ui') : t('removeRow', 'ui')}
              placement="auto"
            >
              <CloseButton
                mt={8}
                ml={1}
                disabled={disabled}
                size="md"
                onClick={() => clearRepeatGroup(index)}
              />
            </Tooltip>
          </Flex>
        )}
      </Row>
    ))
  );
};

export const RepeatAddRow = ({ children, colorScheme, ...props }) => {
  const { t } = translation;
  const { appendRepeatGroup } = useRepeatPattern();
  const { max, numberOfGroups } = useContext(GroupContext);
  const disabled = useMemo(() => (max && max === numberOfGroups), [max, numberOfGroups]);

  if (typeof children === 'function') {
    return children({
      disabled,
      onAddRow: () => appendRepeatGroup(),
    });
  }

  return (
    <Tooltip hasArrow label={disabled ? t('addRowDisabled', 'ui') : t('addRow', 'ui')} placement="auto">
      <Button
        colorScheme={colorScheme}
        disabled={disabled}
        onClick={() => appendRepeatGroup()}
        {...props}
      >
        {children}
      </Button>
    </Tooltip>
  );
};

export const RepeatHeader = ({ children }) => {
  const { t } = translation;
  return (
    <Flex p={4} borderBottom="1px solid" borderColor="gray.300" justifyContent="space-between">
      <Flex flexDirection="column">
        {children}
      </Flex>

      <RepeatAddRow>
        {({ onAddRow, disabled }) => (
          <Tooltip
            hasArrow
            label={disabled ? t('addRowDisabled', 'ui') : t('addRow', 'ui')}
            placement="auto"
          >
            <IconButton
              ml={2}
              size="xs"
              disabled={disabled}
              onClick={onAddRow}
              aria-label="Search database"
              icon={<MdiIcon path={mdiPlus} />}
            />
          </Tooltip>
        )}
      </RepeatAddRow>
    </Flex>
  );
};

export const RepeatEmptyState = ({ children, icon = mdiAlertDecagram }) => {
  const { numberOfGroups } = useContext(GroupContext);

  if (numberOfGroups === 0 || !numberOfGroups) {
    return (
      <Flex borderRadius="5px" backgroundColor="gray.800" m={4} color="white">
        <Flex
          width="60px"
          alignItems="center"
          borderLeftRadius="5px"
          justifyContent="center"
          backgroundColor="blue.400"
        >
          <MdiIcon path={icon} size={1.2} />
        </Flex>
        <Flex flex="1" flexDirection="column" p={3} fontSize="small">
          {children}
        </Flex>
      </Flex>
    );
  }

  return null;
};

export const RepeatGroup = ({
  children,
  addRowHeader,
  ...props
}) => {
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
      <Box borderRadius="5px" border="1px solid" borderColor="gray.300">
        {children}
      </Box>
    </GroupContext.Provider>
  );
};
