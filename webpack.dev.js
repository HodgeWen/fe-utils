const path = require('path')
const Hwp = require('html-webpack-plugin')
const webpack = require('webpack')
const WebpackProgressBar = require('webpack-progress-bar')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const ip_v4 = require('internal-ip').v4.sync()
require('colors')
const host = '0.0.0.0'
const port = 8000

const messages = [
  '你的应用正在运行中...'.grey,
  '本地访问地址:'.cyan + '                ' + `http://localhost:${port}`.underline.green
]
host === '0.0.0.0' && 
messages.push(
  '公共访问地址:'.cyan + 
  '                ' + 
  `http://${ip_v4}:${port}`.underline.magenta
)

module.exports = {
  entry: './demo/index',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'demo'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            babelrc: false
          }
        }
      },
    ]
  },
  devServer: {
    hot: true,
    host,
    port,
    contentBase: 'dist',
    stats: 'errors-only',
    clientLogLevel: 'none',
    noInfo: true,
    publicPath: '/'
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new Hwp({
      template: path.resolve(__dirname, 'demo/index.html')
    }),
    // new webpack.NamedModulesPlugin(), 
    new webpack.HotModuleReplacementPlugin(),
    new WebpackProgressBar(),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages
      },
      clearConsole: true
    })
  ]
}