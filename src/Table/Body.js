import React from 'react';
import {
  Box,
  Grid,
} from '@chakra-ui/react';
import { TableBodyContext } from './data/context';

export const TableBody = ({ children, columns, ...gridProps }) => {
  const templateColumns = columns.map(({ size }) => size || 'minmax(5rem, 1fr)').join(' ');

  return (
    <TableBodyContext.Provider value={columns}>
      <Box w="100%" overflowX="auto">
        <Grid templateColumns={templateColumns} {...gridProps}>
          {children}
        </Grid>
      </Box>
    </TableBodyContext.Provider>
  );
};
