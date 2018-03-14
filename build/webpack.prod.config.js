/*
 * @Author: luxlu 
 * @Date: 2018-03-14 17:26:54 
 * @Last Modified by: luxlu
 * @Last Modified time: 2018-03-14 18:12:57
 */

const path = require('path');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpackBaseConfig = require('./webpack.base.config');

// the path(s) that should be cleaned
const pathsToClean = ['dist'];
// the clean options to use
const cleanOptions = {
    root: path.resolve(__dirname, '..'),
    verbose: true,
    dry: false
};

module.exports = merge(webpackBaseConfig, {
    plugins: [new CleanWebpackPlugin(pathsToClean, cleanOptions)]
});