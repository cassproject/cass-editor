module.exports = {
    preset: '@vue/cli-plugin-unit-jest',
    transform: {
        '^.+\\.js$': 'babel-jest'
    },
    transformIgnorePatterns: ['node_modules/?!(dataformat)'],
    collectCoverage: true,
    collectCoverageFrom: [
        "**/*.{js,vue}",
        "!**/node_modules/**"
    ]
};
