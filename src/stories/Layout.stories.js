/* eslint-disable no-console */
import React, { useEffect } from 'react';
import {
  mdiCompass,
  mdiViewDashboard,
  mdiAndroidMessages,
  mdiTimerOutline,
  mdiExitRun,
  mdiAlienOutline,
} from '@mdi/js';
import * as Layout from '../Layout';
import * as Block from '../Block';

const Story = {
  title: 'Layout/Layout',
  component: Layout.Main,
  argTypes: {
    provider: { control: false },
    children: { control: false },
  },
};
export default Story;

const navigationList = () => [
  {
    label: 'DashboardLabel',
    tooltip: 'DashboardTooltip',
    active: true,
    icon: mdiViewDashboard,
    link: '/dashboard',
  },
  {
    label: 'ExploreLabel',
    tooltip: 'ExploreTooltip',
    icon: mdiCompass,
    link: `/my-environment/${1234 || ''}`,
  },
  {
    label: 'TicketsLabel',
    tooltip: 'TicketsTooltip',
    icon: mdiAndroidMessages,
    link: '/tickets',
  },
  {
    label: 'Gå ut',
    tooltip: 'Gå ut',
    icon: mdiExitRun,
    link: '/irl',
    isDropdownItem: true,
  },
  {
    label: 'Aliens',
    tooltip: 'Aliens',
    icon: mdiAlienOutline,
    link: '/area51',
    isDropdownItem: true,
  },
];

const avaliableLanguages = (translator, selected) => [
  { value: 'en', label: translator('english'), default: selected === 'en' },
  { value: 'sv', label: translator('swedish'), default: selected === 'sv' },
];

// createList = (translator, selected) =>
const createList = () => [
  {
    title: 'Ticket',
    description: 'create a new ticket',
    icon: (mdiAndroidMessages),
    onClick: () => console.log('create ticket'),
  },
  {
    title: 'Service window',
    description: 'setup a new service window',
    icon: (mdiTimerOutline),
    onClick: () => console.log('create ticket'),
  },
];

const MainLayoutTemplate = () => {
  const provider = Layout.useLayout({
    translator: (t) => t,
    navigationListConstructor: navigationList,
    avaliableLanguagesConstructor: avaliableLanguages,
    createListConstructor: createList,
    onLogout: () => console.log('Logout action'),
    onChangeLanguage: (lang) => console.log('Selected language', lang),
  });

  useEffect(() => {
    provider.setNavigationList(navigationList());
    provider.setCreateList(createList);
    provider.setCurrentLanguage('sv');
    provider.setCustomerId('1234');
    provider.setCustomerName('Asurgent AB');
    provider.setUser({
      name: 'Steve Martin',
      email: 'steve.martin@asurgent.com',
      imageLink: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
    });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout.Main provider={provider}>
      <Layout.Omnibar.Main>
        <p>Omnibar Main</p>
      </Layout.Omnibar.Main>
      <Layout.Scene>
        <Block.Center>
          <p>Layout Scene</p>
        </Block.Center>
        <Block.Center>
          <p>hej</p>
        </Block.Center>
      </Layout.Scene>
    </Layout.Main>

  );
};

export const MainLayout = MainLayoutTemplate.bind({});
MainLayout.args = {};
