const path = require('path')
const Hwp = require('html-webpack-plugin')
module.exports = {
  entry: './demo/index.js',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'fe-utils.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        // include: path.resolve(__dirname, 'demo'), // 只打包demo下的
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            babelrc: false
          }
        }
      }
    ]
  },
  plugins: [
    new Hwp({
      template: path.resolve(__dirname, 'demo/index.html')
    })
  ]
}