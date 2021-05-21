import React, { useContext } from 'react';
import {
  Flex,
  Divider,
  Heading,
} from '@chakra-ui/react';
import { TableBodyContext } from './data/context';

export const TableBodyHeader = () => {
  const headers = useContext(TableBodyContext);

  return headers.map(({ label }) => (
    <Flex justify="right" direction="column" key={label}>
      <Heading as="h6" size="xs" p={2}>
        {label}
      </Heading>
      <Divider />
    </Flex>
  ));
};
