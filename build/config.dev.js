const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const resolve = (dir) => path.join(__dirname, '..', dir)

module.exports = {
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
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.less$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.(jpeg|png|jpg|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: '1024'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: resolve('src/tpl.html')
    })
  ],
  devServer: {
    contentBase: resolve('dist'),
    compress: true,
    port: 9000
  }
}
