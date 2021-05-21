/* eslint-disable react/no-array-index-key */
import React, { useContext } from 'react';
import {
  Tooltip,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { FILTER_KEY } from './data/constants';
import { TableContext } from './data/context';
import { TableFilterTag } from './Filter';

const prefixTags = ([key, tags]) => tags.map((tag) => ({ key, tag }));
const getFilterState = (state) => Object.entries(state.getKey(FILTER_KEY) || {});

export const TableFilterCollection = ({ colors }) => {
  const { state } = useContext(TableContext);
  const appliedFilters = getFilterState(state).map(prefixTags).flat();

  return (
    <Wrap spacing={2} mt={2}>
      {
        appliedFilters.map(({ key, tag }) => (
          <WrapItem key={`${key}:${tag}`}>
            <TableFilterTag value={tag} filterKey={key} color={colors?.[key]} />
          </WrapItem>
        ))
      }
    </Wrap>
  );
};
