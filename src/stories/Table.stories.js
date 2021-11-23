/* eslint-disable no-unused-vars */
import React from 'react';
import { withPerformance } from 'storybook-addon-performance';
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
  { key: 'resource_group' },
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
  decorators: [withPerformance],
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
    pageSize={20}
    payload={mockPayloadParser}
    fetcher={mockService}
    urlStateKey="tetare"
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
          title="changeCustomer"
          label="customer"
          filterKey="customer_display_name"
          color="orange"
          renderTags
        />
        <TableFilterSelect
          title="changeResourceGroup"
          label="resourceGroup"
          filterKey="resource_group"
          color="red"
          renderTags
        />
        <TableFilterSelect
          title="changeType"
          label="type"
          filterKey="type"
          color="green"
          renderTags
        />
        <TableFilterTriState
          title="changeIsMapped"
          label="isMapped"
          filterKey="is_mapped"
        />
        <TableFilterTriState
          title="changeIsHidden"
          label="isHidden"
          filterKey="is_hidden"
        />
        <TableFilterBool
          title="changeIStale"
          label="isStale"
          filterKey="is_stale"
        />
      </TableDrawer>
    </TableHeader>
    <TableFilterStack>
      <TableFilterSelectSingle
        renderTags={false}
        label="Customers"
        filterKey="customer_display_name"
        configuration={(filter) => ({
          title: `hej ${filter.label}`,
          value: filter.label,
          subtitle: `${filter.count} users`,
        })}
      />
      <TableFilterSelect
        renderTags={false}
        label="Customers"
        filterKey="resource_group"
      />
      <TableFilterTriState
        label="Stale"
        filterKey="stale"
        renderTags
      />
      <TableFilterBool
        label="Show Hidden"
        filterKey="hidden"
        renderTags
      />

    </TableFilterStack>
    <TableFilterTags
      configurations={{ customer_display_name: (_, value) => `Val: ${value}`, type: (_, value) => `Special type: ${value}` }}
      colors={{ customer_display_name: 'blue', container_name: 'green', is_mapped: 'ruby' }}
    />
    <TableResultCount />
    <TableBody columns={[
      { label: 'one', size: 'minmax(500px, 1fr)', render: false },
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
        {(_, idx) => <CardComp key={idx} />}
      </TableRowCards>
    </TableBody>
    <TablePagination delta={4} />
  </TableSearchProvider>
);

export const Primary = Template.bind({});
Primary.args = {};
