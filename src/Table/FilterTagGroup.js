import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Flex,
  Tooltip,
  Tag,
  TagLabel,
  TagCloseButton,
} from '@chakra-ui/react';
import { TableContext } from './data/context';
import { FILTER_KEY } from './data/constants';
import translation from './Table.translation';

const getFilterState = (state, key) => (state.getKey(FILTER_KEY)?.[key] || [])
  .map((tag) => ({ key, tag }));

const TableFilterTag = ({
  color,
  value,
  filterKey,
  filterTitle,
  configure,
}) => {
  const { t } = translation;
  const { state } = useContext(TableContext);

  const handleRemoveFilterItem = () => {
    const { [filterKey]: target, ...current } = state.getKey(FILTER_KEY);
    const newFilterState = target.filter((label) => label !== value);

    if (newFilterState?.length) {
      state.setKey(FILTER_KEY, {
        ...current,
        [filterKey]: target.filter((label) => label !== value),
      });
    } else {
      state.setKey(FILTER_KEY, { ...current });
    }
  };

  if (configure?.render === false) {
    return null;
  }

  const label = configure ? configure(filterKey, value) : `${filterTitle || filterKey}: ${value}`;

  return (
    <Tag
      size="sm"
      key={`${filterKey}:${value}`}
      borderRadius="full"
      variant="solid"
      colorScheme={color}
    >
      <Tooltip hasArrow label={label} placement="auto">
        <TagLabel isTruncated>{label}</TagLabel>
      </Tooltip>
      <Tooltip hasArrow label={t('removeFilter', 'ui')} placement="auto">
        <Flex>
          <TagCloseButton onClick={handleRemoveFilterItem} />
        </Flex>
      </Tooltip>
    </Tag>
  );
};

TableFilterTag.propTypes = {
  color: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.oneOf([false, true]),
  ]).isRequired,
  filterKey: PropTypes.string.isRequired,
  filterTitle: PropTypes.string,
  configure: PropTypes.oneOfType([PropTypes.func, PropTypes.instanceOf(Object)]),
};

TableFilterTag.defaultProps = {
  color: null,
  filterTitle: '',
  configure: null,
};

export const TableFilterTagGroup = ({
  filterKey,
  filterTitle,
  configure,
  color,
}) => {
  const { state } = useContext(TableContext);
  const appliedFilters = getFilterState(state, filterKey);

  return appliedFilters.map(({ key, tag }) => (
    <TableFilterTag
      key={`${key}${tag}`}
      value={tag}
      filterTitle={filterTitle}
      filterKey={key}
      color={color}
      configure={configure}
    />
  ));
};
