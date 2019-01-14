const path = require('path');
const glob = require('glob-all');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PurifyCSSPlugin = require('purifycss-webpack');
const webpack = require("webpack");
module.exports = {
  mode: 'production',
  entry: {
    app: './src/demo12/app.js'
  },
  output: {
    publicPath: __dirname + "/dist/",
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle-demo12.js",
    chunkFilename: "[name].chunk-demo12.js"
  },
  resolve: {
    alias: {
      jQuery$: path.resolve(__dirname, "./src/demo12/vendor/jquery.min.js")
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader"
        ]
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery", // npm
      jQuery: "jQuery" // 本地Js文件
    }),
    new MiniCssExtractPlugin({
      filename: "[name].min-demo12.css",
    }),
    // Make sure this is after ExtractTextPlugin!
    new PurifyCSSPlugin({
      // Give paths to parse for rules. These should be absolute!
      paths: glob.sync([
        // 要做CSS Tree Shaking的路径文件
        path.resolve(__dirname, "./*.html"),
        path.resolve(__dirname, "./src/**/*.js")
      ]),
      // minimize: true
    })
  ]
};

