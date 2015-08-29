module.exports = {
    entry: {
        'multiplication-circle': [
            './js/main.js'
        ]
    },
    output: {
        filename: 'build/[name].js'
    },
    module: {
        loaders: [
            { test: /.js$/, exclude: /node_modules/, loader: 'babel' }
        ]
    },
    devtool: 'source-map'
}
