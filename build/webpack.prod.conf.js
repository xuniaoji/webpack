
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PurifyCSSPlugin = require('purifycss-webpack')
const glob = require('glob-all');

const path = require("path");

module.exports = {
  mode: "production",

  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].min-demo16.css",
    }),
    // Make sure this is after ExtractTextPlugin!
    new PurifyCSSPlugin({
      // Give paths to parse for rules. These should be absolute!
      paths: glob.sync([
        // 要做CSS Tree Shaking的路径文件
        path.resolve(__dirname, "../*.html"),
        path.resolve(__dirname, "../src/demo16/**/*.js")
      ]),
      // minimize: true
    }),
    new CleanWebpackPlugin(["dist"], {
      root: path.resolve(__dirname, "../"),
      verbose: true
    }),
  ]
};
