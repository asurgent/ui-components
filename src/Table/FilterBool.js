import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Switch, Stack, Text } from '@chakra-ui/react';

import { TableContext } from './data/context';
import { FILTER_KEY } from './data/constants';

const StackComp = ({ horizontal, children }) => {
  if (horizontal) {
    return (
      <Stack display="flex" direction="row-reverse" alignItems="center">
        <>
          {children}
        </>
      </Stack>
    );
  }
  return (
    <Stack>
      <>
        {children}
      </>
    </Stack>
  );
};
StackComp.propTypes = {
  children: PropTypes.oneOfType([PropTypes.any]).isRequired,
  horizontal: PropTypes.bool.isRequired,
};

export const TableFilterBool = ({
  filterKey, title, labelSize, switchSize, horizontal,
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
    <StackComp horizontal={horizontal}>
      { title && (
        <Text fontSize={labelSize} ml={horizontal ? 2 : 0}>
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
    </StackComp>
  );
};

TableFilterBool.propTypes = {
  title: PropTypes.string,
  filterKey: PropTypes.string.isRequired,
  labelSize: PropTypes.string,
  switchSize: PropTypes.string,
  horizontal: PropTypes.bool,
};

TableFilterBool.defaultProps = {
  title: '',
  labelSize: 'sm',
  switchSize: 'lg',
  horizontal: false,
};
