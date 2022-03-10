import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@chakra-ui/react';
import { ErrorState, InfoState, WarningState } from './BlockStatusMessage.styled';

const propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  withMargins: PropTypes.bool,
  withBottomMargin: PropTypes.bool,
  renderTransparent: PropTypes.bool,
};

const defaultProps = {
  title: '',
  children: null,
  withMargins: false,
  withBottomMargin: false,
  renderTransparent: false,
};

const ErrorMessage = ({
  title, children, ...props
}) => {
  const { colors, breakpoints } = useTheme();

  return (
    <ErrorState breakpoints={breakpoints} colors={colors} {...props}>
      {title && <b className="title">{title}</b>}
      {children}
    </ErrorState>
  );
};

ErrorMessage.propTypes = propTypes;
ErrorMessage.defaultProps = defaultProps;

const WarningMessage = ({
  title, children, ...props
}) => {
  const { colors } = useTheme();
  return (
    <WarningState colors={colors} {...props}>
      {title && <b className="title">{title}</b>}
      {children}
    </WarningState>
  );
};

WarningMessage.propTypes = propTypes;
WarningMessage.defaultProps = defaultProps;

const InfoMessage = ({
  title, children, ...props
}) => {
  const { colors } = useTheme();
  return (
    <InfoState colors={colors} {...props}>
      {title && <b className="title">{title}</b>}
      {children}
    </InfoState>
  );
};

InfoMessage.propTypes = propTypes;
InfoMessage.defaultProps = defaultProps;

export { ErrorMessage, WarningMessage, InfoMessage };
