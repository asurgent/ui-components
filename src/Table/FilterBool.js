import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Switch, Stack, Text } from '@chakra-ui/react';

import { TableContext } from './data/context';
import { FILTER_KEY } from './data/constants';

export const TableFilterBool = ({
  filterKey, title, labelSize, switchSize,
}) => {
  const { state } = useContext(TableContext);
  const appliedFilterState = state.getKey(FILTER_KEY)?.[filterKey]?.[0];

  const handleClearFilter = () => {
    const { [filterKey]: target, ...current } = state.getKey(FILTER_KEY);
    state.setKey(FILTER_KEY, { ...current });
  };

  const handleActivateFilter = () => {
    const { [filterKey]: target, ...current } = state.getKey(FILTER_KEY);
    state.setKey(FILTER_KEY, { [filterKey]: [true], ...current });
  };

  return (
    <Stack>
      { title && (
        <Text fontSize={labelSize} mt={1}>
          {title}
        </Text>
      )}
      <Switch
        size={switchSize}
        colorScheme="asurgent"
        isChecked={appliedFilterState === true}
        onChange={() => (appliedFilterState === true
          ? handleClearFilter()
          : handleActivateFilter()
        )}
      />
    </Stack>
  );
};

TableFilterBool.propTypes = {
  title: PropTypes.string,
  filterKey: PropTypes.string.isRequired,
  labelSize: PropTypes.string,
  switchSize: PropTypes.string,
};

TableFilterBool.defaultProps = {
  title: '',
  labelSize: 'xs',
  switchSize: 'lg',
};
