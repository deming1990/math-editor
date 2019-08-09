const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
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
        test: /\.(jpeg|png|jpg|svg|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: '10000',
              name: "assets/[hash:8].[ext]"
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue', '.json']
  },
  plugins: [
    new VueLoaderPlugin(),
  ]
}
