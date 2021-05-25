import {useState} from 'react'
import { useMutation } from 'react-query';

const defaultPayload = {
  search_string: '',
  filter: '',
  facets: [],
  order_by: [],
  search_fields: [],
  page_size: 10,
  page: 1,
};

const maxItemsPerRequest = 999;
const dataFetcher = ({payload}) => {

}

const useGetAllAzureSearchResults = (fetcher) => {
  const [result, setResult] = useState([]);
  
  const iface = {
    fetchResults: (totalCount, state)=> {
      const resuestPageSize = totalCount > maxItemsPerRequest ? maxItemsPerRequest : totalCount;
      const pages = Math.ceil(totalCount / maxItemsPerRequest);

      const payload = {
        ...defaultPayload,
        ...state,
        page: 1, 
        page_size: resuestPageSize, 
        facets: []
      }

      const res = Array.from({length: pages})
      .reduce(async (acc, _, index)=> {
        const data = await dataFetcher(payload, fetcher);
        return [...acc, ...data];
      },[] );

      setResult(res);
      return res;
    }
  }
};

const async = () => {
  const totalPages = tableData.total_pages;
  const result = [];
  setIsExporting(true);

  if (totalPages > 1) {
    const itemCount = tableData.total_count;
    const maxItemsPerRequest = 999;
    const resuestPageSize = itemCount > maxItemsPerRequest ? maxItemsPerRequest : itemCount;
    const pages = Math.ceil(itemCount / maxItemsPerRequest);

    const { callback } = updateTableItems;
    const { filter } = rowRequestState;

    const payload = {
      ...defaultPayload,
      filter,
      search_string: rowRequestState.search_string,
      page_size: 0,
    };

    if (payloadOverrides && typeof payloadOverrides === 'function') {
      Object.assign(payload, payloadOverrides(payload));
    }

    Object.assign(payload, { page_size: resuestPageSize, facets: [] });

    const req = (page) => new Promise((resolve) => {
      const requestPayload = Object.assign(payload, { page });
      const success = (e) => { resolve(e.result); };
      const reject = () => { };
      callback(requestPayload, success, reject);
    });

    for (let i = 1; i <= pages; i += 1) {
      /* eslint-disable-next-line no-await-in-loop */
      const res = await req(i);
      result.push(res);
    }
  } else {
    result.push(tableData.result);
  }
  setIsExporting(false);

  return result.flat();
}