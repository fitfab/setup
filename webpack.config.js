/* eslint no-console: 0 */
const path = require('path');
const webpack = require('webpack');

const nodeEnv = process.env.NODE_ENV || 'production';
const commonConfig = {
    devtool: (nodeEnv === 'production')? 'source-map': 'eval',
    entry: {
        main: path.join(__dirname, '/client/src/js/main.js')
    },
    output: {
        path: path.join(__dirname, '/client/dist'),
        filename: '[name].js',
        publicPath: '/client/dist'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                use: [{
                    loader: 'babel-loader'
                }]
            }
        ]
    },
    // webpack-dev-server setup
    devServer: {
        contentBase: path.resolve(__dirname, './'),
        clientLogLevel: 'none',
        port: 9000,
        watchContentBase: true
    }

}

module.exports = function start(env) {

    console.log('ENV: ', env);
    return commonConfig;

};
