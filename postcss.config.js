import postcssImport from 'postcss-import'
import postcssPresetEnv from 'postcss-preset-env'
import postcssImportJson from '@daltontan/postcss-import-json'
import postcssDTs from 'postcss-d-ts'

export default {
  plugins: [postcssImport(), postcssImportJson(), postcssPresetEnv(), postcssDTs()],
}
