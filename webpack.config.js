/* eslint no-console: 0 */
const path = require('path');
const webpack = require('webpack');
const optimize = require('webpack').optimize;

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const nodeEnv = process.env.NODE_ENV || 'production';
const buildPath = path.join(__dirname, '/client/dist');
const commonConfig = {
    devtool: (nodeEnv === 'production')? 'source-map': 'eval',
    entry: {
        main: path.join(__dirname, '/client/src/js/index.js')
    },
    output: {
        // the target directory for all output files
        // must be an absolute path (use the Node.js path module)
        path: buildPath,
        filename: '[name].js',
        // the url to the output directory
        // resolved relative to the HTML page
        publicPath: '/dist/',

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
        // Adding Uglyfy
        new optimize.UglifyJsPlugin(),
        // extract css file into separate file
        new ExtractTextPlugin({ filename: '[name].css' }),
        // The DefinePlugin allows you to create global constants
        // which can be configured at compile time.
        new webpack.DefinePlugin({
            'process.env': { NODE_ENV: JSON.stringify(nodeEnv) }
        })
    ],
    // webpack-dev-server setup
    devServer: {
        // contentBase directory where the index.html is
        contentBase: path.resolve(__dirname, './client/'),
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
