/* eslint-disable no-unused-vars */
import React from 'react';
import {
  Box, Flex,
} from '@chakra-ui/react';
import {
  TableSort,
  TableSearch,
  TableRowCards,
  TableRows,
  TableSearchProvider,
  TablePagination,
  TableHeader,
  TableFilterTags,
  TableFilterSelect,
  TableFilterSelectSingle,
  TableDrawer,
  TableBody,
  TableBodyHeader,
  TableResultCount,
  TableFilterBool,
  TableFilterTriState,
  TableFilterStack,
} from '../Table';
import mockAzureSearch from './mocks/mockAzureSearch';

const mockService = mockAzureSearch([
  { key: 'customer_display_name' },
  { key: 'type' },
]);

export default {
  title: 'Components/Table',
  component: TableSearchProvider,
  argTypes: {
    isLoading: {
      type: 'boolean',
    },
  },
};

const CardComp = () => (
  <Box bg="tomato" p={8}>
    Hej
  </Box>
);

const mockPayloadParser = (state, azureSearchParser) => {
  const parsers = {
    filter: {
      customer_display_name: (val) => `${val} less than something cool`,
    },
  };

  if (state.isFilterTrigger) {
    return azureSearchParser.facets(state, state.filterKey, parsers);
  }
  return azureSearchParser.items(state, parsers);
};

const Template = () => (
  <TableSearchProvider
    /* initialValues={{ hidden: [true], stale: [false] }} */
    pageSize={20}
    payload={mockPayloadParser}
    fetcher={mockService}
    urlStateKey="urlStateKey"
    sort={[
      {
        label: 'Name', value: 'name', desc: false, default: true,
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
          title="changeCustomer"
          label="customer"
          filterKey="customer_display_name"
          color="orange"
          renderTags
        />
        <TableFilterSelect
          title="changeType"
          label="type"
          filterKey="type"
          color="green"
          renderTags
        />
      </TableDrawer>
    </TableHeader>
    <TableFilterStack>
      <TableFilterSelectSingle
        renderTags={false}
        label="Customers"
        filterKey="customer_display_name"
        configuration={(filter) => ({
          title: `Affär: ${filter.value}`,
          value: filter.value,
          subtitle: `${filter.count} types`,
        })}
      />
      <TableFilterSelect
        renderTags={false}
        label="Type"
        filterKey="type"
        color="green"
      />
      <TableFilterBool
        title="some bool"
        label="some boole"
        filterKey="end"
        horizontal
      />

    </TableFilterStack>
    <TableFilterTags
      configurations={{ customer_display_name: (_, value) => `Val: ${value}`, type: (_, value) => `Special type: ${value}` }}
      colors={{ customer_display_name: 'blue', container_name: 'green', is_mapped: 'ruby' }}
    />
    <TableResultCount />
    <TableBody columns={[
      { label: 'Customer', size: '10rem' },
      { label: 'Type', size: '1fr' },
    ]}
    >
      <TableBodyHeader />
      <TableRows>
        {(data, idx, RowComponent) => (
          <RowComponent key={idx}>
            <Flex p={2} alignItems="center">{data.customer_display_name}</Flex>
            <Flex p={2} alignItems="center">{data.type}</Flex>
          </RowComponent>
        )}
      </TableRows>
    </TableBody>
    <TablePagination delta={4} />
  </TableSearchProvider>
);

export const Primary = Template.bind({});
Primary.args = {};

/*
Card version:
 <TableRowCards>
    {(_, idx) => <CardComp key={idx} />}
  </TableRowCards>
*/
