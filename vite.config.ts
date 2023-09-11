import { defineConfig } from 'vite'
import stylelint from 'vite-plugin-stylelint'
import react from '@vitejs/plugin-react-swc'
import postcssPresetEnv from 'postcss-preset-env'
import postcssSorting from 'postcss-sorting'
import postcssImport from 'postcss-import'
import precss from 'precss'
import EnvironmentPlugin from 'vite-plugin-environment'

export default defineConfig({
  plugins: [
    react(),
    stylelint({
      fix: true,
      //include any .css and .module.css files in src
      include: ['./src/**/*.css', './src/**/*StakingScreen.module.pcss'],
      configFile: './.stylelintrc.json',
      emitErrorAsWarning: true,
    }),
    EnvironmentPlugin('all'),
  ],
  css: {
    postcss: {
      plugins: [postcssImport(), postcssSorting(), postcssPresetEnv(), precss()],
    },
  },
  build: {
    outDir: './dist',
    emptyOutDir: true,
  },
})
