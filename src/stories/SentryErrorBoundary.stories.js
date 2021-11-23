/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { withPerformance } from 'storybook-addon-performance';
import { SentryErrorBoundary } from '../SentryErrorBoundary';

const Story = {
  title: 'Components/Sentry Error Boundary',
  component: SentryErrorBoundary,
  argTypes: {},
  decorators: [withPerformance],
};

export default Story;

const SomeComp = ({ throwError }) => {
  useEffect(() => {
    if (throwError) {
      throw new Error('I broke');
    }
  }, [throwError]);

  return <p>I am some content</p>;
};

const SentryErrorBoundaryTemplate = (args) => {
  const { throwError, ...restArgs } = args;
  return (
    <Box width="25rem" height="25rem" m={5} borderRadius="5px" border>
      <SentryErrorBoundary {...restArgs}>
        <SomeComp throwError={throwError} />
      </SentryErrorBoundary>
    </Box>
  );
};

export const SentryError = SentryErrorBoundaryTemplate.bind({});

SentryError.args = {
  throwError: false,
  errorInfo: { error: 'My error', payload: {} },
  fallback: <p>I am the fallback</p>,
};
