import React from 'react';
import * as Sentry from '@sentry/react';
import PropTypes from 'prop-types';

const SentryErrorBoundary = ({ children, errorInfo = '', fallback }) => (
  <Sentry.ErrorBoundary
    fallback={fallback}
    beforeCapture={(_, error) => {
      const childIndentifier = children?.type?.name || children?.type || 'unknown';
      Sentry.withScope((scope) => {
        scope.setTag('childComponent', childIndentifier);
        Sentry.setExtra('errorInfo', errorInfo);
        Sentry.captureException(error);
      });
    }}
  >
    {children}
  </Sentry.ErrorBoundary>
);

SentryErrorBoundary.propTypes = {
  errorInfo: PropTypes.oneOfType([PropTypes.any]),
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.func,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
  fallback: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

SentryErrorBoundary.defaultProps = {
  errorInfo: '',
  fallback: <p>Something went wrong, could not render.</p>,
};

export default SentryErrorBoundary;
