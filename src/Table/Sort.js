import React, { useContext, useEffect } from 'react';
import {
  GridItem,
  IconButton,
  HStack,
  Select,
} from '@chakra-ui/react';
import MdiIcon from '@mdi/react';
import {
  mdiChevronUp,
  mdiChevronDown,
} from '@mdi/js';

import { ORDER_DESC, ORDER_KEY } from './data/constants';
import { TableContext } from './data/context';

export const TableSort = ({ sort }) => {
  const { state } = useContext(TableContext);

  useEffect(() => {
    if (state.getKey(ORDER_KEY) === null) {
      state.setKeys({ [ORDER_KEY]: sort[0].value, [ORDER_DESC]: false });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.getKey(ORDER_KEY)]);

  const handeSortKeyChange = ({ target }) => {
    state.setKey(ORDER_KEY, target.value);
  };

  const onHandleSortDirection = () => {
    const direction = state.getKey(ORDER_DESC);
    state.setKey(ORDER_DESC, !direction);
  };

  const iconPath = state.getKey(ORDER_DESC) ? mdiChevronUp : mdiChevronDown;

  return (
    <GridItem width={40}>
      <HStack>
        <Select onChange={handeSortKeyChange} borderColor="transparent">
          {sort.map(({ label, value }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </Select>
        <IconButton
          isLoading={state.getKey(ORDER_DESC) === undefined}
          isRound
          onClick={onHandleSortDirection}
          variant="outline"
          colorScheme="blue"
          icon={<MdiIcon path={iconPath} size={0.8} />}
        />
      </HStack>
    </GridItem>
  );
};
