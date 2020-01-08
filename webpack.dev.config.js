const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (_, { mode } = {}) => {
  return {
    mode,
    output: {
      path: path.resolve(__dirname, 'public'),
      filename: 'bundle.js',
      publicPath: '/'
    },
    devtool: 'eval-source-map',
    module: {
      rules: [
        {
          test: /.(js|jsx)$/,
          loader: 'babel-loader',
          include: [path.resolve(__dirname, 'src')],
          exclude: /node_modules/,
          options: {
            presets: [
              '@babel/react',
              [
                '@babel/env',
                { modules: false, targets: { browsers: ['last 2 versions'] } }
              ]
            ]
          }
        }
      ]
    },
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      extensions: ['*', '.js', '.jsx']
    },
    devServer: {
      host: 'localhost',
      port: 8888,
      historyApiFallback: true,
      hot: true,
    },
    plugins: [
      new HtmlWebpackPlugin({  // Also generate a test.html
        filename: 'index.html',
        template: 'src/templates/index.html'
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(mode),
      })
    ]
  }
}