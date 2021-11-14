const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const AngularWebpackPlugin = require("@ngtools/webpack").AngularWebpackPlugin;
const path = require("path");
const sass = require("sass");
const utils = require("./helpers");

module.exports = (options) => ({
  context: __dirname + "/../src",
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
        rxjs: {
          test: /[\\/]node_modules[\\/]rxjs[\\/]/,
          name: "rxjs",
          chunks: "all",
        },
        angular: {
          test: /[\\/]node_modules[\\/]@angular[\\/]/,
          name: "angular",
          chunks: "all",
        },
        ngrx: {
          test: /[\\/]node_modules[\\/]@ngrx[\\/]/,
          name: "ngrx",
          chunks: "all",
        },
        bootstrap: {
          test: /[\\/]node_modules[\\/]@ng-bootstrap[\\/]/,
          name: "bootstrap",
          chunks: "all",
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
          // For fixing src attr of image
          // See https://github.com/jhipster/generator-jhipster/issues/11209
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
      // Ignore warnings about System.import in Angular
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
        exclude: /(vendor\.scss|global\.scss)/,
      },
      {
        test: /(vendor\.scss|global\.scss)/,
        use: [
          "style-loader",
          "css-loader",
          "postcss-loader",
          {
            loader: "sass-loader",
            options: { implementation: sass },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({}),
    new HtmlWebpackPlugin({
      template: "./index.html",
      chunks: ["polyfills", "main", "externals"],
      chunksSortMode: "manual",
      inject: "body",
      base: "/",
    }),
    new AngularWebpackPlugin({
      tsconfig: utils.root("tsconfig.app.json"),
    }),
    new webpack.optimize.SplitChunksPlugin({
      name: ["main", "externals", "polyfills"],
    }),
  ],
});
