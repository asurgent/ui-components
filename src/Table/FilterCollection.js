/* eslint-disable react/no-array-index-key */
import React, { useContext } from 'react';
import {
  Tooltip,
  Wrap,
  WrapItem,
  Tag,
  TagLabel,
  TagCloseButton,
} from '@chakra-ui/react';
import { FILTER_KEY } from './data/constants';
import { TableContext } from './data/context';

const prefixTags = ([key, tags]) => tags.map((tag) => ({ label: `${key}:${tag}` }));
const getFilterState = (state) => Object.entries(state.getKey(FILTER_KEY) || {});

export const TableFilterCollection = () => {
  const { state } = useContext(TableContext);
  const appliedFilters = getFilterState(state).map(prefixTags).flat();

  return (
    <Wrap spacing={2} mt={2}>
      {
        appliedFilters.map(({ label, color }, idx) => (
          <WrapItem key={idx + label}>
            <Tooltip hasArrow label="Remove applied filter" placement="auto">
              <Tag
                size="sm"
                key={label}
                borderRadius="full"
                variant="solid"
                colorScheme={color}
              >
                <TagLabel>{label}</TagLabel>
                <TagCloseButton />
              </Tag>
            </Tooltip>
          </WrapItem>
        ))
      }
    </Wrap>
  );
};
