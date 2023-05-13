import { defineConfig } from 'vite'
import stylelint from 'vite-plugin-stylelint'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import postcssPresetEnv from 'postcss-preset-env'
import postcssSorting from 'postcss-sorting'
import postcssImport from 'postcss-import'
import postcssImportJson from '@daltontan/postcss-import-json'
import postcssDTs from 'postcss-d-ts'
import precss from 'precss'
import EnvironmentPlugin from 'vite-plugin-environment'

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [
    react(),
    stylelint({
      fix: true,
      //include any .css and .module.css files in src
      include: ['./src/**/*.css'],
      configFile: './.stylelintrc.json',
      emitErrorAsWarning: true,
    }),
    EnvironmentPlugin('all'),
  ],
  css: {
    postcss: {
      plugins: [postcssImport(), postcssSorting(), postcssImportJson(), postcssPresetEnv(), postcssDTs(), precss()],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@constants': path.resolve(__dirname, './src/constants'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@utils': path.resolve(__dirname, './src/utils'),
    },
  },
})
