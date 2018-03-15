/*
 * @Author: luxlu 
 * @Date: 2018-03-13 11:51:15 
 * @Last Modified by: luxlu
 * @Last Modified time: 2018-03-15 19:33:43
 */

const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const entryObj = require('../scripts/generate.webpack.entry');
const htmlWebpackPlugins = require('../scripts/inject.html.webpack.plugin');
const pageNameArr = Object.keys(entryObj);

const extractScss = new ExtractTextPlugin({
    filename: "css/[name].[contenthash:8].css",
    disable: process.env.NODE_ENV === "development"
});

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
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader?cacheDirectory=true',
            include: [resolve('src')],
            exclude: [resolve('node_modules')]
        }, {
            test: /\.scss$/,
            use: extractScss.extract({
                use: [
                    { loader: 'css-loader', options: { sourceMap: true } },
                    { loader: 'postcss-loader', options: { sourceMap: true } },
                    { loader: 'sass-loader', options: { sourceMap: true } }
                ],
                // use style-loader in development
                fallback: "style-loader"
            })
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: resolve('img/[name].[hash:8].[ext]')
            }
        }]
    },
    resolve: {
        extensions: ['.js', '.vue', '.scss', '.css', '.json'],
        alias: {
            'business': resolve('src/components/business'),
            'global': resolve('src/components/global')
        }
    },
    plugins: [extractScss].concat(htmlWebpackPlugins(pageNameArr))
};