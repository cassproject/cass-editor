module.exports = {
    css: {
        loaderOptions: {
            sass: {
                // options here will be passed to postcss-loader
                indentedSyntax: false
            }
        }
    },
    publicPath: process.env.NODE_ENV === 'production'
        ? '/cass-editor/'
        : '/cass-editor'
};