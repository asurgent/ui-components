import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  colors: {
    asurgent: {
      500: '#133A5D',
    },
  },
  shadows: {
    outline: 'none',
  },
  styles: {
    global: {
      html: {
        fontSize: '100%',
      },
    },
  },
});
