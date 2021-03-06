import React, {
  createRef,
  forwardRef,
  useImperativeHandle,
} from 'react';
import PropTypes from 'prop-types';
import MdiIcon from '@mdi/react';
import { mdiMenuDown } from '@mdi/js';
import {
  Tag, Wrap, useTheme, Popover, PopoverContent, PopoverTrigger, useDisclosure,
} from '@chakra-ui/react';
import { VirtualRender } from '../../../VirtualRender';
import translation from './FilterSelect.translation';
import * as C from './FilterSelect.styled';
import useFilterSelectHook from './useFilterSelectHook';
import { dispatchEvent } from '../../helpers';
import FilterSelectItem from './components/FilterSelectItem';
import { handleTags } from '../../../Cards/Entity/handleTags';

const { t } = translation;

const propTyps = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.instanceOf(Object),
      PropTypes.string]),
  ).isRequired,
  props: PropTypes.instanceOf(Object),
  theme: PropTypes.instanceOf(Object),
  parseOutput: PropTypes.func,
  placeholder: PropTypes.string,
  validator: PropTypes.shape({
    condition: PropTypes.func,
    errorMessage: PropTypes.string,
  }),
  disabled: PropTypes.func,
};

const defaultProps = {
  value: '',
  props: { },
  theme: {},
  parseOutput: (r) => r,
  placeholder: '',
  validator: {
    condition: () => true,
    errorMessage: '',
  },
  disabled: () => false,
};

const FilterInput = forwardRef((props, ref) => {
  const {
    name,
    value,
    options,
    validator,
    placeholder,
    parseOutput,
    props: inputProps,
    disabled,
  } = props;
  const {
    onOpen, onClose, isOpen,
  } = useDisclosure();

  const { colors, breakpoints } = useTheme();
  const placeholdeOutput = placeholder || t('selectPlaceholder', 'ui');
  const searchInput = createRef();
  const { multiSelect } = inputProps;
  const filterSelectHook = useFilterSelectHook(
    value,
    options,
    multiSelect,
    parseOutput,
    placeholder,
  );

  const handleChange = (item) => {
    const selected = filterSelectHook.selectItem(item);
    dispatchEvent(selected, filterSelectHook.inputRef);
  };

  useImperativeHandle(ref, () => ({
    validator: () => validator.condition(value),
    validationErrorMessage: validator.errorMessage,
    value: () => filterSelectHook.getInputValue(),
    focus: () => {
      filterSelectHook.setOpen(true);
      searchInput.current.focus();
    },
    blur: () => {
      filterSelectHook.setOpen(false);
      searchInput.current.blur();
    },
  }));

  const tags = filterSelectHook
    .getTags()
    ?.map((tag) => tag.value);

  return (
    <Popover
      variant="responsive"
      onOpen={onOpen}
      onClose={onClose}
      isOpen={isOpen}
      matchWidth
    >
      <PopoverTrigger>
        <C.SelectFilter>
          <C.Input type="text" name={name} ref={filterSelectHook.inputRef} disabled {...inputProps} />

          <C.Output onClick={() => !disabled() && filterSelectHook.setOpen(true)}>
            <C.Value
              colors={colors}
              disabled={disabled()}
              asPlaceholder={filterSelectHook.showPlaceHolder()}
            >
              {filterSelectHook.showTags() && (
              <Wrap spacing={2}>
                {handleTags({ items: tags, maxLength: 3 }).map((tag) => <Tag key={tag} bg="#f5edd8">{tag}</Tag>)}
              </Wrap>
              )}
              { filterSelectHook.showPlaceHolder() && placeholdeOutput}
              {!filterSelectHook.showTags() && (filterSelectHook.getOutput())}
            </C.Value>
            <MdiIcon path={mdiMenuDown} size={0.75} className="down-arrow" />
          </C.Output>

        </C.SelectFilter>
      </PopoverTrigger>

      <PopoverContent width="inherit">
        <C.Dropdown colors={colors} breakpoints={breakpoints}>
          <C.SearchWrapper colors={colors} breakpoints={breakpoints}>
            <C.Search
              colors={colors}
              forwardRef={searchInput}
              type="text"
              placeholder={inputProps.searchPlaceholder || t('searchPlaceHolder', 'ui')}
              value={filterSelectHook.searchValue}
              onChange={(ev) => {
                const { target } = ev;
                filterSelectHook.setSearch(target.value);
                // don't spam forms onChange handler on search
                ev.preventDefault();
                ev.stopPropagation();
              }}
            />
          </C.SearchWrapper>
          <C.ListWrapper>
            {
              filterSelectHook.hasOptions() && (
                <VirtualRender
                  rowHeight={48}
                  items={filterSelectHook.getOptions()}
                  style={{ flex: 1 }}
                >
                  {(item, key) => (
                    <FilterSelectItem
                      key={key}
                      onChange={handleChange}
                      filterItem={item}
                    />
                  )}
                </VirtualRender>
              )
            }
          </C.ListWrapper>
        </C.Dropdown>
      </PopoverContent>
    </Popover>
  );
});

FilterInput.defaultProps = defaultProps;
FilterInput.propTypes = propTyps;

export default FilterInput;
