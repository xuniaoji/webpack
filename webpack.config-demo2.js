const path = require('path')

module.exports = {
    mode: 'none',
    entry: {
        app: './src/demo2/app.js'
    },
    output: {
        publicPath: __dirname + '/dist/',
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle-demo2.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    }
}