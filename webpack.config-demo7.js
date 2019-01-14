
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  mode: 'none',
  entry: {
    app: './src/demo7/app.js'
  },
  output: {
    publicPath: __dirname + "/dist/",
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle-demo7.js",
    chunkFilename: "[name].chunk-demo7.js"
  },
  module: {
    rules: [
      {
        test: /\.scss/,
        use: ExtractTextPlugin.extract({
          // 对于不提取为单独文件的css样式的loader
          fallback: {
            loader: "style-loader"
          },
          use: [
            {
              loader: "css-loader",
            },
            {
              loader: "sass-loader"
            }
          ]
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].min.css',
      allChunks: false
    })
  ]
};
