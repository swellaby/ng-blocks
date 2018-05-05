const webpackMerge = require('webpack-merge');
const webpackAngularExternals = require('webpack-angular-externals');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const commonConfig = require('./common/webpack.common.js');

module.exports = webpackMerge(commonConfig, {
    entry: './src/index.ts',
    mode: 'production',
    devtool: 'source-map',

    output: {
        path: __dirname + "/dist",
        publicPath: 'dist/',
        filename: "ng-blocks.js",
        library: 'ng-blocks',
        libraryTarget: 'umd'
    },

    externals: [
        webpackAngularExternals()
    ],

    plugins: [
        new CleanWebpackPlugin(['dist'])
    ]
});
