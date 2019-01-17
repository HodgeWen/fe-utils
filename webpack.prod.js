const path = require('path')

module.exports = {
  entry: {
    wt: path.resolve(__dirname, 'src/data/index.js'),
    $: path.resolve(__dirname, 'src/dom/index.js'),
    utils: path.resolve(__dirname, 'src/utils/index.js')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'fe-[name].min.js',
    library: 'name',
    libraryTarget: 'umd',
    libraryExport: 'default'
  },
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
      },
    ]
  }
}