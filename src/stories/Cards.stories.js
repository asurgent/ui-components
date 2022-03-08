import React from 'react';
import * as Cards from '../Cards';

const Story = {
  title: 'Components/Cards',
  component: Cards.Entity,
  argTypes: {},
};
export default Story;

const content = (<h1 style={{ display: 'inline-block' }}>Hover me</h1>);

const EntityTemplate = (args) => (<Cards.Entity {...args}>{content}</Cards.Entity>);

export const Entity = EntityTemplate.bind({});

Entity.args = {
  id: 123,
  name: 'Gurka',
  type: 'Mine',
  resourceGroup: 'Sweden',
  region: 'Sthlm',
  displayName: 'Asurgent',
  tags: ['test-tag', 'another-tag', 'yet-another-tag'],
};
