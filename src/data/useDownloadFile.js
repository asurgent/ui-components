const JSONToCSV = ({ data, delimiter = ',' }) => {
  if (!Array.isArray(data)
  || data?.length === 0
  || Object.keys(data[0])?.length === 0) {
    return null;
  }

  const cols = Object.keys(data[0]);
  return [
    cols.join(delimiter),
    ...data.map((obj) => cols.reduce(
      (acc, key) => `${acc}${acc.length ? delimiter : ''}"${obj[key] || ''}"`,
      '',
    )),
  ].join('\n');
};

const stringifyData = (d) => {
  try {
    return JSON.stringify(d);
  } catch (e) {
    return '';
  }
};

const getHandledData = (data, fileExtension) => {
  switch (fileExtension) {
    case 'csv':
      return {
        data: JSONToCSV({ data }) || stringifyData(data),
        type: 'text/csv',
        extension: 'csv',
      };
    case 'json':
      return {
        data: stringifyData(data),
        type: 'application/json',
        extension: 'json',
      };
    default:
      return { data: stringifyData(data), type: 'text/plain', extension: 'txt' };
  }
};

const splitFileName = (fileName) => {
  const extension = fileName?.split('.').pop();
  if (['csv', 'json'].includes(extension)) {
    const nameWithoutExtension = fileName?.slice(0, fileName.length - (extension.length + 1));
    return {
      extension,
      name: nameWithoutExtension,
    };
  }
  return { extension: 'txt', name: fileName };
};

const downloadFile = async ({ data, fileName = 'export.csv' }) => {
  const handledFileName = splitFileName(fileName);
  const handledData = getHandledData(data, handledFileName.extension);

  const blob = new Blob([handledData.data], { type: handledData.type });
  const href = await URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = href;
  link.download = `${handledFileName?.name}.${handledData.extension}`;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default downloadFile;
