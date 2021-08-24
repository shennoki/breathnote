/* stylelint | https://stylelint.io/user-guide/configure */
module.exports = {
  extends: ['stylelint-config-recommended-scss', 'stylelint-config-prettier'],
  plugins: ['stylelint-scss'],
  rules: {
    'scss/at-rule-no-unknown': null,
    'unit-allowed-list': ['px', 'em', 'rem', '%', 'vw', 'vh', 'ms', 's', 'deg'],
    'selector-pseudo-class-no-unknown': [true, { ignorePseudoClasses: ['global'] }],
  },
  ignoreFiles: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
}
