const webpack = require("webpack");
const webpackMerge = require("webpack-merge").merge;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const MomentLocalesPlugin = require("moment-locales-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const utils = require("./helpers");
const commonConfig = require("./webpack.common.js");

const ENV = "production";
const sass = require("sass");

module.exports = webpackMerge(commonConfig({ env: ENV }), {
  output: {
    path: utils.root("dist/"),
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          "to-string-loader",
          "css-loader",
          "postcss-loader",
          {
            loader: "sass-loader",
            options: { implementation: sass },
          },
        ],
        exclude: /(styles\.scss|global\.scss)/,
      },
      {
        test: /(styles\.scss|global\.scss)/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../",
            },
          },
          "css-loader",
          "postcss-loader",
          {
            loader: "sass-loader",
            options: { implementation: sass },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ["to-string-loader", "css-loader"],
        exclude: /(styles\.css|global\.css)/,
      },
      {
        test: /(styles\.css|global\.css)/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../",
            },
          },
          "css-loader",
          "postcss-loader",
        ],
      },
    ],
  },
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        externals: {
          test: /[\\/]node_modules[\\/]/, ///< put all used node_modules modules in this chunk
          name: "externals", ///< name of bundle
          chunks: "all", ///< type of code to put in this bundle
        },
      },
    },
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
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
  plugins: [
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
