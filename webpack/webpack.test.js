const webpack = require("webpack");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const SimpleProgressWebpackPlugin = require("simple-progress-webpack-plugin");
const helpers = require("./helpers");
const { AngularWebpackPlugin } = require("@ngtools/webpack");

module.exports = {
  devtool: "inline-source-map",

  resolve: {
    extensions: [".ts", ".js"],
  },

  module: {
    rules: [
      {
        test: /\.ts?$/,
        loader: "@ngtools/webpack",
      },
      {
        test: /\.html$/,
        loader: "html-loader",
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: "null-loader",
      },
      {
        test: /\.scss$/,
        exclude: [/node_modules/],
        use: ["to-string-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.css$/,
        exclude: [/node_modules/],
        use: ["to-string-loader", "css-loader"],
      },
    ],
  },

  plugins: [
    new AngularWebpackPlugin({
      jitMode: true, // false=AOT by default
      tsconfig: helpers.root("tsconfig.spec.json"),
    }),
    new SimpleProgressWebpackPlugin({
      format: "compact",
    }),
    new FriendlyErrorsWebpackPlugin(),
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)/,
      helpers.root("src")
    ),
  ],
};
