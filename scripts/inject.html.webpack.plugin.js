/*
 * @Description 自动注入HTMLwebpackplugin
 * @Author: luxlu 
 * @Date: 2018-03-13 19:59:29 
 * @Last Modified by: luxlu
 * @Last Modified time: 2018-03-23 12:13:03
 */

const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function readHTMLTempalte(path) {
    return fs.readFileSync(path, 'utf8').replace(/<script.*?><\/script>/g, '');
}

module.exports = pageNameArr => {
    const plugins = [];

    pageNameArr.forEach(pageName => {
        plugins.push(new HtmlWebpackPlugin({
            // template: path.resolve(__dirname, '..', `src/page/${pageName}/${pageName}.html`),
            templateContent: readHTMLTempalte(path.resolve(__dirname, '..', `src/page/${pageName}/${pageName}.html`)),
            filename: path.resolve('dist/tmpl/page', `${pageName}/${pageName}.html`),
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: false //删除空白符与换行符
            },
            chunksSortMode: 'dependency',
            chunks: ['commons', `${pageName}`]
        }));
    });

    return plugins;
};