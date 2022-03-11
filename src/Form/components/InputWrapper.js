import React from 'react';
import PropTypes from 'prop-types';
import i18next from 'i18next';
import { mdiHelpCircleOutline } from '@mdi/js';
import { Tooltip, Text, useTheme } from '@chakra-ui/react';
import * as C from './InputWrapper.styled';

const propTyps = {
  tooltip: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string,
  classNameWrapper: PropTypes.string,
  type: PropTypes.string.isRequired,
  showContainerError: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.instanceOf(Object),
  ]).isRequired,
  noLabel: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
  disabled: PropTypes.func,
  style: PropTypes.instanceOf(Object),
  wrapperStyle: PropTypes.instanceOf(Object),
  description: PropTypes.string,
};

const defaultProps = {
  label: '',
  tooltip: '',
  noLabel: false,
  className: '',
  classNameWrapper: '',
  showContainerError: true,
  disabled: () => false,
  style: {},
  wrapperStyle: {},
  description: '',
};

const InputWrapper = (props) => {
  const {
    label,
    tooltip,
    error,
    children,
    noLabel,
    type,
    className,
    classNameWrapper,
    showContainerError,
    disabled,
    wrapperStyle,
    style,
    description,
  } = props;

  const { colors, breakpoints } = useTheme();

  return (
    <C.Main type={type} className={className} style={style}>
      { noLabel === false && (
        <C.Header>
          <Text textTransform="capitalize" fontWeight="bold" fontSize="sm">{label}</Text>
          { tooltip && (
            <Tooltip hasArrow label={tooltip}>
              <C.TooltipIcon colors={colors} path={mdiHelpCircleOutline} size={1} />
            </Tooltip>
          )}
        </C.Header>
      )}
      { description && <Text>{description}</Text> }
      <C.Wrapper
        breakpoints={breakpoints}
        colors={colors}
        style={wrapperStyle}
        disabled={disabled()}
        hasError={showContainerError && Boolean(error)}
        type={type}
        className={classNameWrapper}
      >
        {children}
      </C.Wrapper>
      {showContainerError && error && (
        <C.Error colors={colors}>
          {
            i18next.exists(`${error.translationKey}`)
              ? i18next.t(error.translationKey)
              : error.message
          }
        </C.Error>
      )}
    </C.Main>
  );
};

InputWrapper.defaultProps = defaultProps;
InputWrapper.propTypes = propTyps;

export default InputWrapper;
