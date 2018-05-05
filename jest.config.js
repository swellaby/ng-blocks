module.exports = {
    coverageDirectory: './coverage/',
    coveragePathIgnorePatterns: [
        '/node_modules/',
        '/playground/'
    ],
    collectCoverageFrom: [
        'src/**/*.ts',
        '!src/index.ts',
        '!src/module.ts',
        '!src/**/*.sandbox.ts'
    ],
    globals: {
        'ts-jest': {
            'tsConfigFile': 'tsconfig.json'
        },
        '__TRANSFORM_HTML__': true
    },
    moduleNameMapper: {
        '\\.(scss)$': '<rootDir>/test/helpers/style-mock.ts'
    },
    preset: 'jest-preset-angular',
    setupTestFrameworkScriptFile: '<rootDir>/test/helpers/setupJest.ts',
    setupFiles: [
        '<rootDir>/test/helpers/init.ts'
    ]
};
