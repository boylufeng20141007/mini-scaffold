/*
 * @Author: luxlu 
 * @Date: 2018-03-14 16:52:44 
 * @Last Modified by: luxlu
 * @Last Modified time: 2018-03-14 17:54:49
 */

const path = require('path');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config');

function resolve (dir) {
    return path.resolve(__dirname, '..', dir)
}
module.exports = merge(webpackBaseConfig, {
    output: {
        path: resolve('dist/static'),
        filename: '[name].js',
        publicPath: '/'
    }
});