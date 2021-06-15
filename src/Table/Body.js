import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Box, Grid } from '@chakra-ui/react';
import { TableBodyContext } from './data/context';

export const TableGrid = ({ children, ...gridProps }) => {
  const columns = useContext(TableBodyContext);
  const templateColumns = useMemo(() => columns
    .map(({ size }) => size || 'minmax(5rem, 1fr)').join(' '),
  [columns]);

  return (
    <Grid templateColumns={templateColumns} {...gridProps}>
      {children}
    </Grid>
  );
};

TableGrid.propTypes = {
  children: PropTypes.oneOfType([PropTypes.any]),
};
TableGrid.defaultProps = {
  children: null,
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

TableBody.propTypes = {
  children: PropTypes.oneOfType([PropTypes.any]),
  columns: PropTypes.instanceOf(Array),
};
TableBody.defaultProps = {
  children: null,
  columns: [],
};
