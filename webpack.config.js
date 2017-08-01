const path = require('path')

const config = {
    entry: "./src/app.js",
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: "bundle.js",
        publicPath: "/",
    },
    module: {
        rules: [
            { test: /\.(js)$/, use: 'babel-loader' },
        ]
    },
}

module.exports = config
