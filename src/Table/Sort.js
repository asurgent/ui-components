import React, { useContext } from 'react';
import {
  GridItem,
  IconButton,
  Flex,
  Select,
} from '@chakra-ui/react';
import MdiIcon from '@mdi/react';
import { mdiSort } from '@mdi/js';

import { ORDER_DESC, ORDER_KEY } from './data/constants';
import { TableContext } from './data/context';

export const TableSort = () => {
  const { sort, state } = useContext(TableContext);

  const handeSortKeyChange = ({ target }) => {
    state.setKey(ORDER_KEY, target.value);
  };

  const onHandleSortDirection = () => {
    const direction = state.getKey(ORDER_DESC);
    state.setKey(ORDER_DESC, !direction);
  };

  return (
    <GridItem minWidth={40}>
      <Flex>
        <Select
          isTruncated
          borderRightRadius={0}
          onChange={handeSortKeyChange}
          value={state.getKey(ORDER_KEY) || ''}
        >
          {sort.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Select>
        <IconButton
          isLoading={state.getKey(ORDER_DESC) === undefined}
          variant="solid"
          colorScheme="asurgent"
          borderLeftRadius={0}
          onClick={onHandleSortDirection}
          icon={(
            <MdiIcon
              size={0.8}
              path={mdiSort}
              rotate={state.getKey(ORDER_DESC) ? 0 : 180}
            />
          )}
        />
      </Flex>
    </GridItem>
  );
};
