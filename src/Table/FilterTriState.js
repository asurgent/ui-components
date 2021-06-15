import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Stack,
  ButtonGroup,
  IconButton,
  Text,
} from '@chakra-ui/react';
import MdiIcon from '@mdi/react';
import {
  mdiCheck,
  mdiCancel,
} from '@mdi/js';
import { TableContext } from './data/context';
import { FILTER_KEY } from './data/constants';

export const TableFilterTriState = ({
  title,
  label,
  filterKey,
}) => {
  const { state } = useContext(TableContext);
  const appliedFilterState = state.getKey(FILTER_KEY)?.[filterKey]?.[0];

  const handleClearFilter = () => {
    const { [filterKey]: target, ...current } = state.getKey(FILTER_KEY);
    state.setKey(FILTER_KEY, { ...current });
  };

  const handleSetToTrue = () => {
    const { [filterKey]: target, ...current } = state.getKey(FILTER_KEY);
    state.setKey(FILTER_KEY, { [filterKey]: [true], ...current });
  };

  const handleSetToFalse = () => {
    const { [filterKey]: target, ...current } = state.getKey(FILTER_KEY);
    state.setKey(FILTER_KEY, { [filterKey]: [false], ...current });
  };

  const isTrue = appliedFilterState === true;
  const isFalse = appliedFilterState === false;

  return (
    <Stack>
      { title && (
        <Text fontSize="xs" mt={1}>
          {title}
        </Text>
      )}
      <ButtonGroup size="sm" isAttached variant="outline">
        <IconButton
          colorScheme={isFalse ? 'red' : 'gray'}
          variant={isFalse ? 'solid' : 'outline'}
          onClick={handleSetToFalse}
          icon={(<MdiIcon path={mdiCancel} size={0.8} />)}
        />
        <Button mr="-px" onClick={handleClearFilter}>
          {label}
        </Button>
        <IconButton
          colorScheme={isTrue ? 'green' : 'gray'}
          variant={isTrue ? 'solid' : 'outline'}
          onClick={handleSetToTrue}
          icon={(<MdiIcon path={mdiCheck} size={0.8} />)}
        />
      </ButtonGroup>
    </Stack>
  );
};

TableFilterTriState.propTypes = {
  title: PropTypes.string,
  label: PropTypes.string.isRequired,
  filterKey: PropTypes.string.isRequired,
};

TableFilterTriState.defaultProps = {
  title: '',
};
