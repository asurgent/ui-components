/* eslint-disable react/no-array-index-key */
import React, { useContext } from 'react';
import {
  Stack,
  Center,
  GridItem,
  Skeleton,
} from '@chakra-ui/react';
import { TableContext, TableGridContext } from './data/context';

export const TableRowCards = ({ component: CardComponent }) => {
  const {
    rows,
    isInitialized,
    isLoading,
  } = useContext(TableContext);
  const headers = useContext(TableGridContext);

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

  if (!isInitialized) {
    return (
      <GridItem colSpan={headers.length} p={2}>
        <Stack>
          <Skeleton height={28} />
          <Skeleton height={28} />
          <Skeleton height={28} />
        </Stack>
      </GridItem>
    );
  }

  return (rows || []).map((item, rIndex) => (
    <GridItem colSpan={headers.length} p={2} key={rIndex}>
      <CardComponent data={item} />
    </GridItem>
  ));
};

export const TableRows = ({ configuration }) => {
  const {
    rows,
    isInitialized,
    isLoading,
  } = useContext(TableContext);
  const headers = useContext(TableGridContext);
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

  if (!isInitialized) {
    return (
      <GridItem colSpan={headers.length} p={2}>
        <Stack>
          <Skeleton height={10} />
          <Skeleton height={10} />
          <Skeleton height={10} />
          <Skeleton height={10} />
          <Skeleton height={10} />
          <Skeleton height={10} />
        </Stack>
      </GridItem>
    );
  }

  return (rows || []).map((row, gIdx) => configuration(row)
    .map((item, rIndex) => (
      <GridItem justify="right" p={2} key={`${gIdx}${rIndex}`}>
        {item}
      </GridItem>
    )));
};
