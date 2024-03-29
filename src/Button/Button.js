/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Button as ChakraBtn, Link, Tooltip,
} from '@chakra-ui/react';
import MdiIcon from '@mdi/react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  fileSaver,
  cleanUpSearchString,
} from './helper';

const blockStyle = {
  background: 'rgb(255, 255, 255)',
  border: '2px dashed rgb(218, 218, 218)',
  boxSizing: 'border-box',
  height: '8rem',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textTransform: 'uppercase',
  color: 'rgb(32, 85, 124)',
  marginBottom: '1rem',
  fontWeight: '500',
};

const propTypes = {
  children: PropTypes.any,
  clearStateKeys: PropTypes.instanceOf(Array),
  colorScheme: PropTypes.string,
  disabled: PropTypes.bool,
  externalLink: PropTypes.string,
  goBack: PropTypes.bool,
  internalLink: PropTypes.string,
  isLoading: PropTypes.bool,
  leftIcon: PropTypes.string,
  loadingText: PropTypes.string,
  mailto: PropTypes.string,
  onClick: PropTypes.func,
  rightIcon: PropTypes.string,
  saveToFile: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  saveToFilename: PropTypes.string,
  searchParams: PropTypes.string, // Expects a query string like this: '?list=eyJxdWVyeS'
  size: PropTypes.string,
  style: PropTypes.instanceOf(Object),
  tooltip: PropTypes.string,
  tooltipOrientation: PropTypes.string,
  type: PropTypes.string,
  variant: PropTypes.string,
};

const defaultProps = {
  children: null,
  clearStateKeys: [],
  colorScheme: 'asurgent',
  disabled: false,
  externalLink: null,
  goBack: false,
  internalLink: null,
  isLoading: false,
  leftIcon: null,
  loadingText: null,
  mailto: null,
  onClick: () => null,
  rightIcon: null,
  saveToFile: false,
  saveToFilename: '',
  searchParams: '',
  size: 'md',
  style: {},
  type: null,
  tooltip: null,
  tooltipOrientation: 'auto',
  variant: 'solid',
};

const Button = ({
  children: textContent,
  clearStateKeys,
  colorScheme,
  disabled,
  externalLink,
  goBack,
  internalLink,
  isLoading,
  leftIcon,
  loadingText,
  mailto,
  onClick,
  rightIcon,
  saveToFile,
  saveToFilename,
  size,
  style,
  type,
  tooltip,
  tooltipOrientation,
  variant,
  searchParams,
  ...rest
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

  const LinkHandler = ({ children }) => {
    if (internalLink) {
      const to = {
        pathname: internalLink,
        search: searchParams ?? cleanUpSearchString(clearStateKeys, location),
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
      return <Link href={externalLink} target="_blank" rel="noopener noreferrer">{children}</Link>;
    }

    if (mailto) {
      return <Link href={`mailto:${mailto}`}>{children}</Link>;
    }
    return children;
  };

  const extraStyling = variant === 'block' ? { ...blockStyle, ...style } : { ...style };

  return (
    <LinkHandler>
      {tooltip ? (
        <Tooltip label={tooltip} hasArrow placement={tooltipOrientation}>
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
            type={type}
            style={{ ...extraStyling }}
            onMouseDown={(e) => e.preventDefault()}
            {...rest}
          >
            {textContent}
          </ChakraBtn>
        </Tooltip>
      ) : (
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
          type={type}
          style={{ ...extraStyling }}
          onMouseDown={(e) => e.preventDefault()}
          {...rest}
        >
          {textContent}
        </ChakraBtn>
      )}
    </LinkHandler>
  );
};

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
