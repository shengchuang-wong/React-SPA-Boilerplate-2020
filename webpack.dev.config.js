const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const autoprefixer = require('autoprefixer')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const CssModuleLoader = {
  loader: 'css-loader',
  options: {
    modules: {
      mode: 'local',
      localIdentName: '[path][name]__[local]--[hash:base64:5]',
      context: path.resolve(__dirname, 'src'),
      hashPrefix: 'my-custom-hash',
    },
  }
}

const postCssLoader = {
  loader: 'postcss-loader',
  options: {
    ident: 'postcss',
    plugins: () => [autoprefixer]
  }
}

const sassOptions = {
  loader: 'sass-resources-loader',
  options: {
    resources: 'src/assets/scss/*.scss' // Import all scss
  }
}

module.exports = (_, { mode } = {}) => {
  return {
    mode,
    output: {
      path: path.resolve(__dirname, 'public'),
      filename: 'bundle-[hash].js',
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
        },
        {
          test: /\.module\.s(a|c)ss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: true
              }
            },
            CssModuleLoader,
            postCssLoader,
            'sass-loader',
            sassOptions
          ]
        },
        {
          test: /\.s(a|c)ss$/,
          exclude: /\.module\.s(a|c)ss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: true
              }
            },
            'css-loader',
            postCssLoader,
            'sass-loader',
            sassOptions
          ]
        }
        ,
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: true
              }
            },
            'css-loader',
            postCssLoader
          ]
        }
      ]
    },
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      extensions: ['*', '.js', '.jsx']
    },
    devServer: {
      contentBase: path.join(__dirname, 'public'),
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
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css'
      })
    ]
  }
}