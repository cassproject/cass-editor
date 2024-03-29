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
        ca: fs.readFileSync('ca.pem'),
        disableHostCheck: true
    },
    chainWebpack: config => config.optimization.minimize(false),
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
                            /cassproject/,
                            /yocto-queue/
                        ]},
                    use: {
                        loader: 'babel-loader'
                    }
                }
            ]
        }
    },
    publicPath: ''
};