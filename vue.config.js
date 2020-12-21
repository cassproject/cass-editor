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
    configureWebpack: {
        plugins: [new CompressionPlugin()]
    },
    publicPath: process.env.NODE_ENV === 'production'
        ? '/cass-editor/'
        : '/cass-editor'
};