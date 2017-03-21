/* eslint no-console: 0 */
const path = require('path');
const webpack = require('webpack');
const DashboardPlugin = require('webpack-dashboard/plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const nodeEnv = process.env.NODE_ENV || 'production';
const commonConfig = {
    devtool: (nodeEnv === 'production')? 'source-map': 'eval',
    entry: {
        main: path.join(__dirname, '/client/src/js/index.js')
    },
    output: {
        path: path.join(__dirname, '/client/dist'),
        filename: '[name].js',
        publicPath: '/client/dist'
    },
    module: {
        rules: [
            // Reference: https://survivejs.com/webpack/developing/linting/
            {
                test: /\.jsx?$/, // both .js and .jsx
                enforce: 'pre',
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                    emitWarning: true,
                    fix: true
                }
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'postcss-loader', 'less-loader'],
                    publicPath: path.resolve(__dirname, './client/dist')
                })
            },
            {
                test: /\.jsx?$/, // both .js and .jsx
                exclude: [/node_modules/],
                use: [{
                    loader: 'babel-loader'
                }]
            }
        ]
    },
    plugins: [
        // extract css file into separate file
        new ExtractTextPlugin({ filename: '[name].css' }),
        // The DefinePlugin allows you to create global constants
        // which can be configured at compile time.
        new webpack.DefinePlugin({
            'process.env': { NODE_ENV: JSON.stringify(nodeEnv) }
        }),
        new DashboardPlugin()
    ],
    // webpack-dev-server setup
    devServer: {
        contentBase: path.resolve(__dirname, './'),
        port: 9000,
        proxy: {
            '/api/users': 'http://localhost:3000'
        },
        watchContentBase: true
    }

};

module.exports = function start(env) {
    const endpoint = '/api/users';
    console.log(`fitfab:\t${env}`);
    console.log(`proxy:\t${commonConfig.devServer.proxy[endpoint]}\n`);
    return commonConfig;

};
