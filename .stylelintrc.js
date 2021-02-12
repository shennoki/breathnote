/* stylelint | https://stylelint.io/user-guide/configure */

module.exports = {
  /* 公式のリントルールを適用 */
  extends: ['stylelint-config-recommended', 'stylelint-config-prettier'],

  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['extends', 'tailwind'],
      },
    ],
    'block-no-empty': null,
    'unit-whitelist': ['em', 'rem', 's'],
  },
}
