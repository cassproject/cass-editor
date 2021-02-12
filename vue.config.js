const fs = require('fs');
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
    css: {
        loaderOptions: {
            sass: {
                sassOptions: {
                    // options here will be passed to postcss-loader
                    indentedSyntax: false
                }
            }
        }
    },
    devServer: {
        host: 'localhost',
        https: true,
        key: fs.readFileSync('localhost.key'),
        cert: fs.readFileSync('localhost.crt'),
        ca: fs.readFileSync('ca.pem'),
    },
    configureWebpack: {
        plugins: [new CompressionPlugin()]
    },
    publicPath: process.env.NODE_ENV === 'production'
        ? '/cass-editor/'
        : '/cass-editor'
};