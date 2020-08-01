const path = require('path')
const dirname = path.resolve(__dirname, '../src')

const config = {
  projectName: 'movie',
  date: '2020-1-30',
  designWidth: 750,
  deviceRatio: {
    '640': 2.34 / 2,
    '750': 1,
    '828': 1.81 / 2
  },
  alias: {
    '~components': path.resolve(dirname, 'components'),
    '~lodash': path.resolve(dirname, 'lib/lodash'),
    '~utils': path.resolve(dirname, 'utils'),
    '~config': path.resolve(dirname, 'config'),
    '~services': path.resolve(dirname, 'services'),
    '~theme': path.resolve(dirname, 'theme'),
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  // plugins: [
  //   '@tarojs/plugin-sass',
  //   "@tarojs/plugin-uglify"
  // ],
  framework: 'react',
  copy: {
    patterns: [
    ],
    options: {
    }
  },
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {}
      },
      url: {
        enable: true,
        config: {
          limit: 10240 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: false,
        config: {
          naningPattern: 'module',
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    esnextModules: ['taro-ui'],
    module: {
      postcss: {
        autoprefixer: {
          enable: true,
          config: {
            browsers: [
              'last 3 versions',
              'Android >= 4.1',
              'ios >= 8'
            ]
          }
        },
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: 'module', // 转换模式，取值为 global/module
            generateScopedName: '[name]__[local]___[hash:base64:5]'
          }
        }
      }
    }
  }
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
