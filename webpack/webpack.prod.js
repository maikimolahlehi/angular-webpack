const webpack = require("webpack");
const webpackMerge = require("webpack-merge").merge;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const MomentLocalesPlugin = require("moment-locales-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const utils = require("./helpers");
const commonConfig = require("./webpack.common.js");

const ENV = "production";
const sass = require("sass");

module.exports = webpackMerge(commonConfig({ env: ENV }), {
  output: {
    path: utils.root("dist"),
    clean: true,
  },
  optimization: {
    runtimeChunk: "single",
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          ecma: 6,
          ie8: false,
          toplevel: true,
          module: true,
          compress: {
            dead_code: true,
            warnings: false,
            properties: true,
            drop_debugger: true,
            conditionals: true,
            booleans: true,
            loops: true,
            unused: true,
            toplevel: true,
            if_return: true,
            inline: true,
            join_vars: true,
            ecma: 6,
            module: true,
          },
          output: {
            comments: false,
            beautify: false,
            indent_level: 2,
            ecma: 6,
          },
          mangle: {
            module: true,
            toplevel: true,
          },
        },
      }),
      new CssMinimizerPlugin({ minimizerOptions: { preset: ["default"] } }),
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: "package.json", to: "./" }],
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
    new MomentLocalesPlugin({
      localesToKeep: ["en"],
    }),
    new BundleAnalyzerPlugin({ openAnalyzer: false, analyzerMode: "static" }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
  ],
  mode: "production",
});
