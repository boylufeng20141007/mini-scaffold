/*
 * @Author: luxlu 
 * @Date: 2018-03-13 11:51:15 
 * @Last Modified by: luxlu
 * @Last Modified time: 2018-03-13 12:04:57
 */

const path = require('path');

const entryObj = require('../scripts/generate.webpack.entry');

module.exports = {
    entry: entryObj,
    output: {
        path: path.resovle(__dirname, 'dist')
    }
};