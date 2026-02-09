module.exports = {
    all: true,
    include: [
        'src/**/*.{js,vue}'
    ],
    exclude: [
        'coverage/**',
        'tests/**',
        'node_modules/**',
        'dist/**'
    ],
    extension: [
        '.js',
        '.vue'
    ],
    reporter: [
        'html',
        'text-summary',
        'lcov'
    ],
    reportDir: 'coverage',
    instrument: false,
    sourceMap: false
};
