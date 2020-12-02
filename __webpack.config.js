const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './frontend/javascript/index.js',

  output: {
    path: path.resolve(__dirname, "output", "_bridgetown", "static", "js"),
    filename: "all.[contenthash].js",
  },

  plugins: [
    new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin({ filename: '../css/all.[chunkhash].css' }),
  ],

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [path.resolve(__dirname, 'frontend/javascript')],
        loader: 'babel-loader',
      },
      {
        test: /.(scss|css)$/,

        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',

            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',

            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },

  optimization: {
    minimizer: [new TerserPlugin()],

    splitChunks: {
      cacheGroups: {
        vendors: {
          priority: -10,
          test: /[\\/]node_modules[\\/]/,
        },
      },

      chunks: 'async',
      minChunks: 1,
      minSize: 30000,
      name: false,
    },
  },
};
