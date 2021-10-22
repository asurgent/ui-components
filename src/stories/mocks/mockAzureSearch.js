const facetKeyDefault = { key: 'key', count: 5, configure: (ixd) => ({ value: `Item - ${ixd}`, count: 1 + ixd }) };
const resultsDefault = { configure: (idx) => ({ value: `Row ${idx}` }), count: 5 };

const mockService = (
  facetKeys = [...facetKeyDefault],
  results = { ...resultsDefault },
  count = 5,
  pages = 1,
  page = 1,
) => async () => new Promise((resolve) => {
  const facets = {
    ...(facetKeys.reduce((acc, facet) => {
      const merger = { ...facetKeyDefault, ...facet };
      return {
        ...acc,
        [merger.key]: Array.from({ length: merger.count }).map((_, i) => merger.configure(i)),
      };
    }, {})),
  };
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
