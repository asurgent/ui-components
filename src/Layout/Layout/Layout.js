import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { mdiChevronDown, mdiChevronLeft } from '@mdi/js';
import { useTheme } from '@chakra-ui/react';
import { Button } from '../../Button';
import IconAsurget from '../../Icons/IconAsurget';
import CurrentUser from '../CurrentUser';
import DropdownMenu from '../DropdownMenu';
import DropdownCreate from '../DropdownCreate';
import * as C from './Layout.styled';
import Navigation from '../Navigation';
import translation from './Layout.translation';

const propTypes = {
  provider: PropTypes.instanceOf(Object).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

const defaultProps = {};

const createListPropTypes = {
  createList: PropTypes.instanceOf(Array),
};

const createListDefaultProps = {
  createList: [],
};

const CreateList = ({ createList }) => {
  const { t } = translation;
  const [createOpen, setCreateOpen] = useState(false);

  if (createList && createList.length === 0) {
    return null;
  }

  return (
    <>
      <Button
        onClick={() => setCreateOpen(!createOpen)}
        rightIcon={createOpen ? mdiChevronLeft : mdiChevronDown}
      >
        { t('create', 'ui') }
      </Button>
      <DropdownCreate
        onClose={() => setCreateOpen(!createOpen)}
        isOpen={createOpen}
        createActionList={createList}
      />
    </>
  );
};

CreateList.propTypes = createListPropTypes;
CreateList.defaultProps = createListDefaultProps;

const Layout = ({ provider, children }) => {
  const { colors, breakpoints } = useTheme();

  const navigationList = provider.getNavigationItems();

  const languages = provider.getAvaliableLanguages();
  const selectedLanguage = provider.getCurrentLanguage();
  const {
    name,
    email,
    imageLink,
  } = provider.getUser();

  const customerName = provider.getCustomerName();

  const sideNavList = useMemo(() => {
    if (navigationList) {
      return navigationList.filter((nav) => !nav.isDropdownItem);
    }
    return [];
  }, [navigationList]);

  return (
    <C.Main colors={colors} breakpoints={breakpoints}>
      <C.Left colors={colors}>
        <Navigation navigationList={sideNavList} />
      </C.Left>

      <C.Content>
        {children}
      </C.Content>

      <C.Top colors={colors} breakpoints={breakpoints}>
        <C.Logo colors={colors} breakpoints={breakpoints}>
          <IconAsurget />
        </C.Logo>
        <CreateList createList={provider.getCreateList()} />
        <CurrentUser
          name={name}
          email={email}
          imageLink={imageLink}
          customerName={customerName}
        >
          {({ onClose, isOpen }) => (
            <DropdownMenu
              name={name}
              email={email}
              customerName={customerName}
              imageLink={imageLink}
              onClose={onClose}
              isOpen={isOpen}
              languages={languages}
              navigationList={navigationList}
              onNavigate={onClose}
              selectedLanguage={selectedLanguage}
              onChangeLanguage={provider.onChangeLanguage}
              onLogout={provider.onLogout}
            />
          )}
        </CurrentUser>
      </C.Top>
    </C.Main>
  );
};

Layout.propTypes = propTypes;
Layout.defaultProps = defaultProps;

export default Layout;
