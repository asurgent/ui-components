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
      50: '#FEEDF0',
      100: '#f8bfbe',
      400: '#EF6461',
      500: '#c6403b',
      800: '#C6403B',
    },
    green: {
      50: '#E0F2EE',
      100: '#b2e0d3',
      400: '#2AA787',
      500: '#007a5a',
      700: '#007A5A',
      800: '#006a4c',
      900: '#004e31',
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
