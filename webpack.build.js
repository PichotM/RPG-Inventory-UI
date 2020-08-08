const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const JavascriptObfuscator = require('webpack-obfuscator')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    entry: './index.tsx',
    output: {
        path: path.resolve('./dist'),
        filename: '[name].js',
        publicPath: ''
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            {
                test: /\.pug$/,
                use: ['html-loader?attrs=false', 'pug-html-loader']
            },
            {
                test: /\.tsx?$/,
                loader: 'ts-loader'
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                loader: 'file-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.pug',
            inject: true
        }),
        // new JavascriptObfuscator({}),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        })
    ]
}
