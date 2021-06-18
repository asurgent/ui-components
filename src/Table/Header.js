import React from 'react';
import PropTypes from 'prop-types';
import { Grid, useBreakpointValue } from '@chakra-ui/react';

export const TableHeader = ({ children }) => {
  const columns = useBreakpointValue({ base: '1fr auto auto', sm: '1fr auto auto' });
  const rows = useBreakpointValue({ base: 'auto', sm: 'auto' });

  return (
    <Grid
      templateColumns={columns}
      templateRows={rows}
      gap={1}
      rowGap={4}
      mb={2}
    >
      {children}
    </Grid>
  );
};

TableHeader.propTypes = {
  children: PropTypes.oneOfType([PropTypes.any]),
};
TableHeader.defaultProps = {
  children: null,
};
