const eslint = require('@asurgent/eslint-config-asurgent');

const base = eslint({
  settings: {
    'import/resolver': {
      alias: {
        map: [],
      },
    },
  },
});

Object.assign(base.rules, {
  'no-unused-vars': 1,
  'react/prop-types': 1,
  'react/no-array-index-key': 1,
});

module.exports = base;
