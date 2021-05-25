import React, {
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
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
  Wrap,
  Skeleton,
  TagCloseButton,
  Text,
  Center,
  Heading,
} from '@chakra-ui/react';
import MdiIcon from '@mdi/react';
import { mdiFilter, mdiCheck } from '@mdi/js';
import { VirtualRender } from '../VirtualRender';
import { TableContext } from './data/context';
import { FILTER_KEY } from './data/constants';

const defaultPropsFilterContent = {
  configuration: (filter) => ({ title: filter.label, value: filter.label, subtitle: filter.count }),
};

const FilterContent = ({ filterKey, searchPlaceholder, configuration }) => {
  const [search, setSearch] = useState('');
  const { dataSource, state } = useContext(TableContext);
  const {
    mutate,
    data,
    isLoading,
  } = dataSource;

  useEffect(() => {
    mutate({ filterFacetKey: filterKey, ...state.getState() });
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
    if (!data) {
      return [];
    }

    const sortedItems = data.map((filter) => {
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
  }, [data, search, state.getKey(FILTER_KEY)]);

  return (
    <>
      <Box mb={2}>
        <Input placeholder={searchPlaceholder} onChange={({ target }) => setSearch(target.value)} />
      </Box>
      { !isLoading && items.length === 0 && search.length > 0
        && (

          <Center p={5}>
            <Heading as="h6" wordBreak="break-all" size="xs">
              No match for,
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
                <Text>{title}</Text>
                <Flex alignItems="center">
                  <Code>{subtitle}</Code>
                  {isSelected && (
                  <Box ml={5}>
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

export const TableFilterTag = ({ value, filterKey, color }) => {
  const { state } = useContext(TableContext);

  const handleRemoveFilterItem = () => {
    const { [filterKey]: target, ...current } = state.getKey(FILTER_KEY);

    state.setKey(FILTER_KEY, {
      ...current,
      [filterKey]: target.filter((label) => label !== value),
    });
  };

  return (
    <Tooltip hasArrow label="Remove applied filter" placement="auto">
      <Tag
        size="sm"
        key={`${filterKey}:${value}`}
        borderRadius="full"
        variant="solid"
        colorScheme={color}
      >
        <TagLabel>{`${filterKey}: ${value}`}</TagLabel>
        <TagCloseButton onClick={handleRemoveFilterItem} />
      </Tag>
    </Tooltip>
  );
};

const getFilterState = (state, key) => (state.getKey(FILTER_KEY)?.[key] || [])
  .map((tag) => ({ key, tag }));

export const TableFilter = ({
  label,
  filterKey,
  configuration,
  color = 'gray',
  renderTags,
}) => {
  const { state } = useContext(TableContext);
  const appliedFilters = getFilterState(state, filterKey);

  return (
    <>
      <Popover placement="bottom">
        {({ isOpen }) => (
          <>
            <PopoverTrigger>
              <Button
                iconSpacing
                rightIcon={<MdiIcon path={mdiFilter} size={0.6} />}
              >
                {label}
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverHeader fontWeight="semibold">
                Select filter for
                {' '}
                <Code>Customers</Code>
              </PopoverHeader>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverBody>
                {isOpen && (
                  <FilterContent
                    searchPlaceholder={`Search ${label.toLowerCase()}...`}
                    filterKey={filterKey}
                    configuration={configuration}
                  />
                )}
              </PopoverBody>
            </PopoverContent>
          </>
        )}
      </Popover>
      { renderTags && (
        <Wrap spacing={2} mt={2}>
          {
            appliedFilters.map(({ key, tag }) => (
              <WrapItem key={`${key}:${tag}`}>
                <TableFilterTag value={tag} filterKey={key} color={color} />
              </WrapItem>
            ))
          }
        </Wrap>
      )}
    </>
  );
};
