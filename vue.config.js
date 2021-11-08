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
        https: false,
        key: fs.readFileSync('localhost.key'),
        cert: fs.readFileSync('localhost.crt'),
        ca: fs.readFileSync('ca.pem')
    },
    configureWebpack: {
        plugins: [new CompressionPlugin()],
        resolve: {
            symlinks: false
        },
        module: {
            rules: [
                {
                    test: /\.m?js$/,
                    exclude: {test: /node_modules/, // Exclude libraries in node_modules ...
                        not: [
                            // Except for a few of them that need to be transpiled because they use modern syntax
                            /cassproject/
                        ]},
                    use: {
                        loader: 'babel-loader'
                    }
                }
            ]
        }
    },
    publicPath: process.env.NODE_ENV === 'production'
        ? '/cass-editor/'
        : '/cass-editor'
};