/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { FilterContentComponent, FilterSelectComponent } from './shared/FilterSelectComponents';
import { TableContext } from './data/context';
import { FILTER_KEY } from './data/constants';

export const TableFilterSelect = ({
  title,
  label,
  filterKey,
  configuration,
  color,
  renderTags,
}) => {
  const { state } = useContext(TableContext);

  const handleFilterToggle = (value) => {
    const { [filterKey]: target, ...current } = state.getKey(FILTER_KEY);

    const isSelected = target?.includes(value);
    if (isSelected && target?.length === 1) {
      state.setKey(FILTER_KEY, { ...current });
    } else if (isSelected) {
      state.setKey(FILTER_KEY, {
        ...current,
        [filterKey]: target.filter((lbl) => lbl !== value),
      });
    } else {
      state.setKey(FILTER_KEY, {
        ...current,
        [filterKey]: [...(target || []), value],
      });
    }
  };

  return (
    <FilterSelectComponent
      title={title}
      label={label}
      filterKey={filterKey}
      configuration={configuration}
      renderTags={renderTags}
      color={color}
    >
      {({ searchPlaceholder }) => (
        <FilterContentComponent
          handleFilterClick={handleFilterToggle}
          searchPlaceholder={searchPlaceholder}
          configuration={configuration}
          filterKey={filterKey}
        />
      )}
    </FilterSelectComponent>
  );
};

TableFilterSelect.propTypes = {
  title: PropTypes.string,
  label: PropTypes.string.isRequired,
  filterKey: PropTypes.string.isRequired,
  configuration: PropTypes.func,
  color: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
  renderTags: PropTypes.bool,
};

TableFilterSelect.defaultProps = {
  title: '',
  color: null,
  renderTags: false,
  configuration: (filter) => ({
    title: filter.value,
    value: filter.value,
    subtitle: filter.count,
  }),
};
