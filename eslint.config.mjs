// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import pluginJest from 'eslint-plugin-jest';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  eslintConfigPrettier,
  eslintPluginPrettierRecommended,
  {
    // configuration for Jest test files
    files: ['**/*.spec.ts', '**/*.test.ts'],
    ...pluginJest.configs['flat/all'],
  },
  // global ignore block
  {
    // include only the `src` directory
    ignores: ["*", "!src/"],
  },
  {
    rules: {
      '@typescript-eslint/no-extraneous-class': 'off'
    }
  },
);
