/*
 * @Author: luxlu 
 * @Date: 2018-03-14 16:51:30 
 * @Last Modified by: luxlu
 * @Last Modified time: 2018-03-22 17:08:22
 */

const opn = require('opn');
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const hotMiddlware = require('webpack-hot-middleware');
const devMiddleware = require('webpack-dev-middleware');
const webpackDevConfig = require('./webpack.dev.config');

const app = express();
const compiler = webpack(webpackDevConfig);
const devMiddlewareInstance = devMiddleware(compiler, {
    publicPath: webpackDevConfig.output.publicPath
});

app.use(devMiddlewareInstance);

app.use(hotMiddlware(compiler));

app.use('/', express.static(path.resolve(__dirname, '..', 'src/page')));

devMiddlewareInstance.waitUntilValid(() => {
    let url = 'http://localhost:8899/welcome/welcome.html';
    // Specify the app to open in
    let platform = process.platform;
    if( platform === 'win32' ) {
        opn(url, {app: 'chrome'});
    } else if( platform === 'darwin' ) {
        opn(url, {app: 'google chrome'});
    } else {
        opn(url, {app: 'google-chrome'});
    }
});

app.listen(8899, () => {});