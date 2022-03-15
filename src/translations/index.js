import i18next from 'i18next';
import addTranslation from './addTranslation';
import findTranslations from './findTranslations';

/**
 * Find and build all our translations
 */
const context = require.context('../../', true, /\.translation.js$/);
const resources = findTranslations(context, 'ui');

/**
 * Run after i18n has been initated
 */
const addComponentTranslations = () => {
  i18next.addResourceBundle('sv', 'ui', resources.sv.ui);
  i18next.addResourceBundle('en', 'ui', resources.en.ui);
};

export {
  i18next,
  resources,
  addTranslation,
  findTranslations,
  addComponentTranslations,
};
