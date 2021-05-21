import React, { useContext } from 'react';
import {
  GridItem,
  IconButton,
  HStack,
  Select,
  useBoolean,
} from '@chakra-ui/react';
import MdiIcon from '@mdi/react';
import {
  mdiChevronUp,
  mdiChevronDown,
} from '@mdi/js';

import { TableContext } from './data/context';

export const TableSort = ({ sort }) => {
  const { state } = useContext(TableContext);
  const [flag, setFlag] = useBoolean(true);

  const handeSortKeyChange = ({ target }) => {
    console.log(target.value);
  };

  return (
    <GridItem width={40}>
      <HStack>
        <Select onChange={handeSortKeyChange}>
          {sort.map(({ label, value }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </Select>
        <IconButton
          onClick={setFlag.toggle}
          variant="outline"
          colorScheme="blue"
          icon={<MdiIcon path={flag ? mdiChevronUp : mdiChevronDown} size={0.8} />}
        />
      </HStack>
    </GridItem>
  );
};
