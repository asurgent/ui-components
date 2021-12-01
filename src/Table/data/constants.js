export const QUERY_KEY = 'query';
export const FILTER_KEY = 'filter';
export const PAGE_KEY = 'page';
export const PAGE_SIZE = 'size';
export const ORDER_KEY = 'order';
export const ORDER_DESC = 'order_desc';

export const initialState = {
  [QUERY_KEY]: '',
  [FILTER_KEY]: {},
  [ORDER_KEY]: null,
  [ORDER_DESC]: null,
  [PAGE_KEY]: 1,
};
