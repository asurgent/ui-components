import { useState } from 'react';
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
const dataFetcher = ({ payload }) => {

};

const useGetAllAzureSearchResults = (fetcher) => {
  const [result, setResult] = useState([]);

  const iface = {
    fetchResults: (totalCount, state) => {
      const resuestPageSize = totalCount > maxItemsPerRequest ? maxItemsPerRequest : totalCount;
      const pages = Math.ceil(totalCount / maxItemsPerRequest);

      const payload = {
        ...defaultPayload,
        ...state,
        page: 1,
        page_size: resuestPageSize,
        facets: [],
      };

      const res = Array.from({ length: pages })
        .reduce(async (acc, _, index) => {
          const data = await dataFetcher(payload, fetcher);
          return [...acc, ...data];
        }, []);

      setResult(res);
      return res;
    },
  };
};
