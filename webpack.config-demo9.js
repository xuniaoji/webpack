// const path = require('path');
// const glob = require('glob-all');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const PurifyCSSPlugin = require('purifycss-webpack');

// module.exports = {
//   mode: 'production',
//   entry: {
//     app: './src/demo9/app.js'
//   },
//   output: {
//     publicPath: __dirname + "/dist/",
//     path: path.resolve(__dirname, "dist"),
//     filename: "[name].bundle-demo9.js",
//     chunkFilename: "[name].chunk-demo9.js"
//   },
//   module: {
//     rules: [
//       {
//         test: /\.css$/,
//         loader: ExtractTextPlugin.extract({
//           fallback: {
//             loader: "style-loader"
//           },
//           use: [
//             {
//               loader: "css-loader",
//             }
//           ]
//         })
//       }
//     ]
//   },
//   plugins: [
//     new ExtractTextPlugin({
//       filename: '[name].min-demo9.css',
//       allChunks: false
//     }),
//     // Make sure this is after ExtractTextPlugin!
//     new PurifyCSSPlugin({
//       // Give paths to parse for rules. These should be absolute!
//       paths: glob.sync([
//         // 要做CSS Tree Shaking的路径文件
//         path.resolve(__dirname, "./*.html"),
//         path.resolve(__dirname, "./src/**/*.js")
//       ]),
//       // minimize: true
//     })
//   ]
// };


const path = require('path');
const glob = require('glob-all');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PurifyCSSPlugin = require('purifycss-webpack');

module.exports = {
  mode: 'production',
  entry: {
    app: './src/demo9/app.js'
  },
  output: {
    publicPath: __dirname + "/dist/",
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle-demo9.js",
    chunkFilename: "[name].chunk-demo9.js"
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
    new MiniCssExtractPlugin({
      filename: "[name].min-demo9-2.css",
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

