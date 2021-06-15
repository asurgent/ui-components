import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@chakra-ui/react';

export const TableHeader = ({ children }) => (
  <Grid
    templateColumns="1fr auto auto"
    templateRows="auto"
    gap={1}
    rowGap={4}
    mb={2}
  >
    {children}
  </Grid>
);

TableHeader.propTypes = {
  children: PropTypes.oneOfType([PropTypes.any]),
};
TableHeader.defaultProps = {
  children: null,
};
