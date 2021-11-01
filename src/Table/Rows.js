import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Stack,
  Center,
  GridItem,
  Skeleton,
} from '@chakra-ui/react';
import { TableContext, TableBodyContext } from './data/context';
import { TableGrid } from './Body';
import translation from './Table.translation';

const GridRow = ({ children, ...props }) => (
  <TableGrid _hover={{ background: 'gray.50' }} minHeight={12} {...props}>
    {children}
  </TableGrid>
);

GridRow.propTypes = {
  children: PropTypes.oneOfType([PropTypes.any]),
};
GridRow.defaultProps = {
  children: null,
};

export const TableRowCards = ({ children }) => {
  const {
    rows,
    isInitializing,
    isLoading,
  } = useContext(TableContext);
  const headers = useContext(TableBodyContext);
  const hasNoData = isInitializing && !isLoading && !(rows?.length);
  const { t } = translation;

  if (hasNoData) {
    return (
      <GridItem colSpan={headers.length} p={8}>
        <Center>
          {t('noData', 'ui')}
        </Center>
      </GridItem>
    );
  }

  if (isInitializing) {
    return (
      <GridItem colSpan={headers.length} p={2}>
        <Stack>
          <Skeleton height={28} />
          <Skeleton height={28} />
          <Skeleton height={28} />
        </Stack>
      </GridItem>
    );
  }

  return (rows || []).map((item, index) => (children(item, index)));
};
TableRowCards.propTypes = {
  children: PropTypes.oneOfType([PropTypes.any]),
};
TableRowCards.defaultProps = {
  children: null,
};

export const TableRows = ({ children }) => {
  const {
    rows,
    isInitializing,
  } = useContext(TableContext);
  const headers = useContext(TableBodyContext);
  const hasNoData = !isInitializing && !(rows?.length);
  const { t } = translation;

  if (hasNoData) {
    return (
      <GridItem colSpan={headers.length} p={8}>
        <Center>
          {t('noData', 'ui')}
        </Center>
      </GridItem>
    );
  }

  if (isInitializing) {
    return (
      <GridItem colSpan={headers.length} p={2}>
        <Stack>
          <Skeleton height={10} />
          <Skeleton height={10} />
          <Skeleton height={10} />
          <Skeleton height={10} />
          <Skeleton height={10} />
          <Skeleton height={10} />
        </Stack>
      </GridItem>
    );
  }

  return (rows || []).map((row, index) => children(row, index, GridRow));
};
TableRows.propTypes = {
  children: PropTypes.oneOfType([PropTypes.any]),
};
TableRows.defaultProps = {
  children: null,
};
