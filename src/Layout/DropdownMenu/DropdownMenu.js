import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import MdiIcon from '@mdi/react';
import { mdiExitToApp, mdiClose } from '@mdi/js';
import {
  Button, IconButton, Collapse, useTheme, useDisclosure,
} from '@chakra-ui/react';
import * as U from './DropdownMenu.styled';
import * as UserImage from '../../UserImage';
import * as Form from '../../Form';
import Navigation from '../Navigation';
import translation from './DropdownMenu.translation';

const MENU_TAB = 'menu_tab';
const SETTINGS_TAB = 'settings_tab';

const propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  customerName: PropTypes.string.isRequired,
  imageLink: PropTypes.string,
  navigationList: PropTypes.instanceOf(Array).isRequired,
  languages: PropTypes.instanceOf(Array).isRequired,
  selectedLanguage: PropTypes.string.isRequired,
  onNavigate: PropTypes.func.isRequired,
  onChangeLanguage: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  onClose: PropTypes.func,
};

const defaultProps = {
  onClose: (() => {}),
  imageLink: '',
};

const DropdownMenu = ({
  name,
  email,
  imageLink,
  customerName,
  languages,
  navigationList,
  selectedLanguage,
  onChangeLanguage,
  onLogout,
  onClose,
  onNavigate,
}) => {
  const { t } = translation;
  const [mobileMenuTab, setMobileMenuTab] = useState(MENU_TAB);
  const { isOpen } = useDisclosure();
  const { breakpoints, colors } = useTheme();

  const langaugeForm = Form.useFormBuilder({
    selectLanguage: {
      type: 'select',
      label: t('languageSelector', 'ui'),
      value: selectedLanguage,
      options: languages,
      noLabel: true,
    },
  });

  const dropdownNavList = useMemo(() => {
    if (navigationList) {
      return navigationList.filter((nav) => nav.isDropdownItem);
    }
    return [];
  }, [navigationList]);

  return (
    <U.MenuWrapper breakpoints={breakpoints}>
      <U.Desktop breakpoints={breakpoints}>
        <Collapse in={!isOpen} animateOpacity>
          <U.DesktopMenu colors={colors}>
            <div className="user-details">
              <b>{name}</b>
              <small>{email}</small>
              <small>{customerName}</small>
            </div>
            <Form.Primary
              form={langaugeForm}
              onChangeTimer={({ values }) => {
                onChangeLanguage(values.selectLanguage);
              }}
            />

            {Array.isArray(dropdownNavList) && (
              <Navigation
                withLabel
                onNavigate={onNavigate}
                navigationList={dropdownNavList}
              />
            )}
            <U.DesktopMenuFooter>
              <Button variant="ghost" onClick={onLogout}>
                <U.CreateItem colors={colors} breakpoints={breakpoints}>
                  <MdiIcon size={0.875} path={mdiExitToApp} className="exit-icon" />
                  <U.CreateTitle>{t('logout', 'ui')}</U.CreateTitle>
                </U.CreateItem>
              </Button>
            </U.DesktopMenuFooter>
          </U.DesktopMenu>
        </Collapse>
      </U.Desktop>

      <U.Mobile breakpoints={breakpoints}>
        <Collapse in={!isOpen} animateOpacity>
          <U.MobileMenu colors={colors}>
            <IconButton
              className="close"
              onClick={onClose}
              icon={<MdiIcon path={mdiClose} size={0.75} />}
            />
            <div className="user">
              <UserImage.Circle
                size="3.75rem"
                name={name}
                email={email}
                href={imageLink}
              />
              <div className="meta">
                <b>{name}</b>
                <small>{email}</small>
                <small>{customerName}</small>
              </div>
            </div>

            { mobileMenuTab === MENU_TAB && (
            <>
              <div className="menu">
                {Array.isArray(navigationList) && (
                <Navigation
                  withLabel
                  onNavigate={onNavigate}
                  navigationList={navigationList}
                />
                )}
                <div className="wrapper">
                  <Button variant="ghost" onClick={onLogout}>
                    <U.CreateItem colors={colors} breakpoints={breakpoints}>
                      <MdiIcon size={0.875} path={mdiExitToApp} className="exit-icon" />
                      <U.CreateTitle>{t('logout', 'ui')}</U.CreateTitle>
                    </U.CreateItem>
                  </Button>
                </div>
              </div>
            </>
            )}

            { mobileMenuTab === SETTINGS_TAB && (
            <div className="menu">
              <Form.Primary
                form={langaugeForm}
                onChangeTimer={({ values }) => {
                  onChangeLanguage(values.selectLanguage);
                }}
              />
            </div>
            )}

            <U.Tabs>
              <U.TabButton
                colors={colors}
                active={mobileMenuTab === MENU_TAB}
                onClick={() => setMobileMenuTab(MENU_TAB)}
              >
                {t('menu', 'ui')}
              </U.TabButton>
              <U.TabButton
                colors={colors}
                active={mobileMenuTab === SETTINGS_TAB}
                onClick={() => setMobileMenuTab(SETTINGS_TAB)}
              >
                {t('settings', 'ui')}
              </U.TabButton>
            </U.Tabs>
          </U.MobileMenu>
        </Collapse>
      </U.Mobile>
    </U.MenuWrapper>
  );
};

DropdownMenu.propTypes = propTypes;
DropdownMenu.defaultProps = defaultProps;

export default DropdownMenu;
