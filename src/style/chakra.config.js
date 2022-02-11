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
