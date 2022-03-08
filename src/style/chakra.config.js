import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  fonts: {
    heading: 'Poppins',
    body: 'Lato',
  },
  colors: {
    asurgent: {
      500: '#133A5D',
    },
    gray: {
      900: '#1c1c1c',
      800: '#333333',
      700: '#494949',
      600: '#606060',
      500: '#777777',
      400: '#8e8e8e',
      300: '#a4a4a4',
      200: '#bbbbbb',
      100: '#d2d2d2',
      50: '#e8e8e8',
    },
    gold: {
      900: '#cd9f35',
      800: '#d2a949',
      700: '#d7b25d',
      600: '#dcbc72',
      500: '#e1c586',
      400: '#e6cf9a',
      300: '#ebd9ae',
      200: '#f0e2c2',
      100: '#f5ecd7',
      50: '#faf5eb',
    },
    blue: {
      900: '#133a5d',
      800: '#2b4e6d',
      700: '#42617d',
      600: '#5a758e',
      500: '#71899e',
      400: '#899dae',
      300: '#a1b0be',
      200: '#b8c4ce',
      100: '#d0d8df',
      50: '#e7ebef',
    },
    ruby: {
      900: '#c6403b',
      800: '#cc534f',
      700: '#d16662',
      600: '#d77976',
      500: '#dd8c89',
      400: '#e3a09d',
      300: '#e8b3b1',
      200: '#eec6c4',
      100: '#f4d9d8',
      50: '#f9eceb',
    },
    green: {
      900: '#004e31',
      800: '#1a6046',
      700: '#33715a',
      600: '#4d836f',
      500: '#669583',
      400: '#80a798',
      300: '#99b8ad',
      200: '#b3cac1',
      100: '#ccdcd6',
      50: '#e6edea',
    },
  },
  shadows: {
    outline: 'none',
  },
  styles: {
    global: {
      html: {
        fontSize: '16px',
        textSizeAdjust: '100%',
        fontFamily: 'Lato',
        fontSmoothing: 'antialiased',
        textRendering: 'optimizelegibility',
        touchAction: 'manipulation',
      },
      h1: {
        fontSize: '24px!important',
        lineHeight: '28px',
        paddingTop: '16px',
        paddingBottom: '24px',
      },
      h2: {
        fontSize: '22px!important',
        lineHeight: '24px',
        marginBottom: '8px',
      },
      h3: {
        fontSize: '16px!important',
        lineHeight: '24px',
        marginBottom: '8px',
      },
      p: {
        fontSize: '16px',
        lineHeight: '20px',
        marginTop: '8px',
        marginBottom: '16px',
      },
    },
  },
  components: {
    Heading: {
      baseStyle: {
        fontWeight: '500',
      },
    },
    Tooltip: {
      baseStyle: {
        bg: 'black!important',
        color: 'white',
      },
    },
  },
});
