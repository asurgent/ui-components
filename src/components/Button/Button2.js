/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Button as ChakraBtn, Link } from '@chakra-ui/react';
import MdiIcon from '@mdi/react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  fileSaver,
  cleanUpSearchString,
} from './helper';

const propTypes = {
  size: PropTypes.string,
  leftIcon: PropTypes.string,
  rightIcon: PropTypes.string,
  variant: PropTypes.string,
  loadingText: PropTypes.string,
  isLoading: PropTypes.bool,
  colorScheme: PropTypes.string,
  disabled: PropTypes.bool,
  internalLink: PropTypes.string,
  externalLink: PropTypes.string,
  saveToFilename: PropTypes.string,
  mailto: PropTypes.string,
  saveToFile: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  goBack: PropTypes.bool,
  onClick: PropTypes.func,
  clearStateKeys: PropTypes.instanceOf(Array),
  children: PropTypes.any,
};

const defaultProps = {
  size: 'md',
  leftIcon: null,
  rightIcon: null,
  variant: 'solid',
  loadingText: null,
  isLoading: false,
  colorScheme: 'asurgent',
  disabled: false,
  saveToFile: false,
  internalLink: null,
  externalLink: null,
  clearStateKeys: [],
  mailto: null,
  saveToFilename: '',
  goBack: false,
  onClick: (e) => e.preventDefault(),
  children: 'hejhej',
};

const Button2 = ({
  size,
  leftIcon,
  rightIcon,
  loadingText,
  variant,
  isLoading,
  colorScheme,
  disabled,
  saveToFilename,
  internalLink,
  externalLink,
  clearStateKeys,
  saveToFile,
  mailto,
  onClick,
  goBack,
  children,
}) => {
  const location = useLocation();

  const handleClick = async (event) => {
    if (!disabled) {
      if (saveToFile && typeof saveToFile === 'function') {
        const result = await saveToFile();
        fileSaver({ data: result, fileName: saveToFilename });
      }

      if (onClick) {
        onClick(event);
      }
    } else {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  const Children = () => {
    if (internalLink) {
      const to = {
        pathname: internalLink,
        search: cleanUpSearchString(clearStateKeys, location),
        state: {
          prev: {
            pathname: window.location.pathname,
            search: window.location.search,
          },
        },
      };

      if (goBack && location?.state?.prev) {
        const { pathname, search } = location.state.prev;
        Object.assign(to, { pathname, search });
      }
      return <NavLink to={to}>{children}</NavLink>;
    }

    if (externalLink) {
      return <Link href={externalLink} target="_blank" rel="noopener noreferrer">{ children}</Link>;
    }

    if (mailto) {
      return <Link href={`mailto:${mailto}`}>{ children}</Link>;
    }
    return children;
  };

  return (
    <ChakraBtn
      leftIcon={leftIcon && <MdiIcon size={0.7} path={leftIcon} />}
      rightIcon={rightIcon && <MdiIcon size={0.7} path={rightIcon} />}
      variant={variant}
      isLoading={isLoading}
      loadingText={loadingText}
      colorScheme={colorScheme}
      disabled={disabled}
      size={size}
      onClick={handleClick}
    >
      <Children />
    </ChakraBtn>
  );
};

Button2.propTypes = propTypes;
Button2.defaultProps = defaultProps;

export default Button2;
