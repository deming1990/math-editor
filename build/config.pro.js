const path = require('path')
const merge = require('webpack-merge')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const baseConfig = require('./config.base')

const resolve = (dir) => path.resolve(__dirname, '..', dir)

module.exports = merge(baseConfig, {
  mode: 'production',
  entry: resolve('lib/index.js'),
  output: {
    path: resolve('dist'),
    filename: 'math-editor.js',
    library: 'mathEditor',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { importLoaders: 1 }
          },
          'postcss-loader',
          'less-loader'
        ]
      }
    ]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        parallel: true,
      })
    ],
  },
  externals: {
    vue: 'vue'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'math-editor.css'
    })
  ]
})
