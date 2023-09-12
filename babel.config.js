module.exports = (api) => {
  const presets = [
    'react-app',
    '@babel/preset-env',
    {
      modules: false,
    },
  ]
  const plugins = ['@babel/plugin-transform-modules-commonjs', 'inline-react-svg']

  api.cache(false)

  return {
    presets,
    plugins,
  }
}
