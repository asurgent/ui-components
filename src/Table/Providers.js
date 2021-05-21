import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { TableContext } from './data/context';
import useUrlState from './data/useUrlState';
import {
  QUERY_KEY,
  PAGE_KEY,
  FILTER_KEY,
  initalState,
} from './data/constants';

const stateHandler = (mutate, dataFetcher) => ({ setKey }, current, prev) => {
  const searchChanged = current
    && prev
    && (current[QUERY_KEY] !== prev[QUERY_KEY])
    && current[PAGE_KEY] !== 1;

  const filterChanged = current
    && prev
    && (JSON.stringify(current[FILTER_KEY]) !== JSON.stringify(prev[FILTER_KEY]));

  if (filterChanged) {
    setKey(QUERY_KEY, '');
    setKey(PAGE_KEY, 1);
  } else if (searchChanged) {
    setKey(PAGE_KEY, 1);
  } else if (dataFetcher) {
    mutate(current, prev);
  }
};

export const TableSearchProvider = ({
  children,
  dataFetcher,
}) => {
  const [rows, setRows] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const filterQuery = useMutation(dataFetcher, {});
  const {
    data,
    isSuccess,
    isLoading,
    mutate,
    isError,
  } = useMutation(dataFetcher, {
    onSuccess: (result) => {
      setRows(result?.result || []);
      setPageCount(result?.total_pages || 0);
    },
  });
  const state = useUrlState('test', initalState, stateHandler(mutate, dataFetcher));

  return (
    <TableContext.Provider
      value={{
        state,
        filterQuery,
        pageCount,
        rows,
        isError,
        isLoading,
        isInitialized: ((isSuccess || isError) && data !== undefined),
      }}
    >
      {children}
    </TableContext.Provider>
  );
};
