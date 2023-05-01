import postcssImport from 'postcss-import'
import postcssPresetEnv from 'postcss-preset-env'
import postcssImportJson from '@daltontan/postcss-import-json'

export default {
  plugins: [
    postcssImport(),
    postcssImportJson(),
    postcssPresetEnv({
      stage: 0,
    }),
  ],
}
