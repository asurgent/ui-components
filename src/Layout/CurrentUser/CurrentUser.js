import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  mdiChevronDown, mdiMenu, mdiClose, mdiChevronUp,
} from '@mdi/js';
import MdiIcon from '@mdi/react';
import { IconButton, useTheme } from '@chakra-ui/react';
import * as U from './CurrentUser.styled';
import * as UserImage from '../../UserImage';

const propTypes = {
  children: PropTypes.func,
  imageLink: PropTypes.string,
  name: PropTypes.string,
  email: PropTypes.string,
  customerName: PropTypes.string,
};

const defaultProps = {
  children: (() => {}),
  imageLink: '',
  name: '',
  email: '',
  customerName: '',
};

const UserDropdown = ({
  name,
  email,
  imageLink,
  children,
  customerName,
}) => {
  const { colors, breakpoints } = useTheme();
  const [open, setOpen] = useState(false);

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
            icon={<MdiIcon path={open ? mdiChevronUp : mdiChevronDown} size={0.75} />}
            onClick={() => setOpen(!open)}
          />
        </>

      </U.Desktop>
      <U.Mobile breakpoints={breakpoints}>
        <IconButton
          variant="ghost"
          onClick={() => setOpen(true)}
          icon={<MdiIcon path={open ? mdiClose : mdiMenu} size={0.75} />}
        />
      </U.Mobile>
      {(children({ isOpen: open, onClose: () => { setOpen(false); } }))}
    </U.Wrapper>
  );
};

UserDropdown.propTypes = propTypes;
UserDropdown.defaultProps = defaultProps;

export default UserDropdown;
