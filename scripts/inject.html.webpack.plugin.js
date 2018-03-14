/*
 * @Description 自动注入HTMLwebpackplugin
 * @Author: luxlu 
 * @Date: 2018-03-13 19:59:29 
 * @Last Modified by: luxlu
 * @Last Modified time: 2018-03-14 16:49:21
 */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = pageNameArr => {
    const plugins = [];

    pageNameArr.forEach(pageName => {
        plugins.push(new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '..', `src/page/${pageName}/${pageName}.html`),
            filename: path.resolve('dist/tmpl/page', `${pageName}/${pageName}.html`),
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: false //删除空白符与换行符
            },
            chunksSortMode: 'manual',
            chunks: [`${pageName}`]
        }));
    });

    return plugins;
};