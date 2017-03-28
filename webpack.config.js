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
        // only watch when in development
        watch: (nodeEnv === 'development'),
        watchOptions: {
            ignored: /node_modules/
        },
        // Generate multiple bundles at once by using entry object
        // let's say you have 2 files: about.html and register.html
        // and you need to create a bundle for each file. This is will be
        // the setup for it.
        //
        //  entry: {
        //      about: path.join(__dirname, '/client/src/js/about.js'),
        //      register: path.join(__dirname, '/client/src/js/register.js'),
        //  }
        //
        //  Note:   if it's a SPA, you can still use the object entry.
        //          you just enter one entry in the object.
        entry: {
            main: path.join(__dirname, '/client/src/js/main.js')
        },
        output: {
            // the target directory for all output files
            // must be an absolute path (use the Node.js path module)
            path: buildPath,
            // '[name].js' macthes the entry object above and will output
            // main.js in the dist folder.
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
