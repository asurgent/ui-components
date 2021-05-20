import React from 'react';
import {
  TableSearchProvider,
  TableGrid,
  TableHeader,
  TableRows,
  TableControlls,
  TableFilterCollection,
  TablePagination,
} from '../Table';

export default {
  title: 'Components/Table',
  component: TableSearchProvider,
  argTypes: {
    isLoading: {
      type: 'boolean',
    },
  },
};

const searchWorkspaces = async (state) => {
  // eslint-disable-next-line no-console
  console.log(state);

  return {
    page: 1,
    result: [{ value: 'hello' }],
    facets: [],
    total_pages: 0,
    total_count: 0,
  };
};

const Template = () => (
  <TableSearchProvider
    dataFetcher={searchWorkspaces}
    headers={[
      { label: 'one', size: 'minmax(500px, 1fr)' },
      { label: 'two' },
      { label: 'three' },
    ]}
  >
    <TableControlls />
    <TableFilterCollection />
    <TableGrid>
      <TableHeader />
      <TableRows configuration={(row) => [row.value, 'hej', 'abc']} />
    </TableGrid>
    <TablePagination delta={3} />
  </TableSearchProvider>
);

export const Primary = Template.bind({});
Primary.args = {};
