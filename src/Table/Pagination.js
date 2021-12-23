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

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export const TablePagination = ({ delta, withTopScroll }) => {
  const { state, pageCount } = useContext(TableContext);
  const currentPage = state.getKey(PAGE_KEY);

  const handlePreviousPage = () => {
    const val = currentPage - 1;
    if (val >= 1) {
      state.setKey(PAGE_KEY, val);
    }
    if (withTopScroll) scrollToTop();
  };

  const handleNextPage = () => {
    const val = currentPage + 1;
    if (val <= pageCount) {
      state.setKey(PAGE_KEY, val);
    }
    if (withTopScroll) scrollToTop();
  };

  const handlePageClick = (pageKey, pageValue) => {
    state.setKey(pageKey, pageValue);
    if (withTopScroll) scrollToTop();
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
          onClick={handlePreviousPage}
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
                onClick={() => handlePageClick(PAGE_KEY, page.value)}
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
          onClick={handleNextPage}
        />
      </HStack>
    </Center>
  );
};

TablePagination.propTypes = {
  delta: PropTypes.number,
  withTopScroll: PropTypes.bool,
};
TablePagination.defaultProps = {
  delta: 4,
  withTopScroll: true,
};
