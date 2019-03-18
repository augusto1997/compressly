module.exports = (api) => {
  api.cache(true)
  const presets = [['@babel/preset-env', { useBuiltIns: 'entry' }]]
  const plugins = [
    '@babel/plugin-transform-async-to-generator',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-transform-regenerator'
  ]
  return {
    presets,
    plugins
  }
}
