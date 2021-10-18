import PropTypes from 'prop-types';
import React, {
  useMemo,
  useEffect,
  useContext,
  useRef,
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
import { useRepeatGroup } from '../data/useRepeatGroup';
import translation from '../Form.translation';

export const Row = ({
  index,
  rowName,
  initialValues,
  initialErrors,
  errorReference,
  children,
}) => {
  const parent = useContext(FromContext);
  const { handleGroupValidation, handleRepeatGroupChange } = useRepeatGroup();

  const group = useForm({
    ...parent,
    parent,
    initialValues,
    initialErrors,
    onChange: (values) => handleRepeatGroupChange(values, index),
    onFieldError: (err) => {
      // eslint-disable-next-line no-param-reassign
      errorReference.current[index] = err;
      handleGroupValidation(errorReference.current);
    },
    onFieldValid: () => {
      // eslint-disable-next-line no-param-reassign
      delete errorReference.current[index];
      handleGroupValidation(errorReference.current);
    },
  });

  useEffect(() => {
    const { registerField, unregisterField } = parent;
    registerField({ name: rowName, group }, true);

    return () => {
      unregisterField({ name: rowName }, true);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FromContext.Provider value={{ ...group, index }}>
      {children}
    </FromContext.Provider>
  );
};

Row.propTypes = {
  children: PropTypes.oneOfType([PropTypes.any]).isRequired,
  rowName: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  initialValues: PropTypes.instanceOf(Object),
  initialErrors: PropTypes.instanceOf(Object),
  errorReference: PropTypes.instanceOf(Object).isRequired,
};
Row.defaultProps = {
  initialValues: {},
  initialErrors: {},
};

export const RepeatGroup = ({ children }) => {
  const errorReference = useRef({});
  const { t } = translation;
  const { clearRepeatGroup, groups } = useRepeatGroup(true);
  const { min, numberOfGroups, name } = useContext(GroupContext);
  const disabled = useMemo(() => (min && min >= numberOfGroups), [min, numberOfGroups]);

  return (
    groups?.map(({ key, initialValues, initialErrors }, index) => (
      <Row
        errorReference={errorReference}
        key={key}
        index={index}
        rowName={name + index}
        initialValues={initialValues}
        initialErrors={initialErrors}
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
            borderBottom="1px solid"
            borderColor="gray.300"
            _last={{ borderBottom: 'none' }}
            flexDirection="column"
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

RepeatGroup.propTypes = {
  children: PropTypes.oneOfType([PropTypes.any]).isRequired,
};

export const RepeatAddRow = ({ children, colorScheme, ...props }) => {
  const { t } = translation;
  const { appendRepeatGroup } = useRepeatGroup();
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

RepeatAddRow.propTypes = {
  children: PropTypes.oneOfType([PropTypes.any]),
  colorScheme: PropTypes.string,
};
RepeatAddRow.defaultProps = {
  children: null,
  colorScheme: 'gray',
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

RepeatHeader.propTypes = {
  children: PropTypes.oneOfType([PropTypes.any]).isRequired,
};

export const RepeatEmptyState = ({ children, icon }) => {
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

RepeatEmptyState.propTypes = {
  children: PropTypes.oneOfType([PropTypes.any]).isRequired,
  icon: PropTypes.oneOfType([PropTypes.any]),
};
RepeatEmptyState.defaultProps = {
  icon: mdiAlertDecagram,
};

export const RepeatInput = ({
  children,
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

RepeatInput.propTypes = {
  children: PropTypes.oneOfType([PropTypes.any]).isRequired,
  name: PropTypes.string.isRequired,
  min: PropTypes.oneOfType([PropTypes.number, PropTypes.instanceOf(null)]),
  max: PropTypes.oneOfType([PropTypes.number, PropTypes.instanceOf(null)]),
};
RepeatInput.defaultProps = {
  min: null,
  max: null,
};
