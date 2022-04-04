import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { mdiChevronDown, mdiChevronLeft } from '@mdi/js';
import {
  useTheme,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useDisclosure,
  useMediaQuery,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
} from '@chakra-ui/react';
import { Button } from '../../Button';
import IconAsurget from '../../Icons/IconAsurget';
import CurrentUser from '../CurrentUser';
import DropdownMenu from '../DropdownMenu';
import DropdownMenuMobile from '../DropdownMenu/DropdownMenuMobile';
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
  const { onOpen, onClose, isOpen } = useDisclosure();
  const { t } = translation;

  if (createList && createList.length === 0) {
    return null;
  }

  return (
    <Popover
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
    >
      <PopoverTrigger>
        <Button rightIcon={isOpen ? mdiChevronLeft : mdiChevronDown}>
          { t('create', 'ui') }
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <DropdownCreate createActionList={createList} onClose={onClose} />
      </PopoverContent>
    </Popover>
  );
};

CreateList.propTypes = createListPropTypes;
CreateList.defaultProps = createListDefaultProps;

const Layout = ({ provider, children }) => {
  const {
    onOpen, onClose, isOpen,
  } = useDisclosure();
  const { colors, breakpoints } = useTheme();
  const [isMobile] = useMediaQuery(`(max-width: ${breakpoints?.lg})`);

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

        <Popover
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
        >
          <PopoverTrigger>
            <span>
              <CurrentUser
                name={name}
                email={email}
                imageLink={imageLink}
                customerName={customerName}
                isOpen={isOpen}
              />
            </span>
          </PopoverTrigger>

          {isMobile ? (
            <Modal onClose={onClose} size="full" isOpen={isOpen}>
              <ModalOverlay />
              <ModalContent>
                <ModalBody>
                  <DropdownMenuMobile
                    onClose={onClose}
                    name={name}
                    email={email}
                    customerName={customerName}
                    imageLink={imageLink}
                    languages={languages}
                    navigationList={navigationList}
                    onNavigate={onClose}
                    selectedLanguage={selectedLanguage}
                    onChangeLanguage={provider.onChangeLanguage}
                    onLogout={provider.onLogout}
                  />
                </ModalBody>

              </ModalContent>
            </Modal>
          ) : (
            <PopoverContent border="none">
              <DropdownMenu
                name={name}
                email={email}
                customerName={customerName}
                imageLink={imageLink}
                languages={languages}
                navigationList={navigationList}
                onNavigate={onClose}
                selectedLanguage={selectedLanguage}
                onChangeLanguage={provider.onChangeLanguage}
                onLogout={provider.onLogout}
              />
            </PopoverContent>
          )}

        </Popover>
      </C.Top>
    </C.Main>
  );
};

Layout.propTypes = propTypes;
Layout.defaultProps = defaultProps;

export default Layout;
