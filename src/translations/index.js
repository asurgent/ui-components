import { i18n } from '@asurgent/ui/dist';

const { i18next, findTranslations } = i18n;

const context = require.context('./../', true, /\.translation.js$/);
const resources = findTranslations(context, 'ui');

export const addComponentTranslations = () => {
  i18next.addResourceBundle('sv', 'ui', resources.sv.ui);
  i18next.addResourceBundle('en', 'ui', resources.en.ui);
};

export { i18next };
