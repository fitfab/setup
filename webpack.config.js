/* eslint no-console: 0 */
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');

const parts = require('./webpack.parts');

const nodeEnv = process.env.NODE_ENV || 'production';
const buildPath = path.join(__dirname, '/client/dist');

const commonConfig = merge([
    {
        devtool: (nodeEnv === 'production')? 'source-map': 'eval',
        watch: true,
        watchOptions: {
            ignored: /node_modules/
        },
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
            })
        ]
    },
    // Lint javascript and excludes node_modules
    parts.lintJS({ exclude: /node_modules/ }),
    // load css/less and pass along ExtractTextPlugin
    parts.loadStyles({ ExtractTextPlugin })
]);

/**
 * development configuration
 * @type {object}
 */
const developmentConfig = merge([
    parts.devServer({
        host: 'localhost',
        port: 9000,
        // rest api proxy
        proxy: {
            '/api/users': 'http://localhost:3000'
        }
    })
]);

const productionConfig = merge([
    {
        performance: {
            hints: 'warning', // 'error' or false are valid too
            maxEntrypointSize: 200000, // in bytes
            maxAssetSize: 450000, // in bytes
        },
    },
    parts.minifyJavaScript()
]);


module.exports = (env) => {
    console.log(`fitfab:\t${env}`);
    // if development env, return development configuratiom
    if(env === 'development') {
        return merge(commonConfig, developmentConfig);
    }
    // otherwise production configuration
    return merge(commonConfig, productionConfig);

};
