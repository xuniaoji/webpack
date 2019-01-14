const path = require('path')

module.exports = {
    mode: 'none',
    entry: {
        pageA: './src/demo3/pageA.js',
        pageB: './src/demo3/pageB.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle-demo3.js',
        chunkFilename: "[name].chunkdemo3.js"
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                common: {
                    name: 'common',
                    chunks: 'all',
                    minSize: 1,
                    priority: 0
                },
                vendor: {
                    name: 'vendor',
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'all',
                    priority: 10
                }
            }
        }
    },
    // module: {
    //     rules: [
    //         {
    //             test: /\.js$/,
    //             exclude: /node_modules/,
    //             use: ['babel-loader']
    //         }
    //     ]
    // }
}