import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import MdiIcon from '@mdi/react';
import { mdiExitToApp } from '@mdi/js';
import {
  Button, useTheme,
} from '@chakra-ui/react';
import * as U from './DropdownMenu.styled';
import * as Form from '../../Form';
import Navigation from '../Navigation';
import translation from './DropdownMenu.translation';

const propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  customerName: PropTypes.string.isRequired,
  navigationList: PropTypes.instanceOf(Array).isRequired,
  languages: PropTypes.instanceOf(Array).isRequired,
  selectedLanguage: PropTypes.string.isRequired,
  onNavigate: PropTypes.func.isRequired,
  onChangeLanguage: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
};

const DropdownMenu = ({
  name,
  email,
  customerName,
  languages,
  navigationList,
  selectedLanguage,
  onChangeLanguage,
  onLogout,
  onNavigate,
}) => {
  const { t } = translation;
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
            <Button variant="unstyled" onClick={onLogout} width="100%" textAlign="left">
              <U.CreateItem colors={colors} breakpoints={breakpoints}>
                <MdiIcon size={0.875} path={mdiExitToApp} className="exit-icon" />
                <U.CreateTitle>{t('logout', 'ui')}</U.CreateTitle>
              </U.CreateItem>
            </Button>
          </U.DesktopMenuFooter>
        </U.DesktopMenu>
      </U.Desktop>

    </U.MenuWrapper>
  );
};

DropdownMenu.propTypes = propTypes;

export default DropdownMenu;
