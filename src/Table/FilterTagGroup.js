import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Tooltip,
  Tag,
  TagLabel,
  WrapItem,
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

  const label = configure ? configure(filterKey, value) : `${filterTitle || filterKey}: ${value}`;

  return (
    <Tooltip hasArrow label={t('removeFilter', 'ui')} placement="auto">
      <Tag
        size="sm"
        key={`${filterKey}:${value}`}
        borderRadius="full"
        variant="solid"
        colorScheme={color}
      >
        <TagLabel isTruncated>{label}</TagLabel>
        <TagCloseButton onClick={handleRemoveFilterItem} />
      </Tag>
    </Tooltip>
  );
};

TableFilterTag.propTypes = {
  color: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
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
    <WrapItem key={`${key}:${tag}`}>
      <TableFilterTag
        value={tag}
        filterTitle={filterTitle}
        filterKey={key}
        color={color}
        configure={configure}
      />
    </WrapItem>
  ));
};
