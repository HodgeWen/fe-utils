const path = require('path')
const Hwp = require('html-webpack-plugin')
const webpack = require('webpack')

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
    contentBase: 'dist',
    stats: 'errors-only',
    clientLogLevel: 'none',
    noInfo: true,
    open: true,
    publicPath: '/'
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new Hwp({
      template: path.resolve(__dirname, 'demo/index.html')
    }),
    // new webpack.NamedModulesPlugin(), 
    new webpack.HotModuleReplacementPlugin()
  ]
}