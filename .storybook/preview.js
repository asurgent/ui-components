import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import {
  ChakraProvider, 
  CSSReset, 
  ColorModeScript
} from '@chakra-ui/react'

import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

          


export const decorators = [
  (Story) => (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ColorModeScript/>
        <ChakraProvider>
          <CSSReset />
          <Story/>
        </ChakraProvider>
      </BrowserRouter>
    </QueryClientProvider>
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" }
}
