import React, { useContext } from 'react';
import {
  Box,
  Grid,
} from '@chakra-ui/react';
import { TableBodyContext } from './data/context';

export const TableGrid = ({ children, ...gridProps }) => {
  const columns = useContext(TableBodyContext);
  const templateColumns = columns.map(({ size }) => size || 'minmax(5rem, 1fr)').join(' ');

  return (
    <Grid templateColumns={templateColumns} {...gridProps}>
      {children}
    </Grid>
  );
};

export const TableBody = ({ children, columns }) => (
  <TableBodyContext.Provider value={columns}>
    <Box w="100%" overflowX="auto">
      {children}
    </Box>
  </TableBodyContext.Provider>
);
