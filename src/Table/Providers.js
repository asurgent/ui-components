import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { TableContext } from './data/context';
import useUrlState from '../data/useUrlState';
import useAzureSeachPayload from '../data/useAzureSeachPayload';
import {
  QUERY_KEY,
  PAGE_KEY,
  FILTER_KEY,
  ORDER_KEY,
  initalState,
  ORDER_DESC,
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
  pageSize = 20,
  dataFetcher,
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

  const state = useUrlState(urlStateKey, initalState, stateHandler(rowsQuery.mutate, sort));

  return (
    <TableContext.Provider
      value={{
        sort,
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
