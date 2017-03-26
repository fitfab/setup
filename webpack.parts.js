const path = require('path');

exports.devServer = ({ host, port, proxy } = {}) => ({
    devServer: {
        historyApiFallback: true,
        stats: 'errors-only',
        // contentBase directory where the index.html is
        contentBase: path.resolve(__dirname, './client/'),
        host, // default to localhost
        port, // default to 8080
        proxy,
        overlay: {
            errors: true,
            warnings: true,
        },
        watchContentBase: true
    }
});
