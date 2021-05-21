import React from 'react';
import { Box } from '@chakra-ui/react';
import {
  TableSort,
  TableSearch,
  TableRowCards,
  TableRows,
  TableSearchProvider,
  TablePagination,
  TableHeader,
  TableGrid,
  TableGridHeader,
  TableFilterCollection,
  TableFilter,
  TableFilterDrawer,
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

const apiMockCall = async (state, previousState) => new Promise((resolve) => {
  setTimeout(() => {
    if (state.filterKey) {
      const result = {
        page: 1,
        result: [],
        facets: [
          { label: 'Acme', count: 123 },
          { label: 'Apple', count: 123 },
          { label: 'Amazon', count: 123 },
          { label: 'Microsoft', count: 123 },
        ],
        total_pages: 0,
        total_count: 0,
      };

      resolve(result.facets);
      return result.facets;
    }

    const result = {
      page: 1,
      result: [{ value: 'hello' }, { value: 'hello' }],
      facets: [],
      total_pages: 100,
      total_count: 10,
    };
    resolve(result);
    return result;
  }, 500);
});

const CardComp = () => (
  <Box bg="tomato" p={8}>
    Hej
  </Box>
);

const Template = () => (
  <TableSearchProvider
    pageSize={20}
    dataFetcher={apiMockCall}
  >
    <TableHeader>
      <TableSearch />
      <TableSort sort={[
        { label: 'Name', value: 'name' },
        { label: 'Created', value: 'created_at' },
      ]}
      />
      <TableFilterDrawer>
        <TableFilter
          configuration={(filter) => ({
            title: `hej ${filter.label}`,
            value: filter.label,
            subtitle: `${filter.count} users`,
          })}
          label="Customers"
          filterKey="customer"
        />
      </TableFilterDrawer>
    </TableHeader>
    <TableFilter
      configuration={(filter) => ({
        title: `hej ${filter.label}`,
        value: filter.label,
        subtitle: `${filter.count} users`,
      })}
      label="Customers"
      filterKey="customer"
    />
    <TableFilterCollection />
    <TableGrid columns={[
      { label: 'one', size: 'minmax(500px, 1fr)' },
      { label: 'two' },
      { label: 'three' },
    ]}
    >
      <TableGridHeader />
      <TableRows configuration={(row) => [row.value, 'hej', 'abc']} />
      <TableRowCards component={CardComp} />
    </TableGrid>
    <TablePagination delta={3} />
  </TableSearchProvider>
);

export const Primary = Template.bind({});
Primary.args = {};
