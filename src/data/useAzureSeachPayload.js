import * as tableState from '../Table/data/constants';

const generateFilter = (filters) => {
  const f = Object.entries(filters).reduce((acc, [facet, values]) => {
    const res = values.map((value) => `${facet} eq '${value}'`).join(' or ');

    return [...acc, [`(${res})`]];
  }, []);

  const result = f.join(' and ');

  if (result) {
    return `(${result})`;
  }
  return '';
};

const generateSearch = (query) => {
  if (!query) {
    return '';
  }

  const sanatize = query
    .replace(/\*/g, '') // Remove all *
    .replace(/\+/g, '') // Remove all +
    .replace(/-/g, '+'); // Replace all - with +

  const joined = (sanatize).split(' ').join('*+');

  return `${joined}*`;
};

const generateOrder = (key, desc) => {
  if (key === null || desc === null) {
    return [];
  }
  return [`${key} ${desc ? 'desc' : 'asc'}`];
};

const generate = (state, pageSize) => {
  const {
    [tableState.FILTER_KEY]: filter,
    [tableState.ORDER_DESC]: orderDesc,
    [tableState.ORDER_KEY]: orderKey,
    [tableState.PAGE_KEY]: page,
    [tableState.QUERY_KEY]: query,
  } = state;

  return {
    search_string: generateSearch(query),
    filter: generateFilter(filter || {}),
    facets: [],
    order_by: generateOrder(orderKey, orderDesc),
    search_fields: [],
    page_size: pageSize,
    page,
  };
};

const useAzureSeachPayload = (pageSize) => ({
  items: (state) => ({ ...generate(state, pageSize) }),
  facets: (state, filterKey) => {
    const {
      [tableState.FILTER_KEY]: filter,
    } = state;
    const { [filterKey]: _target, ...rest } = filter || {};
    const removeSelfFromState = { ...state, filter: rest };

    return {
      ...generate(removeSelfFromState, 0),
      facets: [`${filterKey}, count:0`],
    };
  },
});

export default useAzureSeachPayload;
