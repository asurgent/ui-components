import React from 'react';
import {  Button } from "@chakra-ui/core";
// import { styled } from "./../style/stitches.config";

const  App = () => { 
  return (
    <Button colorScheme="teal" variant="outline">
      Button
    </Button>
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