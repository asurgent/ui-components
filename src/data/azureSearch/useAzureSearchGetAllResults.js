const MAX_ITEMS_PER_REQUEST = 999;

const getResults = async (fetcher, totalCount, callback) => {
  const result = [];
  const resuestPageSize = totalCount > MAX_ITEMS_PER_REQUEST ? MAX_ITEMS_PER_REQUEST : totalCount;
  const pages = Math.ceil(totalCount / MAX_ITEMS_PER_REQUEST);
  const { payload, ...rest } = callback;
  const updatedPayload = {
    ...payload,
    page_size: resuestPageSize,
    page: 0,
  };

  for (let i = 1; i <= pages; i += 1) {
    try {
      /* eslint-disable-next-line no-await-in-loop */
      const { result: res } = await fetcher({ ...rest, payload: updatedPayload });
      result.push(res);
    } catch (err) {
      console.log(err);
    }
  }

  return result.flat();
};
