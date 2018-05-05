const _ = require('lodash');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({size: require('os').cpus().length - 1});
const helpers = require('./helpers');

const useSassLoader = [];

const theme = _.defaultTo(process.env.LB_STYLES_THEME, 'light');

module.exports = {
    mode: 'development',
    devtool: 'eval-source-map',

    resolve: {
        extensions: ['.scss', '.ts', '.js']
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'happypack/loader?id=ts'
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.gif|png|jpg|svg|woff|woff2|ttf|eot|ico(\?v=\d\.\d\.\d)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]'
                        }
                    }
                ]
            },
            {
                // handle Angular component styles
                test: /\.scss$/,
                exclude: useSassLoader,
                use: [
                    'raw-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            data: `$lb-styles-theme: \'${theme}\';`
                        }
                    }
                ]
            },
            {
                // handle imported styles
                test: /\.scss$/,
                include: useSassLoader,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            data: `$lb-styles-theme: \'${theme}\';`
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin({
            checkSyntacticErrors: true
        }),

        new HappyPack({
            id: 'ts',
            threadPool: happyThreadPool,
            loaders: [
                {
                    loader: 'ts-loader',
                    options: {
                        happyPackMode: true,
                        transpileOnly: true
                    }
                },
                {
                    loader: 'angular2-template-loader'
                }
            ]
        })
    ]
};
