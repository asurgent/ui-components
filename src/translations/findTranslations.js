/**
 * @param  {} context - Eg. require.context('./../../src/', true, /\.translation.js/)
 * @param  {} resourceKey - Optional. Will pass resource struct
 */

const buildTranslation = (t, id) => Object
  .keys(t)
  .reduce((acc, item) => Object.assign(acc, {
    [`${id}${item}`]: t[item],
  }), {});

const findTranslations = (context, resourceKey) => {
  const requireAll = (requireContext) => requireContext.keys().map(requireContext);
  const modules = requireAll(context);

  const moduleTranslations = modules.reduce((acc, { default: mod }) => {
    const { translation } = mod;

    const engTranslation = buildTranslation(translation.en, translation.id);
    const sweTranslation = buildTranslation(translation.sv, translation.id);

    Object.assign(acc.en, engTranslation);
    Object.assign(acc.sv, sweTranslation);

    return acc;
  }, { sv: {}, en: {} });

  if (resourceKey) {
    return {
      en: {
        [resourceKey]: Object.assign(moduleTranslations.en),
      },
      sv: {
        [resourceKey]: Object.assign(moduleTranslations.sv),
      },
    };
  }

  return moduleTranslations;
};
export default findTranslations;
