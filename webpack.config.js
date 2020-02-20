const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const autoprefixer = require('autoprefixer')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const CssModuleLoader = {
  loader: 'css-loader',
  options: {
    modules: {
      mode: 'local',
      localIdentName: '[path][name]__[local]--[hash:base64:5]',
      context: path.resolve(__dirname, 'src'),
      hashPrefix: 'my-custom-hash'
    }
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
                hmr: mode === 'production' ? false : true
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
                hmr: mode === 'production' ? false : true
              }
            },
            'css-loader',
            postCssLoader,
            'sass-loader',
            sassOptions
          ]
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: mode === 'production' ? false : true
              }
            },
            'css-loader',
            postCssLoader
          ]
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: [
            {
              loader: 'file-loader'
            }
          ]
        }
      ]
    },
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      extensions: ['*', '.js', '.jsx']
    },
    ...(mode === 'development' && {
      devtool: 'eval-source-map',
      devServer: {
        contentBase: path.join(__dirname, 'public'),
        host: 'localhost',
        port: 8080,
        historyApiFallback: true,
        hot: true
      }
    }),
    ...(mode === 'production' && {
      optimization: {
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})]
      }
    }),
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'src/templates/index.html'
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(mode)
      }),
      new MiniCssExtractPlugin({
        filename:
          mode === 'production' ? '[name].[contenthash].css' : '[name].css',
        chunkFilename:
          mode === 'production' ? '[id][contenthash].css' : '[id].css'
      }),
      ...(mode === 'production' ? [new CleanWebpackPlugin()] : [])
    ]
  }
}
