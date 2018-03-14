/*
 * @Author: luxlu 
 * @Date: 2018-03-14 16:51:30 
 * @Last Modified by: luxlu
 * @Last Modified time: 2018-03-14 17:42:54
 */

const express = require('express');
const webpack = require('webpack');
const webpackHotMiddlware = require('webpack-hot-middleware');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackDevConfig = require('./webpack.dev.config');

const app = express();
const compiler = webpack(webpackDevConfig);

app.use(webpackDevMiddleware(compiler));

// app.use('/', express.static('./static'))

// app.get('/', function(req, res){
//     res.send('hello world');
//   });

app.listen(8899, () => {});