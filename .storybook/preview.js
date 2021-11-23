import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import {
  ChakraProvider, 
  ColorModeScript  
} from '@chakra-ui/react'
import { QueryClient,  QueryClientProvider,} from 'react-query';
import { I18nextProvider,initReactI18next } from 'react-i18next';
import { i18next, addComponentTranslations } from './../src/translations'
import { theme } from "./../src/style/chakra.config";

i18next
  .use(initReactI18next)
  .init({
    // we init with resources
    resources: {},
    fallbackLng: 'en',
    debug: false,
    defaultNS: 'translations',
    keySeparator: false, // we use content as keys
    interpolation: {
      escapeValue: false, // not needed for react!!
      formatSeparator: ',',
    },
    react: { wait: true },
  });

addComponentTranslations();


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
        <ChakraProvider theme={theme}>
          <I18nextProvider i18n={i18next}>
            <Story/>
          </I18nextProvider>
        </ChakraProvider>
      </BrowserRouter>
    </QueryClientProvider>
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" }
}
