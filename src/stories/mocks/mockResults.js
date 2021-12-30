const resultPool = {
  customer_display_name: ['Ikea AB', 'Ica', 'COOP'],
  type: ['Typ 1', 'Typ 2', 'Typ 3', 'Typ 4'],
};

export const mockDBRes = (length) => Array.from({ length })
  .map(() => Object.keys(resultPool).reduce((acc, cur) => {
    const numberOfEntries = resultPool[cur].length;
    const randomValue = Math.floor(Math.random() * numberOfEntries);

    return { ...acc, [cur]: resultPool[cur][randomValue] };
  }, {}));
