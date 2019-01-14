const path = require('path');
const glob = require('glob-all');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');

module.exports = {
  mode: 'production',
  entry: {
    app: './src/demo10/app.js'
  },
  output: {
    publicPath: __dirname + "/dist/",
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle-demo10.js",
    chunkFilename: "[name].chunk-demo10.js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: {
            loader: "style-loader"
          },
          use: [
            {
              loader: "css-loader",
            }
          ]
        })
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "[name]-[hash:5].min.[ext]",
              // limit: 20000, // size <= 20KB
              limit: 1000,
              publicPath: "static/",
              outputPath: "static/"
            }
          },
          {
            loader: "img-loader",
            options: {
              plugins: [
                require("imagemin-pngquant")({
                  quality: "80" // the quality of zip
                })
              ]
            }
          }
        ]
      },

    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].min-demo10.css',
      allChunks: false
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
