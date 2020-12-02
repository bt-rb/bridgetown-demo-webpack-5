const path = require("path");
const webpack = require("webpack");
const { WebpackPluginServe } = require("webpack-plugin-serve");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { mode } = require("webpack-nano/argv");
const { AddDependencyPlugin } = require("webpack-add-dependency-plugin");
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

module.exports = {
  watch: mode === "development",
  mode: "development",
  entry: ["./frontend/javascript/index.js", "webpack-plugin-serve/client"],
  output: {
    path: path.resolve(__dirname, "output/_bridgetown/static/js"),
    filename: "[name].[chunkhash].js",
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin({
      filename: "../css/[name].[chunkhash].css",
    }),
    new AddDependencyPlugin({
      path: "./output/**/*.{html,png,svg,jpg}"
    }),
    new WebpackManifestPlugin({
      fileName: path.resolve(__dirname, ".bridgetown-webpack", "manifest.json"),
    }),
    new WebpackPluginServe({
      port: process.env.PORT || 4040,
      static: "./output",
      liveReload: true,
      waitForBuild: true,
      log: 'trace'
    }),
  ],

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [path.resolve(__dirname, "frontend/javascript")],
        loader: "babel-loader",
      },
      {
        test: /.(scss|css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              sourceMap: true,
            },
          },
          {
            loader: "postcss-loader",
          },
          {
            loader: "sass-loader",
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
      chunks: "async",
      minChunks: 1,
      minSize: 30000,
      name: false,
    },
  },
};
