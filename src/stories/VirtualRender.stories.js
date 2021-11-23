/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { withPerformance } from 'storybook-addon-performance';
import { VirtualRender } from '../VirtualRender';

const Story = {
  title: 'Components/Virtual Render',
  component: VirtualRender,
  argTypes: {},
  decorators: [withPerformance],
};

export default Story;

const ListTemplate = (args) => {
  const items = Array.from({ length: 100 }, (_, i) => ({ pos: i }));

  return (
    <Box width="25rem" height="25rem" m={5} borderRadius="5px" border>
      <VirtualRender items={items} {...args}>
        {({ pos }, i) => (
          <Flex key={i} borderBottom="1px solid black" alignItems="center" height="100%" p="3">
            {`Position ${pos}`}
          </Flex>
        )}
      </VirtualRender>
    </Box>
  );
};

export const List = ListTemplate.bind({});
List.args = {
  rowHeight: 60,
  numberOfEntries: 100,
};
