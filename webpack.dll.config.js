const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const env = process.env.NODE_ENV || 'development'

const dllConfig = {
    context: process.cwd(),
    mode: env,
    entry: {
        vendor: [
            'vue/dist/vue.esm.js',
            'vue-router',
            'vuex',
            'vuex-vuex-i18n'
        ]
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader', 'postcss-loader']
        }, {
            test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'fonts/',
                    publicPath: '../'
                }
            }]
        }]
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].dll.js',
        // Define the output: window.${output.library}
        library: '[name]_library'
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, 'dist', '[name]-manifest.json'),
            // Just like output.library
            name: '[name]_library'
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].css',
            chunkFilename: '[id].css'
        })
    ]
}

module.exports = dllConfig
