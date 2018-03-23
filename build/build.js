/*
 * @Description 生产环境构建
 * @Author: luxlu 
 * @Date: 2018-03-13 17:44:56 
 * @Last Modified by: luxlu
 * @Last Modified time: 2018-03-23 12:03:04
 */

const ora = require('ora');
const chalk = require('chalk');
const webpack = require('webpack');
const config = require('./webpack.prod.config');

const spinner = ora('building for production...').start();

webpack(config, (err, stats) => {
    if (err || stats.hasErrors()) {
        spinner.color = 'red';
        spinner.text = 'build failed!!'
        spinner.stop();
        console.log(chalk.red('build failed!!'));
    } else {
        spinner.color = 'green';
        spinner.text = 'build success'
        spinner.stop();
        console.log(chalk.green('build success'));
        console.log(stats.toString({
            chunks: false,  // 使构建过程更静默无输出
            colors: true,    // 在控制台展示颜色
            modules: false,
            children: false,
            chunkModules: false
        }));
    }
});