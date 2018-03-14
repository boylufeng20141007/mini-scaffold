/*
 * @Author: luxlu 
 * @Date: 2018-03-14 16:51:30 
 * @Last Modified by: luxlu
 * @Last Modified time: 2018-03-14 21:03:32
 */

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackHotMiddlware = require('webpack-hot-middleware');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackDevConfig = require('./webpack.dev.config');

const app = express();
const compiler = webpack(webpackDevConfig);

app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackDevConfig.output.publicPath
}));

app.use('/', express.static(path.resolve(__dirname, '..', 'src/page')));

app.listen(8899, () => {});