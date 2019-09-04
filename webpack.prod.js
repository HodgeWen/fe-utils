const path = require('path')
const Hwp = require('html-webpack-plugin')
const webpack = require('webpack')
const WebpackProgressBar = require('webpack-progress-bar')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

module.exports = {
  entry: './src/index',
  mode: 'production',
  output: {
    filename: 'utils.prod.js',
    // library: 'utils',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
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
  resolve: {
    extensions: [ '.js' ]
  },

  plugins: [
    new WebpackProgressBar(),
    new FriendlyErrorsWebpackPlugin({
      clearConsole: true
    })
  ]
}