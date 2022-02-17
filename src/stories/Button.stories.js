/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { mdiCalendar, mdiAlertDecagram } from '@mdi/js';
import Button from '../Button';

const Story = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    colorScheme: {
      control: { type: 'select', options: ['asurgent', 'gold', 'ruby', 'green'] },
    },
    variant: {
      control: { type: 'select', options: ['solid', 'outline', 'ghost', 'link'] },
    },
    size: {
      control: { type: 'select', options: ['xs', 'sm', 'md', 'lg'] },
    },
    leftIcon: {
      options: [null, mdiCalendar, mdiAlertDecagram],
      control: { type: 'radio' },
    },
    rightIcon: {
      options: [null, mdiCalendar, mdiAlertDecagram],
      control: { type: 'radio' },
    },
    isLoading: {
      options: [true, false],
      control: { type: 'radio' },
    },
    disabled: {
      options: [true, false],
      control: { type: 'radio' },
    },
  },
};

export default Story;

const ButtonTemplate = (args) => (
  <Button {...args}>{ args.children}</Button>
);

export const Btn = ButtonTemplate.bind({});
Btn.args = {
  children: 'Jag är en knapp',
  variant: 'solid',
  leftIcon: null,
  rightIcon: null,
  isLoading: false,
  loadingText: 'Submitting',
  colorScheme: 'asurgent',
  disabled: false,
  size: 'md',
  internalLink: null,
  externalLink: null,
  mailto: 'mailman@mailcompany.mail',
  onClick: () => console.log(123),
};
