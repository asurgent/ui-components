import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Grid, Wrap, useBreakpointValue,
} from '@chakra-ui/react';
import { FILTER_KEY } from './data/constants';
import { TableContext } from './data/context';
import { TableFilterTagGroup } from './FilterTagGroup';

export const TableFilterTags = ({ colors, configurations }) => {
  const { state } = useContext(TableContext);
  const display = useBreakpointValue({ base: 'none', sm: 'grid' });

  return (
    <Grid templateColumns="1fr 4rem" display={display}>
      <Wrap spacing={2} mt={2} maxHeight={20}>
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

TableFilterTags.propTypes = {
  colors: PropTypes.instanceOf(Object),
  configurations: PropTypes.instanceOf(Object),
};
TableFilterTags.defaultProps = {
  colors: {},
  configurations: {},
};
