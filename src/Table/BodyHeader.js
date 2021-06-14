import React, { useContext } from 'react';
import {
  Flex,
  Divider,
  Heading,
} from '@chakra-ui/react';
import { TableGrid } from './Body';
import { TableBodyContext } from './data/context';

export const TableBodyHeader = () => {
  const headers = useContext(TableBodyContext);

  return (
    <TableGrid>
      {headers.map(({ label, key, render = true }) => render && (
        <Flex justify="right" direction="column" key={`${label}-${key}`}>
          <Heading as="h6" size="xs" p={2} height={8}>
            {label}
          </Heading>
          <Divider />
        </Flex>
      ))}
    </TableGrid>
  );
};
