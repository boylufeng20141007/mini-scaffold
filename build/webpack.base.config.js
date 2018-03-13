/*
 * @Author: luxlu 
 * @Date: 2018-03-13 11:51:15 
 * @Last Modified by: luxlu
 * @Last Modified time: 2018-03-13 20:55:19
 */

const path = require('path');
const entryObj = require('../scripts/generate.webpack.entry');
const pluginsFn = require('../scripts/generate.webpack.plugin');
const pageNameArr = Object.keys(entryObj);

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    entry: entryObj,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash:8].js',
        publicPath: '/'
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            include: [resolve(src)]
        }]
    },
    resolve: {},
    plugins: pluginsFn(pageNameArr)
};