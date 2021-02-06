const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

module.exports = {

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true, // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
    splitChunks: {
      chunks: 'all',
    },
  },

  entry: {
    main: [
      // 'bootstrap-loader',
      'babel-polyfill',
      './src/adminIndex.jsx',
    ],
  },

  // devtool: 'source-map',

  output: {
    path: path.resolve(__dirname, '../../dist'),
    publicPath: '/',
    filename: '[name].[hash].js',
  },

  devServer: {
    host: '0.0.0.0',
    disableHostCheck: true,

    historyApiFallback: {
      rewrites: [
        { from: /^\/$/, to: '/adminIndex.html' },
        { from: /^\//, to: '/adminIndex.html' },
      ],
    },
  },

  module: {
    rules: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      options: {
        presets: ['react', 'es2015', 'env', 'stage-0'],
        plugins: ['transform-decorators-legacy', 'transform-object-assign'],
      },
      exclude: /node_modules/,
    }, {
      test: /\.pcss$/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
        },
        {
          loader: 'postcss-loader',
          options: {
            config: {
              path: './src/config/postcss.config.js',
            },
          },
        },
      ],
    }, {
      test: /\.scss$/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
        },
        {
          loader: 'sass-loader',
        },
      ],
    }, {
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
        },
      ],
    }, {
      test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico|mp4)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      use: [
        {
          loader: 'file-loader',
        },
      ],
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['react', 'es2015', 'env', 'stage-2'],
        },
      },
    }, {
      test: /\.html$/,
      use: [
        {
          loader: 'html-loader',
        },
      ],
    },
    ],
  },

  resolve: {
    modules: ['./', 'node_modules'],
    extensions: ['.js', '.jsx', '.pcss'],
  },

  plugins: [
    new CleanWebpackPlugin([path.resolve(__dirname, '../../dist')], { root: path.resolve(__dirname, '../..') }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en/),
    new HtmlWebpackPlugin({
      chunks: ['main'],
      template: path.resolve(__dirname, '../adminIndex.html'),
      filename: './adminIndex.html',
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../assets/images'),
        to: './img',
      },
      {
        from: path.resolve(__dirname, '../styles/fonts'),
        to: './fonts',
      },
    ]),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css',
    }),
  ],
};
