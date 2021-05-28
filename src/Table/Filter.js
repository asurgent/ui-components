import React, {
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  RadioGroup,
  Radio,
  Wrap,
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
  mdiCheck, mdiClose, mdiChevronDown, mdiMinusCircle,
} from '@mdi/js';
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

const TableFilterTag = ({
  color,
  value,
  filterKey,
  configure,
}) => {
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

  const label = configure ? configure(filterKey, value) : `${filterKey}: ${value}`;

  return (
    <Tooltip hasArrow label="Remove filter" placement="auto">
      <Tag
        size="sm"
        key={`${filterKey}:${value}`}
        borderRadius="full"
        variant="solid"
        colorScheme={color}
      >
        <TagLabel>{label}</TagLabel>
        <TagCloseButton onClick={handleRemoveFilterItem} />
      </Tag>
    </Tooltip>
  );
};

const getFilterState = (state, key) => (state.getKey(FILTER_KEY)?.[key] || [])
  .map((tag) => ({ key, tag }));

export const TableFilterTagGroup = ({ filterKey, color, configure }) => {
  const { state } = useContext(TableContext);
  const appliedFilters = getFilterState(state, filterKey);

  return appliedFilters.map(({ key, tag }) => (
    <WrapItem key={`${key}:${tag}`}>
      <TableFilterTag value={tag} filterKey={key} color={color} configure={configure} />
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
              variant={hasAppliedFilter ? 'solid' : 'outline'}
              colorScheme={hasAppliedFilter ? 'facebook' : 'gray'}
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
              {hasAppliedFilter && (
                <Tooltip hasArrow label={`Clear applied filters for ${label}`} placement="auto">
                  <IconButton
                    borderLeft="1px solid"
                    borderColor={hasAppliedFilter ? 'white' : 'gray.200'}
                    onClick={handleClearFilter}
                    aria-label="Remove filter"
                    icon={<MdiIcon path={mdiClose} size={0.8} />}
                  />
                </Tooltip>
              )}
            </ButtonGroup>

            <PopoverContent>
              <PopoverHeader fontWeight="semibold">
                Modify filter for
                {' '}
                <Code>{label}</Code>
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

  const handleActivateFilter = () => {
    const { [filterKey]: target, ...current } = state.getKey(FILTER_KEY);
    state.setKey(FILTER_KEY, { [filterKey]: ['a'], ...current });
  };

  const handleOnChange = (value) => {
    const { [filterKey]: _, ...current } = state.getKey(FILTER_KEY);
    state.setKey(FILTER_KEY, { [filterKey]: [value], ...current });
  };

  // const handleDeactivateFilter = () => {
  //   const { [filterKey]: target, ...current } = state.getKey(FILTER_KEY);
  //   state.setKey(FILTER_KEY, { [filterKey]: [false], ...current });
  // };

  const isDisabled = appliedFilterState === undefined;
  const isTrue = appliedFilterState === true;
  const isFalse = appliedFilterState === false;

  const isTrueLabel = `${label}: Yes`;
  const isFalseLabel = `${label}: No`;

  return (
    <Stack>
      { title && (
        <Text fontSize="xs" mt={1}>
          {title}
        </Text>
      )}
      {
        isDisabled && (
          <ButtonGroup size="sm" isAttached variant="outline">
            <Button
              mr="-px"
              onClick={handleActivateFilter}
              rightIcon={<MdiIcon path={mdiMinusCircle} size={0.8} />}
            >
              {label}
            </Button>
          </ButtonGroup>
        )
      }
      { !isDisabled && (
        <Flex justifyContent="center" border="1px solid" borderColor="gray.200" borderRadius={5} pl={1} bg="facebook.500" color="white">
          { !isDisabled && (
            <RadioGroup
              colorScheme="green"
              flex="1"
              display="flex"
              justifyContent="center"
              onChange={handleOnChange}
              value={appliedFilterState}
              px={2}
            >
              <Stack direction="row">
                <Radio value="a">A</Radio>
                <Radio value="b">B</Radio>
                <Radio value="c">C</Radio>
              </Stack>
            </RadioGroup>
          )}
          <ButtonGroup size="sm" isAttached variant="outline">
            <Button
              borderTop="none"
              borderBottom="none"
              borderRight="none"
              borderRadius="0"
              borderColor="gray.200"
              borderLeft="1p solid"
              mr="-px"
              onClick={isDisabled ? handleActivateFilter : () => {}}
              rightIcon={isDisabled ? <MdiIcon path={mdiMinusCircle} size={0.8} /> : null}
            >
              {label}
            </Button>
            { !isDisabled
            && (
            <IconButton
              borderTop="none"
              borderBottom="none"
              borderRight="none"
              borderRadius="0"
              borderColor="gray.200"
              borderLeft="1p solid"
              onClick={handleClearFilter}
              icon={(<MdiIcon path={mdiClose} size={0.8} />)}
            />
            )}
          </ButtonGroup>
        </Flex>
      )}
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
      <ButtonGroup size="sm" isAttached variant="outline">
        <IconButton
          colorScheme={!appliedFilterState ? 'red' : 'gray'}
          variant={!appliedFilterState ? 'solid' : 'outline'}
          onClick={handleClearFilter}
          icon={(<MdiIcon path={mdiClose} size={0.8} />)}
        />
        <IconButton
          colorScheme={appliedFilterState ? 'green' : 'gray'}
          variant={appliedFilterState ? 'solid' : 'outline'}
          onClick={handleActivateFilter}
          icon={(<MdiIcon path={mdiCheck} size={0.8} />)}
        />
      </ButtonGroup>
    </Stack>
  );
};
