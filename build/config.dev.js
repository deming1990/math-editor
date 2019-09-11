const path = require('path')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const baseConfig = require('./config.base')

const resolve = (dir) => path.resolve(__dirname, '..', dir)

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    main: resolve('src/main.js')
  },
  output: {
    path: resolve('dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: { importLoaders: 1 }
          },
          'postcss-loader',
          'less-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: { importLoaders: 1 }
          },
          'postcss-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve('src/tpl.html')
    })
  ],
  devServer: {
    contentBase: resolve('dist'),
    compress: true,
    port: 9000
  }
})
