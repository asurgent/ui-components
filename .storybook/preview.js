import React from 'react';
import {ChakraProvider, CSSReset, ColorModeProvider} from '@chakra-ui/core'
import theme from '@chakra-ui/theme'

export const decorators = [
  (Story) => (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <ColorModeProvider>
        <Story/>
      </ColorModeProvider>
    </ChakraProvider>
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" }
}
