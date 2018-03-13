/*
 * @Description 新建组件模板
 * @Author: luxlu 
 * @Date: 2018-03-13 15:24:51 
 * @Last Modified by: luxlu
 * @Last Modified time: 2018-03-13 17:08:13
 */

const path = require('path');
const fs = require('fs-extra');
const inquirer = require('inquirer');

const prompt = inquirer.prompt;
let pageDir = path.resolve(__dirname, '../src/page');
let pageTplDir = path.resolve(__dirname, '../template/page');

function writeTemplate(type, name) {
    if( !type || !name ) return;

    if( type === 'page' ){
        let tmpPageDir = path.join(pageDir, name);

        fs.copySync(path.resolve(pageTplDir, 'page.html'), path.resolve(tmpPageDir, `${name}.html`));
        fs.copySync(path.resolve(pageTplDir, 'page.scss'), path.resolve(tmpPageDir, `${name}.scss`));
        fs.copySync(path.resolve(pageTplDir, 'page.js'), path.resolve(tmpPageDir, `${name}.js`));
    }
}

const typePromise = prompt([ { 
    type: 'list', 
    name: 'type', 
    message: '请选择一种模板', 
    choices: ['page', 'component'],
    default: 0
}]);

typePromise.then(type=> {
    prompt([ { 
        type: 'input', 
        name: 'name', 
        message: '请输入组件名', 
        default: 'default'
    }]).then(name=> {
        writeTemplate(type.type, name.name);
    });
});