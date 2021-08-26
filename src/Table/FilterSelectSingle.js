import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { FilterContentComponent, FilterSelectComponent } from './shared/FilterSelectComponents';
import { TableContext } from './data/context';
import { FILTER_KEY } from './data/constants';

export const TableFilterSelectSingle = ({
  title,
  label,
  filterKey,
  configuration,
  color,
  renderTags,
}) => {
  const { state } = useContext(TableContext);

  const selectedItem = state.getKey(FILTER_KEY)?.[filterKey]?.[0];

  const handleFilterClick = (value) => {
    const { [filterKey]: target, ...current } = state.getKey(FILTER_KEY);
    const isSelected = target?.includes(value);

    if (isSelected) {
      state.setKey(FILTER_KEY, { ...current });
    } else {
      state.setKey(FILTER_KEY, { [filterKey]: [value], ...current });
    }
  };

  return (
    <FilterSelectComponent
      title={title}
      label={selectedItem || label}
      filterKey={filterKey}
      configuration={configuration}
      color={color}
      renderTags={renderTags}
    >
      {({ searchPlaceholder }) => (
        <FilterContentComponent
          handleFilterClick={handleFilterClick}
          searchPlaceholder={searchPlaceholder}
          configuration={configuration}
          filterKey={filterKey}
        />
      )}
    </FilterSelectComponent>
  );
};

TableFilterSelectSingle.propTypes = {
  title: PropTypes.string,
  label: PropTypes.string.isRequired,
  filterKey: PropTypes.string.isRequired,
  configuration: PropTypes.func,
  color: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
  renderTags: PropTypes.bool,
};

TableFilterSelectSingle.defaultProps = {
  title: '',
  color: null,
  renderTags: false,
  configuration: (filter) => ({
    title: filter.value,
    value: filter.value,
    subtitle: filter.count,
  }),
};
