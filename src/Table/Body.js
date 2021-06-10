import React, { useContext, useMemo } from 'react';
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

export const TableBody = ({ children, columns }) => {
  const parsedColumns = useMemo(() => columns.filter((column) => {
    if (column.render === false) {
      return false;
    }
    return true;
  }), [columns]);

  return (
    <TableBodyContext.Provider value={parsedColumns}>
      <Box w="100%" overflowX="auto">
        {children}
      </Box>
    </TableBodyContext.Provider>
  );
};
