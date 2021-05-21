import React, { useContext, useEffect } from 'react';
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
  Center,
  Spinner,
  Input,
  Box,
  Divider,
  Tooltip,
  Tag,
  TagLabel,
  TagCloseButton,
} from '@chakra-ui/react';
import MdiIcon from '@mdi/react';
import { mdiFilter, mdiCheck } from '@mdi/js';
import { TableContext } from './data/context';
import { FILTER_KEY } from './data/constants';

const defaultPropsFilterContent = {
  configuration: (filter) => ({ title: filter.label, value: filter.label, subtitle: filter.count }),
};

const FilterContent = ({ filterKey, configuration }) => {
  const { dataSource, state } = useContext(TableContext);
  const { mutate, data, isLoading } = dataSource;

  useEffect(() => {
    mutate({ filterKey, state: state.getKey(FILTER_KEY) });
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

  return (
    <>
      <Input placeholder="Search" />
      <Divider />
      { data?.map((filter) => {
        const { title, value, subtitle } = configuration(filter);
        const isSelected = state.getKey(FILTER_KEY)?.[filterKey]?.includes(value);

        return (
          <Button
            onClick={() => handleFilterToggle(value)}
            style={{ display: 'flex', justifyContent: 'space-between' }}
            variant="unstyled"
            isFullWidth
          >
            <span>{title}</span>
            <Flex alignItems="center">
              <Code>{subtitle}</Code>
              {isSelected && (
              <Box ml={5}>
                <MdiIcon path={mdiCheck} size={0.6} />
              </Box>
              )}
            </Flex>
          </Button>
        );
      })}

      { isLoading && (
        <Center m={10}>
          <Spinner
            thickness={2}
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="md"
          />
        </Center>
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
        <TagLabel>{`${filterKey}:${value}`}</TagLabel>
        <TagCloseButton onClick={handleRemoveFilterItem} />
      </Tag>
    </Tooltip>
  );
};

export const TableFilter = ({
  label,
  filterKey,
  configuration,
}) => (
  <>
    <Popover placement="top-start">
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
              {isOpen && <FilterContent filterKey={filterKey} configuration={configuration} />}
            </PopoverBody>
          </PopoverContent>
        </>
      )}
    </Popover>
  </>
);
