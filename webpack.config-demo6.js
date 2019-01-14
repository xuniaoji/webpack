/**
 * 1. 针对单页应用提取公共代码需要通过代码分割和懒加载
 * 2. 代码分割和懒加载是通过代码写法来实现，并不是通过webpack配置来实现。更多请见: ./src/page.js
 */
const webpack = require("webpack");
const path = require("path");

module.exports = {
  mode: 'none',
  entry: {
    app: './src/demo6/app.js'
  },
  output: {
    publicPath: __dirname + "/dist/",
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle-demo6.js",
    // chunkFilename: "[name].chunk-demo6.js"
  },
  module: {
    rules: [
      {
        test: /\.scss/,
        use: [
          // 页面加载前的css
          {
            loader: 'style-loader',
          },
          {
            loader: "css-loader",
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  }
};
