import React from 'react';
import PropTypes from 'prop-types';
import {
  mdiChevronDown, mdiMenu, mdiClose, mdiChevronUp,
} from '@mdi/js';
import MdiIcon from '@mdi/react';
import { IconButton, useTheme } from '@chakra-ui/react';
import * as U from './CurrentUser.styled';
import * as UserImage from '../../UserImage';

const propTypes = {
  imageLink: PropTypes.string,
  name: PropTypes.string,
  email: PropTypes.string,
  customerName: PropTypes.string,
  isOpen: PropTypes.bool,
};

const defaultProps = {
  imageLink: '',
  name: '',
  email: '',
  customerName: '',
  isOpen: false,
};

const UserDropdown = ({
  name,
  email,
  imageLink,
  customerName,
  isOpen,
}) => {
  const { colors, breakpoints } = useTheme();

  return (
    <U.Wrapper>
      <U.Desktop breakpoints={breakpoints}>
        <>
          <UserImage.Circle
            size="2rem"
            name={name}
            email={email}
            href={imageLink}
          />
          <U.Name colors={colors}>
            <b>{name}</b>
            <small>{customerName}</small>
          </U.Name>
          <IconButton
            variant="ghost"
            style={{ margin: '0 0.25rem' }}
            icon={<MdiIcon path={isOpen ? mdiChevronUp : mdiChevronDown} size={0.75} />}
          />
        </>

      </U.Desktop>
      <U.Mobile breakpoints={breakpoints}>
        <IconButton
          variant="ghost"
          icon={<MdiIcon path={isOpen ? mdiClose : mdiMenu} size={0.75} />}
        />
      </U.Mobile>
    </U.Wrapper>
  );
};

UserDropdown.propTypes = propTypes;
UserDropdown.defaultProps = defaultProps;

export default UserDropdown;
