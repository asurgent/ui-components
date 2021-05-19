import React from 'react';
import {  Box, SkeletonText ,Skeleton, SkeletonCircle} from "@chakra-ui/core";

const  App = () => { 
  return (
    <>
      <Box padding="6" boxShadow="lg" bg="white">
        <SkeletonCircle size="10" />
        <SkeletonText mt="4" noOfLines={4} spacing="4" />
      </Box>
    </>
  )
}

export default {
  title: 'Example/Button',
  component: App,
  argTypes: {},
};

const Template = (args) => <App />;

export const Primary = Template.bind({});
Primary.args = {};