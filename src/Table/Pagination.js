import React, { useContext, useMemo } from 'react';
import {
  Center,
  Button,
  IconButton,
  HStack,
} from '@chakra-ui/react';
import MdiIcon from '@mdi/react';
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';
import { paginationCalculator } from './data/pagination';
import { TableContext } from './data/context';
import { PAGE_KEY } from './data/constants';

export const TablePagination = ({ delta = 3 }) => {
  const { state, pageCount } = useContext(TableContext);
  const currentPage = state.getKey(PAGE_KEY);

  const previous = () => {
    const val = currentPage - 1;
    if (val >= 1) {
      state.setKey(PAGE_KEY, val);
    }
  };

  const next = () => {
    const val = currentPage + 1;
    if (val <= pageCount) {
      state.setKey(PAGE_KEY, val);
    }
  };

  return (
    <Center mt={5}>
      <HStack>
        <IconButton
          width={9}
          height={9}
          variant="ghost"
          colorScheme="black"
          icon={<MdiIcon path={mdiChevronLeft} size={0.8} />}
          onClick={previous}
        />
        {
            paginationCalculator(currentPage, pageCount, delta).map((page, idx) => (
              <Button
                width={9}
                height={9}
                borderRadius="100%"
                key={`${page.value}${idx}`}
                size="xs"
                colorScheme="black"
                isDisabled={page.disabled}
                variant={state.getKey(PAGE_KEY) === page.value ? 'outline' : 'ghost'}
                onClick={() => state.setKey(PAGE_KEY, page.value)}
              >
                {page.value}
              </Button>
            ))
        }
        <IconButton
          width={9}
          height={9}
          variant="ghost"
          colorScheme="black"
          icon={<MdiIcon path={mdiChevronRight} size={0.8} />}
          onClick={next}
        />
      </HStack>
    </Center>
  );
};
