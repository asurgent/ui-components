const MAX_ITEMS_PER_REQUEST = 999;

const getResults = async (fetcher, payload, totalCount) => {
  const list = [];
  const resuestPageSize = totalCount > MAX_ITEMS_PER_REQUEST ? MAX_ITEMS_PER_REQUEST : totalCount;
  const pages = Math.ceil(totalCount / MAX_ITEMS_PER_REQUEST);

  for (let page = 1; page <= pages; page += 1) {
    try {
      /* eslint-disable-next-line no-await-in-loop */
      const { result } = await fetcher(payload(page, resuestPageSize));
      list.push(result);
    } catch (err) {
      console.log(err);
    }
  }

  return list.flat();
};

const useAzureSearchGetAllResults = (fetcher, downloadPayload) => ({
  fetch: async (totalCount) => getResults(fetcher, downloadPayload, totalCount),
});

export default useAzureSearchGetAllResults;
