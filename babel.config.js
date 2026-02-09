const path = require('path');
const plugins = [];

if (process.env.NODE_ENV === 'test') {
    plugins.push(['babel-plugin-istanbul', {
        extension: ['.js', '.vue'],
        cwd: path.resolve(__dirname),
        include: ['src/**/*'],
        exclude: ['tests/**/*', 'node_modules/**/*'],
        useInlineSourceMaps: false
    }]);
}

module.exports = {
    presets: ['@vue/cli-plugin-babel/preset'],
    plugins,
};
