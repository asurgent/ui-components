import React from 'react';
import {
  Box, Flex, HStack, Wrap,
} from '@chakra-ui/react';
import { useMutation } from 'react-query';
import {
  TableSort,
  TableSearch,
  TableRowCards,
  TableRows,
  TableSearchProvider,
  TablePagination,
  TableHeader,
  TableFilterCollection,
  TableFilterSelect,
  TableDrawer,
  TableBody,
  TableBodyHeader,
  TableResultCount,
  TableFilterTagGroup,
  TableFilterBool,
  TableFilterTriState,
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

// const apiMockCall = async (state, azureSearch) => new Promise((resolve) => {
//   setTimeout(() => {
//     console.log(state);
//     if (state.isFilterTrigger) {
//       const result = {
//         page: 1,
//         result: [],
//         facets: [
//           { label: 'a-1', count: 123 },
//           { label: 'a-2', count: 123 },
//           { label: 'a-3', count: 123 },
//           { label: 'a-4', count: 123 },
//           { label: 'a-5', count: 123 },
//           { label: 'a-6', count: 123 },
//           { label: 'a-7', count: 123 },
//           { label: 'a-8', count: 123 },
//           { label: 'a-9', count: 123 },
//           { label: 'a-10', count: 123 },
//           { label: 'a-11', count: 123 },
//           { label: 'a-12', count: 123 },
//           { label: 'a-13', count: 123 },
//           { label: 'a-14', count: 123 },
//           { label: 'a-15', count: 123 },
//         ],
//         total_pages: 0,
//         total_count: 0,
//       };

//       azureSearch.facets(state, state.filterKey);

//       resolve(result.facets);
//       return result.facets;
//     }

//     // const p = azureSearch.items(state);
//     // console.log(p);

//     const result = {
//       page: 1,
//       result: [{ value: 'hello' }, { value: 'hello' }],
//       facets: [],
//       total_pages: 100,
//       total_count: 10,
//     };
//     resolve(result);
//     return result;
//   }, 500);
// });

const CardComp = () => (
  <Box bg="tomato" p={8}>
    Hej
  </Box>
);

const mockPayloadParser = (state, azureSearchParser) => {
  if (state.isFilterTrigger) {
    const a = azureSearchParser.facets(state, state.filterKey);
    console.log(a);
  }

  azureSearchParser.items(state);
};

const mockService = async (config) => new Promise((resolve, reject) => {
  resolve({ result: [] });
});

const Template = () => (
  <TableSearchProvider
    pageSize={20}
    payload={mockPayloadParser}
    fetcher={mockService}
    sort={[
      { label: 'Name', value: 'name' },
      {
        label: 'Created', value: 'created_at', desc: false, default: true,
      },
    ]}
  >
    <TableHeader>
      <TableSearch />
      <TableSort />
      <TableDrawer
        title="Apply filter for tickets"
        tooltip="View all filters"
      >
        <TableFilterSelect
          title="Change Customer"
          configuration={(filter) => ({
            title: `hej ${filter.label}`,
            value: filter.label,
            subtitle: `${filter.count} users`,
          })}
          label="Customers"
          filterKey="customer_display_name"
        >
          <TableFilterTagGroup
            color="orange"
            filterKey="customer_display_name"
            filterTitle="Customer"
          />
        </TableFilterSelect>
        <TableFilterSelect
          label="resourceGroup"
          filterKey="resource_group"
        >
          <Wrap>
            <TableFilterTagGroup
              color="red"
              filterKey="resource_group"
              filterTitle="Resource group"
            />
          </Wrap>
        </TableFilterSelect>
        <TableFilterSelect
          title="Change type"
          label="Type"
          filterKey="type"
        >
          <Wrap>
            <TableFilterTagGroup
              color="green"
              filterKey="type"
              filterTitle="Type"
            />
          </Wrap>
        </TableFilterSelect>
        <TableFilterBool
          title="Include hidden entities"
          label="Show Hidden"
          filterKey="hidden"
        />
        <TableFilterTriState
          title="Include entite with stale property"
          label="Stale"
          filterKey="stale"
        />
      </TableDrawer>
    </TableHeader>
    <HStack>
      <TableFilterSelect
        configuration={(filter) => ({
          title: `hej ${filter.label}`,
          value: filter.label,
          subtitle: `${filter.count} users`,
        })}
        label="Customers"
        filterKey="customer_display_name"
      />
      <TableFilterTriState
        label="Stale"
        filterKey="stale"
      />
      <TableFilterBool
        label="Show Hidden"
        filterKey="hidden"
      />
    </HStack>
    <TableFilterCollection
      configurations={{ type: (_, value) => `Special type: ${value}` }}
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
      <TableRows>
        {(data, idx, RowComponent) => (
          <RowComponent key={idx}>
            <Flex p={2} alignItems="center">{data.value}</Flex>
            <Flex p={2} alignItems="center">hej</Flex>
            <Flex p={2} alignItems="center">abc</Flex>
          </RowComponent>
        )}
      </TableRows>
      <TableRowCards>
        {(row, idx) => <CardComp key={idx} />}
      </TableRowCards>
    </TableBody>
    <TablePagination delta={4} />
  </TableSearchProvider>
);

export const Primary = Template.bind({});
Primary.args = {};
