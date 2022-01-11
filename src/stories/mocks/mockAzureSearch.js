/* eslint-disable no-unused-vars */
import { mockDBRes } from './mockResults';

const mockedData = mockDBRes(20);

const filterResult = (query, array) => array.filter((r) => {
  const values = Object.values(r).map((val) => val.toLocaleLowerCase());
  const regex = new RegExp(`${query}`, 'gi');
  if (values.some((el) => el.match(regex))) {
    return r;
  }
  return null;
});

const facetKeyDefault = {
  key: 'key',
  count: 5,
  configure: (ixd) => ({ value: `Item-${ixd}`, count: 1 + ixd }),
};

const resultsDefault = {
  configure: (idx) => mockedData[idx],
  count: 10,
};

const countFacets = (key, array) => array.reduce((acc, cur) => {
  const store = cur[key];
  const numberOfStores = acc[store] ? acc[store] + 1 : 1;
  return { ...acc, [store]: numberOfStores };
}, {});

const mergeFacets = (query, facetKeys) => ({
  ...(facetKeys.reduce((acc, facet) => {
    const merger = { ...facetKeyDefault, ...facet };

    const filtered = filterResult(query, mockedData);

    const countedFacets = countFacets(facet.key, filtered);

    const formattedFacets = Object
      .entries(countedFacets)
      .map((fac) => ({ value: fac[0], count: fac[1] }));

    return {
      ...acc,
      [merger.key]: formattedFacets,
    };
  }, {})),
});

const mockService = (
  facetKeys = [facetKeyDefault],
  results = mockedData,
  count = 50,
  pages = 5,
  page = 1,

) => async (_, payload) => new Promise((resolve) => {
  const { query } = payload;
  const facets = mergeFacets(query, facetKeys);
  const filtered = filterResult(query, mockedData);

  resolve({
    facets,
    page,
    result: filtered,
    total_pages: pages,
    total_count: count,
  });
});

export default mockService;
