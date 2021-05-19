// import React from 'react';
// import {ChakraProvider, CSSReset} from '@chakra-ui/core'
// import theme from '@chakra-ui/theme'

// export const decorators = [
//   (Story) => (
//     <ChakraProvider theme={theme}>
//       <CSSReset />
//       <Story/>
//     </ChakraProvider>
//   ),
// ];

// export const parameters = {
//   actions: { argTypesRegex: "^on[A-Z].*" },
//   controls: {
//     matchers: {
//       color: /(background|color)$/i,
//       date: /Date$/,
//     },
//   },
// }

import {addDecorator} from '@storybook/react'

import React from 'react'
import {ChakraProvider, CSSReset} from '@chakra-ui/core'
import theme from '@chakra-ui/theme'

addDecorator(storyFn => (
  <ChakraProvider theme={theme}>
    <CSSReset />
    {storyFn()}
  </ChakraProvider>
))
