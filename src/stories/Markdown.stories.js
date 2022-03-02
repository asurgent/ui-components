import React from 'react';
import { Primary } from '../Markdown';
import myMarkdown from './exampleMarkdown.md';

const Story = {
  title: 'Helpers/Markdown',
  component: Primary,
  argTypes: {
    flavor: {
      options: ['original', 'vanilla', 'github'],
      control: { type: 'radio' },
    },
  },
};
export default Story;

const Template = (args) => <Primary {...args} />;

export const Main = Template.bind({});
Main.args = {
  className: 'mySpecificClass',
  flavor: 'github',
  markdown: myMarkdown,
  foldQuotes: true,
};
