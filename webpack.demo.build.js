const path = require('path')
const Hwp = require('html-webpack-plugin')
module.exports = {
  entry: './demo/index',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'demo'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
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