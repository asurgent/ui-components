import React, { useContext } from 'react';
import PropTypes from 'prop-types';
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

export const TablePagination = ({ delta }) => {
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

  const pages = paginationCalculator(currentPage, pageCount, delta);

  if (pages.length === 0) {
    return <Center mt={5} />;
  }

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
            pages.map((page, idx) => (
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

TablePagination.propTypes = {
  delta: PropTypes.number,
};
TablePagination.defaultProps = {
  delta: 4,
};
