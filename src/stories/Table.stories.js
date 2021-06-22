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
  TableDrawer,
  TableBody,
  TableBodyHeader,
  TableResultCount,
  TableFilterBool,
  TableFilterTriState,
  TableFilterStack,
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

const CardComp = () => (
  <Box bg="tomato" p={8}>
    Hej
  </Box>
);

const mockPayloadParser = (state, azureSearchParser) => {
  console.log(state);
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

const mockService = async () => new Promise((resolve) => {
  resolve({
    facets: {
      customer_display_name: [
        { label: 'a-1', count: 123 },
        { label: 'a-2', count: 123 },
        { label: 'a-3', count: 123 },
        { label: 'a-4', count: 123 },
        { label: 'a-5', count: 123 },
        { label: 'a-6', count: 123 },
        { label: 'a-7', count: 123 },
        { label: 'a-8', count: 123 },
        { label: 'a-9', count: 123 },
        { label: 'a-10', count: 123 },
        { label: 'a-11', count: 123 },
        { label: 'a-12', count: 123 },
        { label: 'a-13', count: 123 },
        { label: 'a-14', count: 123 },
        { label: 'a-15', count: 123 },
      ],
    },
    page: 1,
    result: [{ value: 'hello' }, { value: 'hello' }],
    total_pages: 2,
    total_count: 2,
  });
});

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
          title="changeContainer"
          label="container"
          filterKey="container_name"
          color="red"
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
    </TableFilterStack>
    <TableFilterTags
      configurations={{ type: (_, value) => `Special type: ${value}` }}
      colors={{ type: 'blue', customer: 'green', is_mapped: 'ruby' }}
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
