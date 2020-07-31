module.exports = {
  sourceMap: true,
  presets: [['env', { modules: false }]],
  plugins: [
    ["transform-decorators-legacy", { "legacy": true }],
    'transform-class-properties',
    'transform-object-rest-spread',
    ['transform-runtime', {
      "helpers": false,
      "polyfill": false,
      "regenerator": true,
      "moduleName": 'babel-runtime'
    }]
  ]
}