/* stylelint | https://stylelint.io/user-guide/configure */
module.exports = {
  extends: ['stylelint-config-recommended', 'stylelint-config-prettier'],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['tailwind', 'extends', 'layer', 'variants'],
      },
    ],
    'unit-allowed-list': ['px', 'em', 'rem', 's', 'deg', 'ms', '%'],
  },
}
