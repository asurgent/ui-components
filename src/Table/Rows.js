/* eslint-disable react/no-array-index-key */
import React, { useContext } from 'react';
import {
  Box,
  Stack,
  Center,
  GridItem,
  Skeleton,
} from '@chakra-ui/react';
import { TableContext, TableBodyContext } from './data/context';
import { TableGrid } from './Body';

export const TableRowCards = ({ component: CardComponent }) => {
  const {
    rows,
    isInitializing,
    isLoading,
  } = useContext(TableContext);
  const headers = useContext(TableBodyContext);

  const hasNoData = isInitializing && !isLoading && !(rows?.length);

  if (hasNoData) {
    return (
      <GridItem colSpan={headers.length} p={8}>
        <Center>
          No data
        </Center>
      </GridItem>
    );
  }

  if (isInitializing) {
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
    <CardComponent data={item} key={rIndex} />
  ));
};

export const TableRows = ({ configuration }) => {
  const {
    rows,
    isInitializing,
  } = useContext(TableContext);
  const headers = useContext(TableBodyContext);
  const hasNoData = !isInitializing && !(rows?.length);

  if (hasNoData) {
    return (
      <GridItem colSpan={headers.length} p={8}>
        <Center>
          No data
        </Center>
      </GridItem>
    );
  }

  if (isInitializing) {
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

  return (rows || []).map((row, gIdx) => (
    <TableGrid _hover={{ background: 'gray.50' }} key={`${gIdx}`}>
      {configuration(row)
        .map((item, rIndex) => (
          <GridItem justify="right" p={2} key={`${gIdx}${rIndex}`}>
            {item}
          </GridItem>
        ))}
    </TableGrid>
  ));
};
