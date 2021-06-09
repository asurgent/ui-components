import React, { useContext } from 'react';
import {
  Grid, GridItem, Flex, IconButton, Tooltip, Wrap,
} from '@chakra-ui/react';
import MdiIcon from '@mdi/react';
import { mdiClose } from '@mdi/js';
import { FILTER_KEY } from './data/constants';
import { TableContext } from './data/context';
import { TableFilterTagGroup } from './Filter';

export const TableFilterCollection = ({ colors, configurations }) => {
  const { state } = useContext(TableContext);

  return (
    <Grid templateColumns="1fr 4rem">
      <Wrap spacing={2} mt={2}>
        {
            Object.keys(state.getKey(FILTER_KEY) || {}).sort().map((key) => (
              <TableFilterTagGroup
                key={key}
                filterKey={key}
                color={colors?.[key]}
                configure={configurations?.[key]}
              />
            ))
          }
      </Wrap>
    </Grid>
  );
};
