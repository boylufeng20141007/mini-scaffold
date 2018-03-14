/*
 * @Author: luxlu 
 * @Date: 2018-03-13 11:51:15 
 * @Last Modified by: luxlu
 * @Last Modified time: 2018-03-14 17:54:35
 */

const path = require('path');
const entryObj = require('../scripts/generate.webpack.entry');
const htmlWebpackPlugins = require('../scripts/inject.html.webpack.plugin');
const pageNameArr = Object.keys(entryObj);


function resolve (dir) {
    return path.resolve(__dirname, '..', dir)
}

module.exports = {
    entry: entryObj,
    optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					name: "commons",
					chunks: "initial",
					minChunks: 2,
					minSize: 0
				}
			}
		},
		occurrenceOrder: true // To keep filename consistent between different modes (for example building only)
	},
    output: {
        path: resolve('dist/static'),
        filename: '[name].[chunkhash:8].js',
        publicPath: '/'
    },
    module: {
        // rules: [{
        //     test: /\.js$/,
        //     loader: 'babel-loader',
        //     include: [resolve('src')],
        //     exclude: [resolve('node_modules')]
        // }]
    },
    resolve: {},
    plugins: [].concat(htmlWebpackPlugins(pageNameArr))
};