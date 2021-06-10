import React, {
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  Switch,
  Flex,
  Button,
  Code,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  Stack,
  Input,
  Box,
  Tooltip,
  Tag,
  TagLabel,
  WrapItem,
  ButtonGroup,
  IconButton,
  Skeleton,
  TagCloseButton,
  Text,
  Center,
  Heading,
} from '@chakra-ui/react';
import MdiIcon from '@mdi/react';
import {
  mdiCheck,
  mdiClose,
  mdiCancel,
  mdiChevronDown,
} from '@mdi/js';
import { VirtualRender } from '../VirtualRender';
import { TableContext } from './data/context';
import { FILTER_KEY } from './data/constants';
import translation from './Table.translation';

const defaultPropsFilterContent = {
  configuration: (filter) => ({ title: filter.value, value: filter.value, subtitle: filter.count }),
};

const FilterContent = ({ filterKey, searchPlaceholder, configuration }) => {
  const { t } = translation;
  const [search, setSearch] = useState('');
  const { dataSource, state } = useContext(TableContext);
  const {
    mutate,
    data,
    isLoading,
  } = dataSource;

  useEffect(() => {
    mutate({ isFilterTrigger: true, filterKey, ...state.getState() });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilterToggle = (value) => {
    const { [filterKey]: target, ...current } = state.getKey(FILTER_KEY);

    const isSelected = target?.includes(value);
    if (isSelected) {
      state.setKey(FILTER_KEY, {
        ...current,
        [filterKey]: target.filter((label) => label !== value),
      });
    } else {
      state.setKey(FILTER_KEY, {
        ...current,
        [filterKey]: [...(target || []), value],
      });
    }
  };

  const items = useMemo(() => {
    if (!data || isLoading || !data.facets?.[filterKey]) {
      return [];
    }

    const sortedItems = data.facets?.[filterKey].map((filter) => {
      const { title, value, subtitle } = configuration(filter);
      const isSelected = state.getKey(FILTER_KEY)?.[filterKey]?.includes(value);
      return {
        title,
        value,
        subtitle,
        isSelected,
      };
    })
      .filter(({ title }) => {
        if (title) {
          return title
            .toString()
            .toUpperCase()
            .match(search.toString().toUpperCase());
        }

        return false;
      })
      .sort(({ title: a }, { title: b }) => {
        const textA = a.toUpperCase();
        const textB = b.toUpperCase();

        if (textA < textB) { return -1; }
        if (textA > textB) { return 1; }
        return 0;
      })
      .sort(({ isSelected: a }, { isSelected: b }) => {
        if (a && !b) { return -1; }
        if (!a && b) { return 1; }
        return 0;
      });

    return sortedItems;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isLoading, search, state.getKey(FILTER_KEY)]);

  return (
    <>
      <Box mb={2}>
        <Input placeholder={searchPlaceholder} onChange={({ target }) => setSearch(target.value)} />
      </Box>
      { !isLoading && items.length === 0 && search.length > 0
        && (

          <Center p={5}>
            <Heading as="h6" wordBreak="break-all" size="xs">
              {t('noMatch', 'ui')}
              {' '}
              {search}
            </Heading>
          </Center>

        )}
      { !isLoading > 0 && (
        <VirtualRender rowHeight={48} items={items} flex="1" maxHeight="20rem">
          {
            ({
              title,
              value,
              subtitle,
              isSelected,
            }, key) => (
              <Button
                key={key}
                onClick={() => handleFilterToggle(value)}
                style={{ display: 'flex', justifyContent: 'space-between' }}
                variant="unstyled"
                isFullWidth
              >
                <Text isTruncated mr={3}>{title}</Text>
                <Flex alignItems="center">
                  <Code>{subtitle}</Code>
                  {isSelected && (
                  <Box ml={3}>
                    <MdiIcon path={mdiCheck} size={0.6} />
                  </Box>
                  )}
                </Flex>
              </Button>
            )
          }
        </VirtualRender>
      )}
      { isLoading && (
        <Stack>
          <Skeleton height={8} />
          <Skeleton height={8} />
          <Skeleton height={8} />
          <Skeleton height={8} />
          <Skeleton height={8} />
          <Skeleton height={8} />
        </Stack>
      )}
    </>
  );
};

FilterContent.defaultProps = defaultPropsFilterContent;

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

const getFilterState = (state, key) => (state.getKey(FILTER_KEY)?.[key] || [])
  .map((tag) => ({ key, tag }));

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

export const TableFilterSelect = ({
  title,
  label,
  filterKey,
  configuration,
  children,
}) => {
  const { t } = translation;
  const { state } = useContext(TableContext);
  const hasAppliedFilter = !!state.getKey(FILTER_KEY)?.[filterKey]?.length;

  const handleClearFilter = () => {
    const { [filterKey]: target, ...current } = state.getKey(FILTER_KEY);
    state.setKey(FILTER_KEY, { ...current });
  };

  return (
    <Stack>
      { title && (
        <Text fontSize="xs" mt={1}>
          {title}
        </Text>
      )}
      <Popover placement="bottom">
        {({ isOpen }) => (
          <>
            <ButtonGroup
              size="sm"
              isAttached
              width="auto"
              variant="outline"
              colorScheme="gray"
            >
              <PopoverTrigger>
                <Button
                  justifyContent="space-between"
                  mr="-px"
                  isFullWidth
                  iconSpacing
                  rightIcon={<MdiIcon path={mdiChevronDown} size={0.8} />}
                >
                  {label}
                </Button>
              </PopoverTrigger>
              { hasAppliedFilter && (
                <Tooltip hasArrow label={`${t('clearAppliedFilters', 'ui')} ${label}`} placement="auto">
                  <IconButton
                    onClick={handleClearFilter}
                    aria-label={t('removeFilter', 'ui')}
                    icon={<MdiIcon path={mdiClose} size={0.8} />}
                  />
                </Tooltip>
              ) }
            </ButtonGroup>

            <PopoverContent>
              <PopoverHeader fontWeight="semibold">
                {t('changeFilter', 'ui')}
                {' '}
                <Code>{label}</Code>
              </PopoverHeader>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverBody>
                {isOpen && (
                <FilterContent
                  searchPlaceholder={`${t('search', 'ui')} ${label.toLowerCase()}...`}
                  filterKey={filterKey}
                  configuration={configuration}
                />
                )}
              </PopoverBody>
            </PopoverContent>
          </>
        )}
      </Popover>
      { children }
    </Stack>
  );
};

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

export const TableFilterBool = ({ filterKey, title }) => {
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
        <Text fontSize="xs" mt={1}>
          {title}
        </Text>
      )}
      <Switch
        size="lg"
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
