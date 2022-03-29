/* eslint-disable react/destructuring-assignment */
import React from 'react';
import * as Block from '../Block';

const Story = {
  title: 'Components/Block',
  component: Block,
  argTypes: {
    content: { control: 'text' },
  },
};
export default Story;

export const Center = (args) => (<Block.Center {...args}>{args.content}</Block.Center>);
Center.args = {
  content: 'hejhej',
};

export const Left = (args) => <Block.Left {...args}>{args.content}</Block.Left>;
Left.args = {
  content: 'hejhej',
};

export const Right = (args) => <Block.Right {...args}>{args.content}</Block.Right>;
Right.args = {
  content: 'hejhej',
};

export const Bordered = (args) => (<Block.Bordered {...args}>{args.content}</Block.Bordered>);
Bordered.args = {
  noShadow: true,
  content: 'hejhej',
  withPadding: false,
};

export const Plain = (args) => <Block.Plain {...args}>{args.content}</Block.Plain>;
Plain.args = {
  content: 'hejhej',
};

export const Stretch = (args) => (
  <Block.Stretch {...args}>
    <div style={{ border: '1px solid' }}>
      {args.content}
    </div>
  </Block.Stretch>
);
Stretch.args = {
  content: 'hejhej',
};

export const SpaceBetween = (args) => (
  <Block.SpaceBetween {...args}>
    <span>left</span>
    <span>right</span>
  </Block.SpaceBetween>
);
SpaceBetween.args = {};

export const Wrap = (args) => (
  <Block.Wrap {...args}>
    <div style={{ minWidth: '400px', border: '1px solid', padding: '0.625rem' }}>I am block #1 (min-width: 400px)</div>
    <div style={{ minWidth: '400px', border: '1px solid', padding: '0.625rem' }}>I am block #2 (min-width: 400px)</div>
  </Block.Wrap>
);
Wrap.args = {
  content: 'hejhej',
  wrapReverse: true,
};
export const WrapGrid = (args) => (
  <Block.WrapGrid {...args}>
    <div style={{ border: '1px solid black' }}>
      <div style={{ padding: '6.25rem' }}>
        Block with lots of content
      </div>
    </div>
    <div style={{ border: '1px solid black' }}>
      <div style={{ padding: '1.25rem' }}>
        Block with little content
      </div>
    </div>
  </Block.WrapGrid>
);
WrapGrid.args = {
  content: 'hejhej',
  columnMinWidth: 500,
  gridGap: 20,
  stretchColumns: false,
};

export const Error = (args) => <Block.Error {...args}>{args.content}</Block.Error>;
Error.args = {
  title: 'title',
  content: 'hejhej',
};

export const Warning = (args) => <Block.Warning {...args}>{args.content}</Block.Warning>;
Warning.args = {
  title: 'title',
  content: 'hejhej',
};

export const Info = (args) => <Block.Info {...args}>{args.content}</Block.Info>;
Info.args = {
  title: 'title',
  content: 'hejhej',
  withBottomMargin: false,
  withPadding: false,
};

export const Emptystate = (args) => <Block.Emptystate {...args}>{args.content}</Block.Emptystate>;
Emptystate.args = {
  content: 'hejhej',
  title: 'title',
};

export const Accordion = (args) => (
  <Block.Accordion {...args} title="Hello" description="Desc">
    {() => (
      <>
        <p>hej</p>
        <p>hej igen</p>
      </>
    )}
  </Block.Accordion>
);
Accordion.args = {
  content: 'hejhej',
  btnTooltip: 'dådå',
};

const SubnavigationTemplate = (args) => (
  <Block.SubnavigationBlock
    title={args.title}
    navigationList={[
      [
        { label: 'Other stuff', path: '/otherStuff', isActive: true },
        { label: 'Hidden stuff', path: '/hiddenStuff', render: () => false },
      ],
      [
        args.iWontRender && {
          label: 'On call',
          path: 'http://google.com',
          isActive: true,
          iconStyle: { background: 'pink' },
          navigationStyle: { background: 'magenta' },
          labelStyle: { background: 'orange' },
        },
        { label: 'Other stuff 2', path: '/otherStuff2' },
        { label: 'Hidden stuff 2', path: '/hiddenStuff2', render: () => false },
      ],
    ]}
  >
    <Block.Bordered noShadow withPadding>
      <h2>Did you come in early?</h2>
      <p>
        Let your colleages sleep and snooze the On Call phone.
        When you hit the snooze button the On Call phone will no
        longer be active and calls will be redirected to you instead.
      </p>
    </Block.Bordered>
  </Block.SubnavigationBlock>
);

export const SubNavigation = SubnavigationTemplate.bind({});
SubNavigation.args = {
  iWontRender: false,
  title: 'Hello',
};
