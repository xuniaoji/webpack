const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const path = require('path')

const developmentConfig = require('./webpack.dev.conf')
const productionConfig = require('./webpack.prod.conf')


const generateConfig = isDev => {
    return {
        entry: {
            app: './src/demo16/app.js'
        },
        output: {
            publicPath: isDev ? "/" : __dirname + "/../dist/",
            path: path.resolve(__dirname, '../', "dist"),
            filename: "[name].bundle-demo16.js",
            chunkFilename: "[name].chunk-demo16.js"
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
                },
                {
                    test: /\.html$/,
                    use: [
                        {
                            loader: "html-loader",
                            options: {
                                attrs: ["img:src"]
                            }
                        }
                    ]
                },
                {
                    test: /\.(png|jpg|jpeg|gif)$/,
                    use: [
                        {
                            loader: "url-loader",
                            options: {
                                name: "[name]-[hash:5].min.[ext]",
                                limit: 10000, // size <= 20KB
                                publicPath: "static/",
                                outputPath: "static/"
                            }
                        }
                    ]
                }
            ]
        },
        /* optimization: {
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
        }, */
        plugins: [
            new HtmlWebpackPlugin({
                filename: "index-demo16.html",
                template: "./index-demo16.html",
                chunks: ["app"], // entry中的app入口才会被打包
                minify: {
                    // 压缩选项
                    collapseWhitespace: true
                }
            }),
            new ExtractTextPlugin({
                filename: '[name].min.css',
                allChunks: false
            }),
            new webpack.ProvidePlugin({
                $: "jquery", // npm
            }),
        ]
    }
}

module.exports = env => {
    let isDev = env === 'development';
    console.log(isDev + '11111');

    return merge(generateConfig(isDev), isDev ? developmentConfig : productionConfig)
}