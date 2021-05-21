import React, { useContext } from 'react';
import {
  GridItem,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import MdiIcon from '@mdi/react';
import { mdiMagnify } from '@mdi/js';
import { TableContext } from './data/context';
import { QUERY_KEY } from './data/constants';

export const TableSearch = () => {
  const { state } = useContext(TableContext);
  const handleSearch = ({ target }) => {
    if (state) {
      state.setKey(QUERY_KEY, target.value);
    }
  };

  return (
    <GridItem width="1fr">
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <MdiIcon color="var(--chakra-colors-gray-400)" path={mdiMagnify} size={0.8} />
        </InputLeftElement>
        <Input
          placeholder="Search..."
          defaultValue={state ? state.getKey(QUERY_KEY) : ''}
          onKeyUp={handleSearch}
        />
      </InputGroup>
    </GridItem>
  );
};
