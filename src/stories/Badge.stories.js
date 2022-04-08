/* eslint-disable react/destructuring-assignment */
import React from 'react';
import * as Badge from '../Badge';

const Story = {
  title: 'Components/Badge',
  component: Badge,
  argTypes: {
    content: { control: 'text' },
    withMargins: { control: 'boolean' },
    renderTransparent: { control: 'boolean' },
    status: {
      control: {
        type: 'select',
        options: [
          'pending',
          'open',
          'closed',
          'on hold',
          'executing',
          'resolved',
        ],
      },
    },
  },
};
export default Story;

export const Status = (args) => (
  <div style={{ display: 'flex' }}>
    <Badge.Status {...args}>{args.content}</Badge.Status>
  </div>
);
Status.args = {
  status: 'executing',
  scale: 1.0,
  useIcon: true,
};
