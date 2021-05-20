/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React, { useContext, useMemo } from 'react';
import { useMutation } from 'react-query';
import {
  Flex,
  Divider,
  Box,
  Grid,
  Spinner,
  Heading,
  Center,
  GridItem,
  Input,
  Tooltip,
  Wrap,
  WrapItem,
  Tag,
  TagLabel,
  TagCloseButton,
  Button,
  IconButton,
  HStack,
} from '@chakra-ui/react';
import MdiIcon from '@mdi/react';
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';
import Filter from './Filter';
import useUrlState from './data/useUrlState';
import { pagination } from './helpers';

const QUERY_KEY = 'query';
const FILTER_KEY = 'filter';
const PAGE_KEY = 'page';
const ORDER_KEY = 'order';

const initalState = {
  [QUERY_KEY]: '',
  [FILTER_KEY]: [],
  [ORDER_KEY]: [],
  [PAGE_KEY]: 2,
};

const TableContext = React.createContext({});

export const TableControlls = () => {
  const { url } = useContext(TableContext);
  const handleSearch = ({ target }) => {
    if (url) {
      url.setKey(QUERY_KEY, target.value);
    }
  };

  return (
    <Grid
      templateColumns="1fr auto"
      templateRows="auto"
      gap={1}
      rowGap={4}
      mb={2}
    >
      <GridItem width="1fr">
        <Input
          placeholder="Search..."
          defaultValue={url ? url.getKey(QUERY_KEY) : ''}
          onKeyUp={handleSearch}
        />
      </GridItem>
      <GridItem width="40px">
        <Filter>
          <TableFilterCollection />
        </Filter>
      </GridItem>
    </Grid>
  );
};

export const TableHeader = () => {
  const { headers } = useContext(TableContext);

  return headers.map(({ label }) => (
    <Flex justify="right" direction="column" key={label}>
      <Heading as="h6" size="xs" p={2}>
        {label}
      </Heading>
      <Divider />
    </Flex>
  ));
};

export const TableRows = ({ configuration }) => {
  const {
    rows,
    headers,
    isInitialized,
    isLoading,
  } = useContext(TableContext);

  const hasNoData = isInitialized && !isLoading && !(rows?.length);

  if (hasNoData) {
    return (
      <GridItem colSpan={headers.length} p={8}>
        <Center>
          No data
        </Center>
      </GridItem>
    );
  }

  return (rows || []).map((row, gIdx) => configuration(row)
    .map((item, rIndex) => (
      // eslint-disable-next-line react/no-array-index-key
      <GridItem justify="right" p={2} key={`${gIdx}${rIndex}`}>
        {item}
      </GridItem>
    )));
};

export const TableFilterCollection = () => {
  const { appliedFilters } = useContext(TableContext);

  return (
    <Wrap spacing={2}>
      {
        appliedFilters.map(({ label, color }, idx) => (
          <WrapItem key={idx + label}>
            <Tooltip hasArrow label="Remove applied filter" placement="auto">
              <Tag
                size="sm"
                key={label}
                borderRadius="full"
                variant="solid"
                colorScheme={color}
              >
                <TagLabel>{label}</TagLabel>
                <TagCloseButton />
              </Tag>
            </Tooltip>
          </WrapItem>
        ))
      }
    </Wrap>
  );
};

export const TableGrid = ({ children, ...gridProps }) => {
  const { isInitialized, headers } = useContext(TableContext);
  const columns = headers.map(({ size }) => size || 'minmax(5rem, 1fr)').join(' ');

  return (
    <Box w="100%" overflowX="auto">
      { isInitialized && (
        <Grid templateColumns={columns} {...gridProps}>
          {children}
        </Grid>
      )}
      { !isInitialized && (
      <Center mt={10}>
        <Spinner
          thickness={2}
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Center>
      )}
    </Box>
  );
};

export const TablePagination = ({ delta = 3 }) => {
  const { url, pageCount } = useContext(TableContext);

  const currentPage = url.getKey(PAGE_KEY);
  const pg = useMemo(() => pagination(currentPage, pageCount, delta),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentPage]);

  const previous = () => {
    const val = currentPage - 1;
    if (val >= 1) {
      url.setKey(PAGE_KEY, val);
    }
  };

  const next = () => {
    const val = currentPage + 1;
    if (val <= pageCount) {
      url.setKey(PAGE_KEY, val);
    }
  };

  return (
    <Center mt={5}>
      <HStack>
        <IconButton
          size="xs"
          variant="ghost"
          colorScheme="blue"
          icon={<MdiIcon path={mdiChevronLeft} size={0.8} />}
          onClick={previous}
        />
        {
            pg.map((page) => (
              <Button
                size="xs"
                colorScheme="blue"
                isDisabled={page.disabled}
                variant={url.getKey(PAGE_KEY) === page.value ? 'solid' : 'ghost'}
                onClick={() => url.setKey(PAGE_KEY, page.value)}
              >
                {page.value}
              </Button>
            ))
        }
        <IconButton
          size="xs"
          variant="ghost"
          colorScheme="blue"
          icon={<MdiIcon path={mdiChevronRight} size={0.8} />}
          onClick={next}
        />
      </HStack>
    </Center>
  );
};

const stateHandler = (mutate, dataFetcher) => ({ setKey }, current, prev) => {
  const searchChanged = current
    && prev
    && (current[QUERY_KEY] !== prev[QUERY_KEY])
    && current[PAGE_KEY] !== 1;

  const filterChanged = current
    && prev
    && (JSON.stringify(current[FILTER_KEY]) !== JSON.stringify(prev[FILTER_KEY]));

  if (filterChanged) {
    setKey(QUERY_KEY, '');
    setKey(PAGE_KEY, 1);
  } else if (searchChanged) {
    setKey(PAGE_KEY, 1);
  } else if (dataFetcher) {
    mutate(current, prev);
  }
};

export const TableSearchProvider = ({
  children,
  headers,
  dataFetcher,
}) => {
  const mutation = useMutation(dataFetcher, {});
  const url = useUrlState('test', initalState, stateHandler(mutation.mutate, dataFetcher));

  return (
    <TableContext.Provider
      value={{
        url,
        headers,
        pageCount: 10,
        rows: mutation.data?.result || [],
        appliedFilters: [],
        isInitialized: mutation.isSuccess || mutation.isError,
        isLoading: mutation.isLoading,
        isError: mutation.isError,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};
