module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint/eslint-plugin', 'json'],
  ignorePatterns: [
    '**/docs/**',
    '**/dist/**',
    '**/build/**',
    '**/as-pect.config.js',
  ],
  extends: [
    'eslint:recommended',
    'plugin:json/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'google',
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {},
  },
  env: {
    node: true,
  },

  // === General rules =========================================================

  rules: {
    // allow non uppercase first letter for classes. (needed for as-bignum)
    'new-cap': ['error', { newIsCap: false }],
    'max-len': ['error', 120],
    // Omitted semicolons are hugely popular, yet within the compiler it makes
    // sense to be better safe than sorry.
    semi: 'error',

    // Our code bases uses 2 spaces for indentation, and we enforce it here so
    // files don't mix spaces, tabs or different indentation levels.
    indent: [
      'error',
      2,
      {
        SwitchCase: 1,
        VariableDeclarator: 'first',
        offsetTernaryExpressions: true,
        ignoredNodes: [
          // FIXME: something's odd here
          'ConditionalExpression > *',
          'ConditionalExpression > * > *',
          'ConditionalExpression > * > * > *',
        ],
      },
    ],

    // This is mostly visual style, making comments look uniform.
    'spaced-comment': [
      'error',
      'always',
      {
        markers: ['/'], // triple-slash
        exceptions: ['/'], // all slashes
      },
    ],

    // This tends to be annoying as it encourages developers to make everything
    // that is never reassigned a 'const', sometimes semantically incorrect so,
    // typically leading to huge diffs in follow-up PRs modifying affected code.
    'prefer-const': 'off',

    // It is perfectly fine to declare top-level variables with `var`, yet this
    // rule doesn't provide configuration options that would help.
    'no-var': 'off',

    // Quite often, dealing with multiple related cases at once or otherwise
    // falling through is exactly the point of using a switch.
    'no-fallthrough': 'off',

    // Typical false-positives here are `do { ... } while (true)` statements or
    // similar, but the only option provided here is not checking any loops.
    'no-constant-condition': ['error', { checkLoops: false }],

    // Functions are nested in blocks occasionally, and there haven't been any
    // problems with this so far, so turning the check off.
    'no-inner-declarations': 'off',

    // Quite common in scenarios where an iteration starts at `current = this`.
    '@typescript-eslint/no-this-alias': 'off',

    // Disabled here, but enabled again for JavaScript files.
    'no-unused-vars': 'off',

    // Disabled here, but enabled again for TypeScript files.
    '@typescript-eslint/no-unused-vars': 'off',

    // Too problematic because of AssemblyScript methods like __pin and __unpin.
    'no-underscore-dangle': ['off'],

    // Allow us to use 0xffffffffffffffff for edge case tests
    '@typescript-eslint/no-loss-of-precision': 'warn',

    // console rules
    'no-console': 'error',
    'no-debugger': 'error',

    // Disable JSDoc and TSDoc related rules
    'require-jsdoc': 'off',
    'valid-jsdoc': 'off',
    '@typescript-eslint/require-jsdoc': 'off',
    '@typescript-eslint/valid-jsdoc': 'off',
    'jsdoc/require-jsdoc': 'off',
    'jsdoc/valid-jsdoc': 'off',
    'jsdoc/check-jsdoc': 'off',
    'jsdoc/check-alignment': 'off',
    'jsdoc/check-indentation': 'off',
    'jsdoc/check-param-names': 'off',
    'jsdoc/check-property-names': 'off',
    'jsdoc/check-syntax': 'off',
    'jsdoc/check-tag-names': 'off',
    'jsdoc/check-types': 'off',
    'jsdoc/check-values': 'off',
    'jsdoc/empty-tags': 'off',
    'jsdoc/implements-on-classes': 'off',
    'jsdoc/match-description': 'off',
    'jsdoc/newline-after-description': 'off',
    'jsdoc/no-bad-blocks': 'off',
    'jsdoc/no-defaults': 'off',
    'jsdoc/no-types': 'off',
    'jsdoc/no-undefined-types': 'off',
    'jsdoc/require-description': 'off',
    'jsdoc/require-description-complete-sentence': 'off',
    'jsdoc/require-example': 'off',
    'jsdoc/require-file-overview': 'off',
    'jsdoc/require-hyphen-before-param-description': 'off',
    'jsdoc/require-param': 'off',
    'jsdoc/require-param-description': 'off',
    'jsdoc/require-param-name': 'off',
    'jsdoc/require-param-type': 'off',
    'jsdoc/require-property': 'off',
    'jsdoc/require-property-description': 'off',
    'jsdoc/require-property-name': 'off',
    'jsdoc/require-property-type': 'off',
    'jsdoc/require-returns': 'off',
    'jsdoc/require-returns-check': 'off',
    'jsdoc/require-returns-description': 'off',
    'jsdoc/require-returns-type': 'off',
    'jsdoc/require-throws': 'off',
    'jsdoc/require-yields': 'off',
    'jsdoc/require-yields-check': 'off',
    'jsdoc/tag-lines': 'off',
    'jsdoc/valid-types': 'off',
  },
  overrides: [
    // === Jest unit test rules ===========================================================

    {
      files: ['**/*.test.{js,ts,tsx}'],
      rules: {
        'no-console': 'off',
      },
    },

    // === Storybook rules ===========================================================

    {
      files: ['**/*.stories.{js,ts,tsx}'],
      rules: {
        'no-console': 'off',
      },
    },

    // === Compiler rules (extends AssemblyScript rules) =======================

    {
      files: ['**/assembly/**/*.ts'],
      rules: {
        // There is an actual codegen difference here - TODO: revisit
        'no-cond-assign': 'off',

        // Not all types can be omitted in AS yet - TODO: revisit
        '@typescript-eslint/no-inferrable-types': 'off',

        // Used rarely to reference internals that are not user-visible
        '@typescript-eslint/triple-slash-reference': 'off',

        // The compiler has its own `Function` class for example
        'no-shadow-restricted-names': 'off',
        '@typescript-eslint/ban-types': 'off',

        // Different behavior in AssemblyScript.
        // https://www.assemblyscript.org/basics.html#triple-equals
        eqeqeq: 'off',

        'new-cap': ['error', { capIsNewExceptions: ['ERROR'] }],
      },
    },

    // === Standard Library rules (extends AssemblyScript rules) ===============

    {
      files: ['**/assembly/**/*.ts'],
      rules: {
        // We are implementing with --noLib, so we shadow all the time
        'no-shadow-restricted-names': 'off',

        // Similarly, sometimes we need the return type to be String, not string
        '@typescript-eslint/ban-types': 'off',
      },
    },

    // === Standard Definition rules (extends TypeScript rules) ================

    {
      files: ['**/assembly/**/*.d.ts'],
      rules: {
        // Often required to achieve compatibility with TypeScript
        '@typescript-eslint/no-explicit-any': 'off',

        // Interfaces can be stubs here, i.e. not yet fully implemented
        '@typescript-eslint/no-empty-interface': 'off',

        // Definitions make use of `object` to model rather unusual constraints
        '@typescript-eslint/ban-types': 'off',
      },
    },

    // === Test rules (extends TypeScript rules) ===============================

    {
      files: ['**/assembly/__tests__/**/*.ts'],
      rules: {
        // Tests typically include unusual code patterns on purpose. This is
        // very likely not an extensive list, but covers what's there so far.
        'no-empty': 'off',
        'no-cond-assign': 'off',
        'no-compare-neg-zero': 'off',
        'no-inner-declarations': 'off',
        'no-constant-condition': 'off',
        'use-isnan': 'off',
        '@typescript-eslint/no-namespace': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-extra-semi': 'off',
        '@typescript-eslint/no-inferrable-types': 'off',
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/triple-slash-reference': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-extra-non-null-assertion': 'off',
        '@typescript-eslint/no-empty-interface': 'off',
      },
    },
  ],
};
