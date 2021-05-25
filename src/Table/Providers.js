import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { TableContext } from './data/context';
import useUrlState from '../data/useUrlState';
import useAzureSeachPayload from '../data/useAzureSeachPayload';
import {
  QUERY_KEY,
  PAGE_KEY,
  FILTER_KEY,
  initalState,
} from './data/constants';

const stateHandler = (mutate) => ({ setKey }, current, prev) => {
  const searchChanged = current
    && prev
    && (current[QUERY_KEY] !== prev[QUERY_KEY])
    && current[PAGE_KEY] !== 1;

  const filterChanged = current
    && prev
    && (JSON.stringify(current[FILTER_KEY]) !== JSON.stringify(prev[FILTER_KEY]));

  // console.log('current', current);

  if (filterChanged) {
    setKey(QUERY_KEY, '');
    setKey(PAGE_KEY, 1);
  } else if (searchChanged) {
    setKey(PAGE_KEY, 1);
  } else {
    // console.log('fetch');
    mutate(current);
  }
};

export const TableSearchProvider = ({
  children,
  dataFetcher,
  pageSize = 20,
  urlStateKey = 'test',
}) => {
  const [rows, setRows] = useState(null);
  const [itemCount, setItemCount] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  const azureSearch = useAzureSeachPayload(pageSize);
  const preFetch = (state) => dataFetcher(state, azureSearch);

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

  const state = useUrlState(urlStateKey, initalState, stateHandler(rowsQuery.mutate));

  return (
    <TableContext.Provider
      value={{
        state,
        rows,
        itemCount,
        pageCount,
        dataSource,
        isError: rowsQuery.isError,
        isLoading: rowsQuery.isLoading,
        isInitializing: (rowsQuery.isLoading && rows === null),
      }}
    >
      {children}
    </TableContext.Provider>
  );
};
