const path = require('path');
const BabiliPlugin = require('babili-webpack-plugin');

exports.devServer = ({ host, port, proxy } = {}) => ({
    devServer: {
        historyApiFallback: true,
        // contentBase directory where the index.html is
        contentBase: path.resolve(__dirname, './client/'),
        host, // default to localhost
        port, // default to 8080
        proxy,
        watchContentBase: true
    }
});

exports.lintJS = ({ include, exclude, options }) => ({
    module: {
        rules: [
            // Reference: https://survivejs.com/webpack/developing/linting/
            {
                test: /\.jsx?$/, // both .js and .jsx
                enforce: 'pre',
                exclude,
                include,
                loader: 'eslint-loader',
                options
            }
        ]
    }
});

exports.loadStyles = ({ include, exclude, ExtractTextPlugin } = {}) => ({
    module: {
        rules: [
            {
                test: /\.less$/,
                include,
                exclude,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'postcss-loader', 'less-loader'],
                    publicPath: path.resolve(__dirname, './client/dist')
                })
            }
        ]
    }
});

exports.minifyJavaScript = () => ({
    plugins: [
        new BabiliPlugin(),
    ],
});
