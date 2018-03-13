/*
 * @Description dynamic generate webpack multi entry files
 * @Author: luxlu 
 * @Date: 2018-03-13 11:56:36 
 * @Last Modified by: luxlu
 * @Last Modified time: 2018-03-13 17:08:49
 */

const path = require('path');
const fs = require('fs-extra');
// const chalk = require('chalk');

const entryPageDir = path.resolve(__dirname, '..', 'src/page');

const files =  fs.readdirSync(entryPageDir);

/**
 * @description 获取所以入口文件
 * @param {Array} files 
 */
function getPageEntry(files) {
    const entry = {};

    files.forEach(name => {
        entry[name] = `./src/page/${name}/${name}.js`;
    });

    return entry;
}

module.exports = getPageEntry(files);