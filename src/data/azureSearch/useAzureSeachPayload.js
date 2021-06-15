import * as tableState from '../../Table/data/constants';

const isBoolean = (val) => typeof val === 'boolean';

const generateFilter = (filters, parser) => {
  const f = Object.entries(filters).reduce((acc, [facet, values]) => {
    const res = values.map((parser?.[facet]) || ((value) => {
      if (isBoolean(value)) {
        return `${facet} eq ${value}`;
      }
      return `${facet} eq '${value}'`;
    })).join(' or ');

    return [...acc, [`(${res})`]];
  }, []);

  const result = f.join(' and ');

  if (result) {
    return `${result}`;
  }
  return '';
};

const generateSearch = (query, parser = (str) => str) => {
  if (!query) {
    return '';
  }

  const sanatize = query
    .replace(/\*/g, '') // Remove all *
    .replace(/\+/g, '') // Remove all +
    .replace(/-/g, '+'); // Replace all - with +

  const joined = (sanatize).split(' ').join('*+');

  return parser(`${joined}*`);
};

const generateOrder = (key, desc) => {
  if (key === null || desc === null) {
    return [];
  }
  return [`${key} ${desc ? 'desc' : 'asc'}`];
};

const generate = (state, initialPageSize, parsers) => {
  const {
    [tableState.FILTER_KEY]: filter,
    [tableState.ORDER_DESC]: orderDesc,
    [tableState.ORDER_KEY]: orderKey,
    [tableState.PAGE_KEY]: page,
    [tableState.QUERY_KEY]: query,
    [tableState.PAGE_SIZE]: pageSize,
  } = state;

  return {
    search_string: generateSearch(query, parsers?.search),
    filter: generateFilter(filter || {}, parsers?.filter),
    facets: [],
    order_by: generateOrder(orderKey, orderDesc),
    search_fields: [],
    page_size: pageSize || initialPageSize,
    page,
  };
};

const useAzureSeachPayload = (pageSize) => ({
  items: (state, parsers) => ({ ...generate(state, pageSize, parsers) }),
  facets: (state, filterKey, parsers) => {
    const {
      [tableState.FILTER_KEY]: filter,
    } = state;
    const { [filterKey]: _target, ...rest } = filter || {};
    const removeSelfFromState = { ...state, filter: rest };

    return {
      ...generate(removeSelfFromState, 0, parsers),
      facets: [`${filterKey}, count:0`],
      search_string: '',
    };
  },
});

export default useAzureSeachPayload;
