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
  TableFilterCollection,
  TableFilter,
  TableDrawer,
  TableBody,
  TableBodyHeader,
  TableResultCount,
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

const apiMockCall = async (state, azureSearch) => new Promise((resolve) => {
  setTimeout(() => {
    if (state.filterFacetKey) {
      const result = {
        page: 1,
        result: [],
        facets: [
          { label: 'Acme1', count: 123 },
          { label: 'Apple2', count: 123 },
          { label: 'Amazon3', count: 123 },
          { label: 'Microsoft4', count: 123 },
          { label: 'Acme5', count: 123 },
          { label: 'Apple6', count: 123 },
          { label: 'Amazon7', count: 123 },
          { label: 'Microsoft8', count: 123 },
          { label: 'Acme9', count: 123 },
          { label: 'Apple10', count: 123 },
          { label: 'Amazon11', count: 123 },
          { label: 'Microsoft12', count: 123 },
          { label: 'Acme13', count: 123 },
          { label: 'Apple14', count: 123 },
          { label: 'Amazon15', count: 123 },
        ],
        total_pages: 0,
        total_count: 0,
      };

      azureSearch.facets(state, state.filterFacetKey);

      resolve(result.facets);
      return result.facets;
    }

    const p = azureSearch.items(state);
    console.log(p);

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
      <TableDrawer
        notify={(state) => !!Object.values(state?.filter || {}).flat().length}
        title="Apply filter for"
        tooltip="View all filters"
      >
        <TableFilter
          configuration={(filter) => ({
            title: `hej ${filter.label}`,
            value: filter.label,
            subtitle: `${filter.count} users`,
          })}
          renderTags
          label="Customers"
          filterKey="customer"
          color="orange"
        />
        <TableFilter
          renderTags
          label="Type"
          filterKey="type"
          color="green"
        />
      </TableDrawer>
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
    <TableFilterCollection
      colors={{ type: 'green', customer: 'orange' }}
    />
    <TableResultCount />
    <TableBody columns={[
      { label: 'one', size: 'minmax(500px, 1fr)' },
      { label: 'two' },
      { label: 'three' },
    ]}
    >
      <TableBodyHeader />
      <TableRows configuration={(row) => [row.value, 'hej', 'abc']} />
      <TableRowCards component={CardComp} />
    </TableBody>
    <TablePagination delta={3} />
  </TableSearchProvider>
);

export const Primary = Template.bind({});
Primary.args = {};
