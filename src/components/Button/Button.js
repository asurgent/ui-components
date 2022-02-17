import React from 'react';
import PropTypes from 'prop-types';
import { useLocation, NavLink } from 'react-router-dom';
import { Tooltip, Spinner } from '@chakra-ui/react';
import * as Styles from './Button.styled';
import {
  isExternalLink,
  isInteralLink,
  isValidMail,
  fileSaver,
  cleanUpSearchString,
} from './helper';

const propTyps = {
  iconLeft: PropTypes.element,
  iconRight: PropTypes.element,
  mainIcon: PropTypes.element,
  link: PropTypes.string,
  onClick: PropTypes.func,
  saveToFile: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  saveToFilename: PropTypes.string,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  mailto: PropTypes.string,
  tooltip: PropTypes.string,
  className: PropTypes.string,
  clearStateKeys: PropTypes.instanceOf(Array),
  // used for example when backing from my-env and
  // dont want to keep the url-state for myenv / tickets, myenv / sw a.s.o.
  history: PropTypes.instanceOf(Object).isRequired,
  theme: PropTypes.instanceOf(Object).isRequired,
  renderStyle: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string, // Add button[type="submit"] as an ovelay to native trigger in forms
  style: PropTypes.instanceOf(Object),
  renderContentWithoutWrapper: PropTypes.bool,
  goBack: PropTypes.bool,
};

const defaultProps = {
  iconLeft: null,
  iconRight: null,
  mainIcon: null,
  link: '',
  onClick: () => {},
  saveToFile: false,
  saveToFilename: '',
  disabled: false,
  loading: false,
  children: null,
  mailto: '',
  tooltip: null,
  className: '',
  clearStateKeys: [],
  type: '',
  style: {},
  renderContentWithoutWrapper: false,
  goBack: false,
};

const Button = (props) => {
  const {
    mainIcon,
    iconRight,
    iconLeft,
    link,
    onClick,
    disabled,
    loading,
    children,
    mailto,
    history,
    tooltip,
    clearStateKeys,
    className,
    theme,
    saveToFile,
    saveToFilename,
    type,
    style,
    renderStyle: Component,
    renderContentWithoutWrapper,
    goBack,
    ...passingProps
  } = props;

  const location = useLocation();
  const isValidMailto = mailto && (isValidMail(mailto));

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

  const attrs = {
    style,
    className: [(disabled ? 'disabled' : null), className].join(' ').trim(),
    onClick: handleClick,
    // onMouseDown needed because of onBlur on form fields
    onMouseDown: (e) => e.preventDefault(),
    ...passingProps,
  };

  const content = (
    <>
      {mainIcon && mainIcon }
      {iconLeft && <Styles.Spacer right>{iconLeft}</Styles.Spacer>}
      {renderContentWithoutWrapper ? children : <span className="label">{children}</span>}
      {iconRight && <Styles.Spacer left>{iconRight}</Styles.Spacer>}
      { loading && (
      <Styles.Spacer left data-testid="ring-spinner">
        <Spinner
          color="#133A5D"
          emptyColor="#DADADA"
          speed="0.65s"
          thickness="2px"
          size="sm"
        />
      </Styles.Spacer>
      )}
    </>
  );

  // If we pass a link/mailto, convert component to a-tag
  if (isExternalLink(link) || isValidMailto) {
    const Link = Component.withComponent('a');
    const upddatedAttrs = { ...attrs };

    Object.assign(upddatedAttrs, {
      href: link,
      target: '_blank',
      rel: 'noopener noreferrer',
    });

    if (isValidMailto) {
      Object.assign(upddatedAttrs, {
        href: `mailto:${mailto}`,
      });
    }

    return (
      <Tooltip hasArrow label={tooltip}>
        <Link {...upddatedAttrs}>
          {content}
        </Link>
      </Tooltip>
    );
  }
  if (isInteralLink(link) || goBack) {
    const Link = Component.withComponent(NavLink);
    const upddatedAttrs = { ...attrs };
    Object.assign(upddatedAttrs, {
      to: {
        pathname: link,
        search: cleanUpSearchString(clearStateKeys, location),
        state: {
          prev: {
            pathname: window.location.pathname,
            search: window.location.search,
          },
        },
      },
    });

    if (goBack && location?.state?.prev) {
      const { pathname, search } = location.state.prev;
      Object.assign(upddatedAttrs.to, { pathname, search });
    }

    return (
      <Tooltip hasArrow label={tooltip}>
        <Link {...upddatedAttrs}>
          {content}
        </Link>
      </Tooltip>
    );
  }

  // If type "submit" is true we add a button[type="submit"]
  // overlay to trigger native submit in forms
  if (type === 'submit') {
    const { onClick: buttonOnClick, ...rest } = attrs;
    return (
      <Tooltip hasArrow label={tooltip}>
        <Component {...rest}>
          <button onClick={buttonOnClick} type="submit">{' '}</button>
          {content}
        </Component>
      </Tooltip>
    );
  }

  return (
    <Tooltip hasArrow label={tooltip}>
      <Component {...attrs}>
        {content}
      </Component>
    </Tooltip>
  );
};

Button.defaultProps = defaultProps;
Button.propTypes = propTyps;

export default Button;
