module.exports = {
  customSyntax: 'postcss-scss',
  extends: ['stylelint-config-standard-scss', 'stylelint-config-prettier-scss', 'stylelint-config-recess-order'],
  plugins: ['stylelint-order'],

  rules: {
    'no-empty-source': null,
    'block-no-empty': true,
    'color-no-invalid-hex': true,
    'no-duplicate-selectors': true,
    'declaration-block-no-duplicate-custom-properties': true,
    'declaration-block-no-duplicate-properties': true,
    'declaration-block-no-shorthand-property-overrides': true,
    'block-no-redundant-nested-style-rules': true,
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['ng-deep'],
      },
    ],
    'value-keyword-case': 'lower',
    'alpha-value-notation': 'number',
    'declaration-block-no-redundant-longhand-properties': true,
    'shorthand-property-no-redundant-values': true,
    'color-hex-length': 'long',
    'color-hex-alpha': 'never',
    'at-rule-empty-line-before': [
      'always',
      {
        except: ['first-nested', 'blockless-after-same-name-blockless'],
      },
    ],
  },
};
