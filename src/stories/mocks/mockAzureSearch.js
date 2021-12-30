/* eslint-disable no-unused-vars */
import { mockDBRes } from './mockResults';

const mockedData = mockDBRes(20);

const facetKeyDefault = {
  key: 'key',
  count: 5,
  configure: (ixd) => ({ value: `Item-${ixd}`, count: 1 + ixd }),
};

const resultsDefault = {
  configure: (idx) => mockedData[idx],
  count: 10,
};

const test = (key, array) => array.reduce((acc, cur) => {
  const store = cur[key];
  const numberOfStores = acc[store] ? acc[store] + 1 : 1;
  return { ...acc, [store]: numberOfStores };
}, {});

const mergeFacets = (facetKeys) => ({
  ...(facetKeys.reduce((acc, facet) => {
    const merger = { ...facetKeyDefault, ...facet };
    console.log('merger', merger);

    console.log('mockedData', mockedData);
    console.log('facet', facet);

    const mytest = test(facet.key, mockedData);
    console.log('my test', mytest);
    console.log('merger.key', merger.key);

    const facetResult = Array.from({ length: merger.count }).map((_, i) => merger.configure(i));
    console.log('facetResult', facetResult);

    const v = Object.entries(mytest).map((el) => ({ value: el[0], count: el[1] }));
    return {
      ...acc,
      [merger.key]: v,
    };
  }, {})),
});

const mockService = (
  facetKeys = [facetKeyDefault],
  results = { ...resultsDefault },
  count = 50,
  pages = 5,
  page = 1,
) => async () => new Promise((resolve) => {
  console.log('facetKeys', facetKeys);

  const facets = mergeFacets(facetKeys);
  const mergeResults = { ...resultsDefault, ...results };

  resolve({
    facets,
    page,
    result: Array.from({ length: mergeResults.count }).map((_, i) => mergeResults.configure(i)),
    total_pages: pages,
    total_count: count,
  });
});

export default mockService;
