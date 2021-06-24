import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  colors: {
    gray: {
      900: '#1c1c1c',
      800: '#3C3C3C',
      700: '#5b5b5b',
      600: '#6e6e6e',
      500: '#979797',
      400: '#b7b7b7',
      300: '#DADADA',
      200: '#EAEAEA',
      100: '#F2F2F2',
      50: '#F9F9F9',
    },
    gold: {
      500: '#cd9f35',
    },
    blue: {
      500: '#133A5D',
    },
    ruby: {
      500: '#c6403b',
    },
    green: {
      500: '#007a5a',
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
