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
  'no-console': 0,
  'react/no-array-index-key': 0,
  'import/no-extraneous-dependencies': [
    'error',
    {
      devDependencies: [
        '**/*.stories.*',
        '**/.storybook/**/*.*',
      ],
      peerDependencies: true,
    },
  ],
});

module.exports = base;
