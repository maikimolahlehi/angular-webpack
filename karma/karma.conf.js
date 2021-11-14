const webpackConfig = require("../webpack/webpack.test");

module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine"],
    files: [{ pattern: "./karma/karma-test-shim.js", watched: false }],
    preprocessors: {
      "./karma/karma-test-shim.js": ["webpack", "sourcemap"],
    },
    // plugins: [
    //   require("karma-jasmine"),
    //   require("karma-chrome-launcher"),
    //   require("karma-jasmine-html-reporter"),
    //   require("karma-coverage"),
    // ],
    webpack: webpackConfig,
    webpackMiddleware: {
      stats: "errors-only",
    },

    webpackServer: {
      noInfo: true,
    },
    client: {
      jasmine: {
        // you can add configuration options for Jasmine here
        // the possible options are listed at https://jasmine.github.io/api/edge/Configuration.html
        // for example, you can disable the random execution with `random: false`
        // or set a specific seed with `seed: 4321`
      },
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
    },
    jasmineHtmlReporter: {
      suppressAll: true, // removes the duplicated traces
    },
    coverageReporter: {
      dir: require("path").join(__dirname, "./coverage"),
      subdir: ".",
      reporters: [{ type: "html" }, { type: "text-summary" }],
    },
    reporters: ["progress", "kjhtml"],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ["Chrome"],
    restartOnFileChange: true,
  });
};
