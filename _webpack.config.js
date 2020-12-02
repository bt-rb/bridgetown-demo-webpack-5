const webpack = require('webpack');
const path = require('path');
const { mode } = require("webpack-nano/argv");
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ManifestPlugin = require("webpack-manifest-plugin");
const { WebpackPluginServe } = require("webpack-plugin-serve");
const { merge } = require("webpack-merge");
const parts = require("./webpack.parts.js");

const commonConfig = merge([
  { entry: ["./frontend/javascript"] },
  parts.loadCSS()
]);

const productionConfig = merge([]);

const developmentConfig = merge([
  { entry: ["webpack-plugin-serve/client"] },
  parts.devServer(),
]);

const getConfig = (mode) => {
  process.env.NODE_ENV = mode;

  switch (mode) {
    case "production":
      return merge(commonConfig, productionConfig, { mode });
    case "development":
      return merge(commonConfig, developmentConfig, { mode });
    default:
      throw new Error(`Trying to use an unknown mode, ${mode}`);
  }
};

module.exports = getConfig(mode);

// const config = {
//   watch: mode === "development",
//   entry: ["./frontend/javascript", "webpack-plugin-serve/client"],
//   mode,
//   output: {
//     path: path.resolve(__dirname, "output", "_bridgetown", "static", "js"),
//     filename: '[name].[contenthash].js'
//   },
//   module: {
//     rules: [
//       {
//         test: /\.js$/,
//         use: 'babel-loader',
//         exclude: /node_modules/
//       },
//       {
//         test: /\.css$/,
//         use: [
//           MiniCssExtractPlugin.loader,
//           {
//             loader: 'css-loader',
//             options: {
//               importLoaders: 1
//             }
//           },
//           'postcss-loader'
//         ]
//       },
//       {
//         test: /\.scss$/,
//         use: [
//           MiniCssExtractPlugin.loader,
//           'css-loader',
//           'sass-loader'
//         ]
//       },
//       {
//         test: /\.png$/,
//         use: [
//           {
//             loader: 'url-loader',
//             options: {
//               mimetype: 'image/png'
//             }
//           }
//         ]
//       }
//     ]
//   },
//   plugins: [
//     new CleanWebpackPlugin(),
//     new BundleAnalyzerPlugin({
//       analyzerMode: 'static',
//       openAnalyzer: false,
//     }),
//     new MiniCssExtractPlugin({
//       filename: "../css/all.[contenthash].css",
//     }),
//     new WebpackPluginServe({
//       port: process.env.PORT || 8080,
//       static: "./output",
//       liveReload: true,
//       waitForBuild: true,
//     }),
//     // new ManifestPlugin({
//     //   fileName: path.resolve(__dirname, ".bridgetown-webpack", "manifest.json"),
//     // }),
//   ],
//   optimization: {
//     runtimeChunk: 'single',
//     splitChunks: {
//       cacheGroups: {
//         vendor: {
//           test: /[\\/]node_modules[\\/]/,
//           name: 'vendors',
//           chunks: 'all'
//         }
//       }
//     }
//   }
// };

// module.exports = config;
