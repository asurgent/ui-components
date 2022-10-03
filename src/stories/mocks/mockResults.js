const resultPool = {
  customer_display_name: ['Ikea AB', 'Ica', 'COOP'],
  entity_types: ['microsoft.automation/automationaccounts/runbooks', 'microsoft.compute/virtualmachines/extensions', 'microsoft.logic/workflows'],
  type: ['Typ 1', 'Typ 2', 'Typ 3', 'Typ 4'],
  tags: ['Typ 1', 'Typ 2', 'Typ 3', 'Typ 4'],
};

export const mockDBRes = (length) => Array.from({ length })
  .map(() => Object.keys(resultPool).reduce((acc, cur) => {
    const numberOfEntries = resultPool[cur].length;
    const randomValue = Math.floor(Math.random() * numberOfEntries);

    return { ...acc, [cur]: resultPool[cur][randomValue] };
  }, {}));
