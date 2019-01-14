/**
 * 1. 针对单页应用提取公共代码需要通过代码分割和懒加载
 * 2. 代码分割和懒加载是通过代码写法来实现，并不是通过webpack配置来实现。更多请见: ./src/page.js
 */
const webpack = require("webpack");
const path = require("path");

module.exports = {
  mode: 'none',
  entry: {
    app: './src/demo5/app.js'
  },
  output: {
    publicPath: __dirname + "/dist/",
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle-demo5.js",
    // chunkFilename: "[name].chunk-demo5.js"
  },
  module: {
    rules: [
      {
        test: /\.css/,
        use: [
          // 处理css为单个文件
          /* {
            loader: 'style-loader/url',
          },
          {
            loader: "file-loader"
          }, */
          // 处理为单个style标签
          /* {
            loader: 'style-loader',
            options: {
              singleton: true, // 处理为单个style标签
            }
          },
          {
            loader: "css-loader",
          } */
          // 动态挂载
          /* {
            loader: 'style-loader/useable',
          },
          {
            loader: "css-loader",
          } */
          // 页面加载前的css
          {
            loader: 'style-loader',
            options: {
              transform: "./src/demo5/css.transform.js" // transform 文件
            }
          },
          {
            loader: "css-loader",
          }
        ]
      }
    ]
  }
};
