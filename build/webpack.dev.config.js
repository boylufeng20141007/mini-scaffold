/*
 * @Author: luxlu 
 * @Date: 2018-03-14 16:52:44 
 * @Last Modified by: luxlu
 * @Last Modified time: 2018-03-22 17:33:29
 */

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const config = require('../config')('development');
const webpackBaseConfig = require('./webpack.base.config');

function resolve (dir) {
    return path.resolve(__dirname, '..', dir)
}
module.exports = merge(webpackBaseConfig, {
    mode: 'development',
    output: {
        path: resolve('dist/static'),
        filename: '[name].js',
        publicPath: config.publicPath
    },
    // module: {
    //     rules: [{
    //         test: /\.scss$/,
    //         use: [{
    //             loader: "style-loader" // creates style nodes from JS strings
    //         }, {
    //             loader: "css-loader" // translates CSS into CommonJS
    //         }, {
    //             loader: "sass-loader" // compiles Sass to CSS
    //         }]
    //     }]
    // },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
});