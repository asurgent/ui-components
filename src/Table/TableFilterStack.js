import React from 'react';
import PropTypes from 'prop-types';
import {
  HStack, useBreakpointValue,
} from '@chakra-ui/react';

export const TableFilterStack = ({ children }) => {
  const display = useBreakpointValue({ base: 'none', sm: 'flex' });

  return (
    <HStack templateColumns="1fr 4rem" display={display}>
      {children}
    </HStack>
  );
};

TableFilterStack.propTypes = {
  children: PropTypes.oneOfType([PropTypes.any]),
};
TableFilterStack.defaultProps = {
  children: null,
};
