const webpack = require("webpack");
const writeFilePlugin = require("write-file-webpack-plugin");
const webpackMerge = require("webpack-merge").merge;
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const SimpleProgressWebpackPlugin = require("simple-progress-webpack-plugin");

const utils = require("./helpers");
const commonConfig = require("./webpack.common.js");

const ENV = "development";

module.exports = (options) =>
  webpackMerge(commonConfig({ env: ENV }), {
    devtool: "eval-source-map",
    devServer: {
      static: "./dist",
      proxy: require("../proxy.conf.json"),
      https: options.tls,
      historyApiFallback: true,
      hot: true,
    },
    output: {
      path: utils.root("dist"),
    },
    plugins: [
      new SimpleProgressWebpackPlugin({
        format: "minimal",
      }),
      new FriendlyErrorsWebpackPlugin(),
      new webpack.ContextReplacementPlugin(
        /angular(\\|\/)core(\\|\/)/,
        utils.root("src")
      ),
      new writeFilePlugin(),
    ].filter(Boolean),
    mode: "development",
  });
