const webpack = require("webpack");
const writeFilePlugin = require("write-file-webpack-plugin");
const webpackMerge = require("webpack-merge").merge;

const utils = require("./helpers");
const commonConfig = require("./webpack.common.js");

const ENV = "development";

module.exports = (options) =>
  webpackMerge(commonConfig({ env: ENV }), {
    devtool: "eval-source-map",
    devServer: {
      static: [utils.root("dist"), utils.root("src")],
      proxy: require("../proxy.conf.json"),
      https: options.tls,
      historyApiFallback: true,
      hot: true,
      onBeforeSetupMiddleware: function (devServer) {
        if (devServer) {
          devServer.app.get("/assets/library-ext.umd.js", (req, res) => {
            res.sendFile(utils.root("src", "assets", "library-ext.umd.js"));
          });

          devServer.app.get("/assets/moduloe.umd.js", (req, res) => {
            res.sendFile(utils.root("src", "assets", "moduloe.umd.js"));
          });
        }
      },
    },
    output: {
      path: utils.root("dist"),
      clean: true,
    },
    plugins: [
      new writeFilePlugin(),
      new webpack.ContextReplacementPlugin(
        /angular(\\|\/)core(\\|\/)/,
        utils.root("src")
      ),
    ],
    mode: "development",
  });
