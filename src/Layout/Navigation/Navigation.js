import React from 'react';
import PropTypes from 'prop-types';
import MdiIcon from '@mdi/react';
import { Tooltip, useTheme } from '@chakra-ui/react';
import * as C from './Navigation.styled';

const propTypes = {
  navigationList: PropTypes.instanceOf(Array).isRequired,
  withLabel: PropTypes.bool,
  onNavigate: PropTypes.func,
};

const defaultProps = {
  withLabel: false,
  onNavigate: (() => {}),
};

const Navigation = ({
  withLabel,
  navigationList,
  onNavigate,
}) => {
  const { colors, breakpoints } = useTheme();
  return (
    <C.Wrapper colors={colors} breakpoints={breakpoints}>
      {
      navigationList.map(({
        icon,
        tooltip,
        link,
        label,
        isActive,
        isDropdownItem,
      }) => (
        isDropdownItem ? (
          <C.DropdownNavigationItem
            colors={colors}
            breakpoints={breakpoints}
            key={link}
            to={link}
            onClick={onNavigate}
            isActive={isActive}
          >
            <MdiIcon path={icon} size={0.875} />
            {' '}
            {withLabel && (<span>{label}</span>)}
          </C.DropdownNavigationItem>
        ) : (
          <Tooltip hasArrow label={tooltip} key={tooltip} placement="right">
            <C.NavigationItem
              colors={colors}
              breakpoints={breakpoints}
              to={link}
              onClick={onNavigate}
              isActive={isActive}
            >
              <MdiIcon path={icon} size={0.875} />
              {' '}
              {withLabel && (<span>{label}</span>)}
            </C.NavigationItem>
          </Tooltip>
        )
      ))
    }
    </C.Wrapper>
  );
};

Navigation.propTypes = propTypes;
Navigation.defaultProps = defaultProps;

export default Navigation;
