import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import {
  ChakraProvider, 
  CSSReset, 
  ColorModeScript  
} from '@chakra-ui/react'
import { extendTheme } from "@chakra-ui/react"


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

const theme = extendTheme({
  styles: {
    global: {
      html: {
        fontSize: "100%"
      },
      // body: {
      //   fontSize: "1.6rem",
      // },
    },
  }
})

export const decorators = [
  (Story) => (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ColorModeScript/>
        <ChakraProvider theme={theme}>
        
          <Story/>
        </ChakraProvider>
      </BrowserRouter>
    </QueryClientProvider>
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" }
}
