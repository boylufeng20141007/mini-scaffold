/*
 * @Author: luxlu 
 * @Date: 2018-03-14 17:26:54 
 * @Last Modified by: luxlu
 * @Last Modified time: 2018-03-23 12:03:48
 */

const path = require('path');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpackBaseConfig = require('./webpack.base.config');
const config = require('../config')('production');

// the path(s) that should be cleaned
const pathsToClean = ['dist'];
// the clean options to use
const cleanOptions = {
    root: path.resolve(__dirname, '..'),
    verbose: true,
    dry: false
};

module.exports = merge(webpackBaseConfig, {
    mode: 'production',
    output: {
        path: path.resolve(__dirname, '..', 'dist/static'),
        filename: 'js/[name].[chunkhash:8].js',
        publicPath: config.publicPath
    },
    plugins: [
        new CleanWebpackPlugin(pathsToClean, cleanOptions)
    ]
});