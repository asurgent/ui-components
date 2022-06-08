/* eslint-disable no-unused-vars */
import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import {
  Flex,
  Wrap,
  Text,
  Box,
  Tooltip,
  Tag,
  TagLabel,
  Link,
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

const tags = ['Typ 1', 'Typ 2', 'Typ 3', 'Typ 4'];

export default {
  title: 'Components/Table',
  component: TableSearchProvider,
  argTypes: {
    isLoading: {
      options: [false, true],
      control: { type: 'radio' },
    },
  },
};

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

const Template = (args) => (
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
    {...args}
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
      { label: 'Tags', size: '1fr' },
    ]}
    >
      <TableBodyHeader />
      <TableRows>
        {(data, idx, RowComponent) => (
          <RowComponent key={idx}>
            <Flex p={2} alignItems="center">{data.customer_display_name}</Flex>
            <Flex p={2} alignItems="center">{data.type}</Flex>
            <Box overflow="hidden" p={2}>
              <Wrap p={2} spacing=".4rem">
                {tags.length ? (
                  tags.map((label, index) => (
                    index === 0 ? (
                      <Tag key={label} bg="#f5edd8" position="relative" style={{ marginRight: '20px' }}>
                        <Tooltip hasArrow placement="top" label={tags.map((el) => `${el}`).join(', ')}>
                          <TagLabel isTruncated>
                            {tags[0]}
                          </TagLabel>
                        </Tooltip>
                        { tags.length > 1 && (
                          <span style={{ position: 'absolute', right: '-20px', fontSize: '12px' }}>
                            {(' +')}
                            {tags.length - 1}
                          </span>
                        )}
                      </Tag>
                    )
                      : null
                  ))
                ) : (
                  <Text padding="2px">-</Text>
                )}
              </Wrap>
            </Box>
          </RowComponent>
        )}
      </TableRows>
    </TableBody>
    <TablePagination delta={4} />
  </TableSearchProvider>
);

export const Primary = Template.bind({});
Primary.args = {
  isLoading: false,
};
