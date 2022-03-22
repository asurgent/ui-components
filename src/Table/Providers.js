/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from 'react-query';
import { Box, Spinner, useBoolean } from '@chakra-ui/react';
import { TableContext } from './data/context';
import useUrlState from '../data/useUrlState';
import useAzureSeachPayload from '../data/azureSearch/useAzureSeachPayload';
import useAzureSearchGetAllResults from '../data/azureSearch/useAzureSearchGetAllResults';
import {
  initialState,
  QUERY_KEY,
  PAGE_KEY,
  FILTER_KEY,
  ORDER_KEY,
  ORDER_DESC,
  PAGE_SIZE,
} from './data/constants';

const stateHandler = (mutate, sort) => ({ setKey, setKeys }, current, prev) => {
  const searchChanged = current
    && prev
    && (current[QUERY_KEY] !== prev[QUERY_KEY])
    && current[PAGE_KEY] !== 1;

  const filterChanged = current
    && prev
    && (JSON.stringify(current[FILTER_KEY]) !== JSON.stringify(prev[FILTER_KEY]));

  const noSortValue = !current[ORDER_KEY] && sort && sort.length > 0;

  if (filterChanged) {
    setKey(QUERY_KEY, '');
    setKey(PAGE_KEY, 1);
  } else if (searchChanged) {
    setKey(PAGE_KEY, 1);
  } else if (noSortValue) {
    const def = sort.find(({ default: x }) => x) || sort[0];
    setKeys({ [ORDER_KEY]: def.value, [ORDER_DESC]: !!def.desc });
  } else {
    mutate(current);
  }
};

export const TableSearchProvider = ({
  children,
  sort,
  payload,
  fetcher,
  pageSize = 20,
  urlStateKey = 'test',
  noUrlState,
  initialValues,
}) => {
  const [showLoader, loader] = useBoolean();
  const [rows, setRows] = useState(null);
  const [itemCount, setItemCount] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  const azureSearch = useAzureSeachPayload(pageSize);
  const preFetch = (state) => fetcher(payload(state, azureSearch), state);

  const dataSource = useMutation(preFetch, {});
  const rowsQuery = useMutation(preFetch, {
    onSuccess: (result) => {
      setRows(result?.result || []);
      setPageCount(result?.total_pages || 0);
      setItemCount(result?.total_count || 0);
    },
    onError: () => {
      setRows([]);
      setPageCount(0);
      setItemCount(0);
    },
  });

  const trigger = stateHandler(rowsQuery.mutate, sort);

  const initialStateWithValues = {
    ...initialState,
    filter: {
      ...initialState.filter,
      ...(initialValues || {}),
    },
  };

  const state = useUrlState(
    urlStateKey,
    initialStateWithValues,
    trigger,
    noUrlState,
  );

  const downloadPayload = (page, size) => payload({
    ...state.current,
    [PAGE_SIZE]: size,
    [PAGE_KEY]: page,
  }, azureSearch);
  const downloadSource = useAzureSearchGetAllResults(fetcher, downloadPayload);

  return (
    <TableContext.Provider
      value={{
        loader,
        sort,
        state,
        rows,
        itemCount,
        pageCount,
        dataSource,
        downloadSource,
        isError: rowsQuery.isError,
        isLoading: rowsQuery.isLoading,
        isInitializing: (rowsQuery.isLoading && rows === null),
      }}
    >
      {children}
      {showLoader && (
        <Box
          position="absolute"
          display="flex"
          justifyContent="center"
          alignItems="center"
          left="0"
          right="0"
          top="0"
          bottom="0"
          backgroundColor="white"
          zIndex="2"
          opacity=".8"
        >
          <Spinner />
        </Box>
      )}
    </TableContext.Provider>
  );
};

TableSearchProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.any]).isRequired,
  sort: PropTypes.instanceOf(Array).isRequired,
  payload: PropTypes.func.isRequired,
  fetcher: PropTypes.func.isRequired,
  pageSize: PropTypes.number,
  urlStateKey: PropTypes.string,
  noUrlState: PropTypes.bool,
  initialValues: PropTypes.instanceOf(Object),
};

TableSearchProvider.defaultProps = {
  pageSize: 20,
  urlStateKey: '',
  noUrlState: false,
  initialValues: null,
};
