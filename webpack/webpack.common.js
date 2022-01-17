const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const AngularWebpackPlugin = require("@ngtools/webpack").AngularWebpackPlugin;
const SimpleProgressWebpackPlugin = require("simple-progress-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");
const sass = require("sass");
const utils = require("./helpers");

module.exports = (options) => ({
  context: __dirname + "/../",
  entry: {
    polyfills: utils.root("src/polyfills"),
    main: utils.root("src/main"),
  },
  resolve: {
    extensions: [".ts", ".js"],
    modules: ["node_modules"],
    mainFields: ["es2015", "browser", "module", "main"],
    alias: utils.mapTypescriptAliasToWebpackAlias(),
  },
  stats: {
    children: false,
  },
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        vendors: {
          chunks: "initial",
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          reuseExistingChunk: true,
          enforce: true,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
        loader: "@ngtools/webpack",
        exclude: [/\.spec\.ts$/],
      },
      { test: /\.json$/, use: "json-loader" },
      {
        test: /\.html$/,
        loader: "html-loader",
        options: {
          minimize: {
            caseSensitive: true,
            removeAttributeQuotes: false,
            minifyJS: false,
            minifyCSS: false,
          },
        },
        exclude: utils.root("src/index.html"),
      },
      {
        test: /\.(jpe?g|png|gif|svg|woff2?|ttf|eot)$/i,
        loader: "file-loader",
        options: {
          digest: "hex",
          hash: "sha512",
          name: "content/[hash].[ext]",
          esModule: false,
        },
      },
      {
        test: /manifest.webapp$/,
        loader: "file-loader",
        options: {
          name: "manifest.webapp",
        },
      },
      { test: /[\/\\]@angular[\/\\].+\.js$/, parser: { system: false } },
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
      },
      {
        test: /\.css$/,
        use: ["to-string-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin(),
    new SimpleProgressWebpackPlugin({
      format: "minimal",
    }),
    new CopyPlugin({
      patterns: [{ from: "src/assets", to: "assets" }],
    }),
    new webpack.DefinePlugin({}),
    new HtmlWebpackPlugin({
      template: "src/index.html",
      chunks: ["polyfills", "main", "vendors"],
      chunksSortMode: "manual",
      inject: "body",
      base: "/",
    }),
    new AngularWebpackPlugin({
      tsconfig: utils.root("tsconfig.app.json"),
    }),
    new webpack.optimize.SplitChunksPlugin({
      name: ["main", "vendors", "polyfills"],
    }),
  ],
});
