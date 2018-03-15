/*
 * @Description 新建组件模板
 * @Author: luxlu 
 * @Date: 2018-03-13 15:24:51 
 * @Last Modified by: luxlu
 * @Last Modified time: 2018-03-15 17:38:20
 */

const path = require('path');
const fs = require('fs-extra');
const inquirer = require('inquirer');
const chalk = require('chalk');

const prompt = inquirer.prompt;
let pageDir = path.resolve(__dirname, '../src/page');
let pageTplDir = path.resolve(__dirname, '../template/page');

/**
 * 为了正确引用scss文件替换模板生成的js内容
 * @param {Array} filse 
 * @param {String} name 
 */
function updateFileContent(files, name) {
    files.forEach(file => {
        console.log(file);
        fs.readFile(file, 'utf8', (err,data) => {
            if (err) {
                return console.log(chalk.red(err));
            }
            console.log(data);

            const result = data.replace(/\.\/page\.scss/g, `./${name}.scss`).replace(/\/page\.js/g, `/${name}.js`);
        
            fs.writeFile(file, result, 'utf8', err => {
                if ( err ) {
                    return console.log(chalk.red(err));
                }
            });
        });
    });
}

/**
 * 生成组件对应的模板
 * @param {String} type 
 * @param {String} name 
 */
function writeTemplate(type, name) {
    if( !type || !name ) return;

    let jsPath = '';
    let htmlPath = '';
    
    if( type === 'page' ){
        let tmpPageDir = path.join(pageDir, name);
        jsPath =  path.resolve(tmpPageDir, `${name}.js`);
        htmlPath = path.resolve(tmpPageDir, `${name}.html`);

        fs.copySync(path.resolve(pageTplDir, 'page.html'), htmlPath);
        fs.copySync(path.resolve(pageTplDir, 'page.scss'), path.resolve(tmpPageDir, `${name}.scss`));
        fs.copySync(path.resolve(pageTplDir, 'page.js'), jsPath);
    }

    updateFileContent([jsPath, htmlPath], name);
}

// 对话框 --------//
const typePromise = prompt([{ 
    type: 'list', 
    name: 'type', 
    message: '请选择一种模板', 
    choices: ['page', 'component'],
    default: 0
}]);

typePromise.then(type=> {
    prompt([{ 
        type: 'input', 
        name: 'name', 
        message: '请输入组件名', 
        default: 'default'
    }]).then(name=> {
        writeTemplate(type.type, name.name);
    });
});
// 对话框 --------//