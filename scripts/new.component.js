/*
 * @Description 新建组件模板
 * @Author: luxlu 
 * @Date: 2018-03-13 15:24:51 
 * @Last Modified by: luxlu
 * @Last Modified time: 2018-03-16 15:48:50
 */

const path = require('path');
const fs = require('fs-extra');
const inquirer = require('inquirer');
const chalk = require('chalk');

const _resolve = path.resolve;
const prompt = inquirer.prompt;
let pageDir = _resolve(__dirname, '../src/page');
let pageTplDir = _resolve(__dirname, '../template/page');
let componentDir = _resolve(__dirname, '../src/components');
let componentTplDir = _resolve(__dirname, '../template/component');

/**
 * 更新组件样式引用文件名
 * @param {String} file 
 * @param {String} name 
 */
function updateComponentContent(file, name){
    fs.readFile(file, 'utf8', (err,data) => {
        if (err) {
            return console.log(chalk.red(err));
        }

        const result = data.replace(/\.\/component\.scss/g, `./${name}.scss`);
    
        fs.writeFile(file, result, 'utf8', err => {
            if ( err ) {
                return console.log(chalk.red(err));
            }
        });
    });
}

/**
 * 新建组件
 * @param {String} name 
 * @param {String} componentType 
 */
function newModuleComponentTpl(name, componentType) {
    if( componentType === 'global' ){
        componentDir = _resolve(componentDir, 'global');
    } else {
        componentDir = _resolve(componentDir, 'business');
    }

    let tmpComponentDir = path.join(componentDir, name);

    let jsPath =  _resolve(tmpComponentDir, `${name}.js`);
    let htmlPath = _resolve(tmpComponentDir, `${name}.html`);

    fs.copySync(_resolve(componentTplDir, 'component.html'), htmlPath);
    fs.copySync(_resolve(componentTplDir, 'component.scss'), _resolve(tmpComponentDir, `${name}.scss`));
    fs.copySync(_resolve(componentTplDir, 'component.js'), jsPath);

    updateComponentContent(jsPath, name);
}

/**
 * 为了正确引用scss文件替换模板生成的js内容
 * @param {Array} filse 
 * @param {String} name 
 */
function updatePageContent(files, name) {
    files.forEach(file => {
        fs.readFile(file, 'utf8', (err,data) => {
            if (err) {
                return console.log(chalk.red(err));
            }

            const result = data.replace(/\.\/page\.scss/g, `./${name}.scss`).replace(/\/page\.js/g, `/${name}.js`);
        
            fs.writeFile(file, result, 'utf8', err => {
                if ( err ) {
                    return console.log(chalk.red(err));
                }
            });
        });
    });
}

function newPageComponentTpl(name) {
    let tmpPageDir = path.join(pageDir, name);

    let jsPath =  _resolve(tmpPageDir, `${name}.js`);
    let htmlPath = _resolve(tmpPageDir, `${name}.html`);

    fs.copySync(_resolve(pageTplDir, 'page.html'), htmlPath);
    fs.copySync(_resolve(pageTplDir, 'page.scss'), _resolve(tmpPageDir, `${name}.scss`));
    fs.copySync(_resolve(pageTplDir, 'page.js'), jsPath);

    updatePageContent([jsPath, htmlPath], name);
}

/**
 * 生成组件对应的模板
 * @param {String} type 
 * @param {String} name 
 */
function writeTemplate(type, name, ...args) {
    if( !type || !name ) return;
    
    if( type === 'page' ){
        newPageComponentTpl(name);

    } else if( args.length ) {
        newModuleComponentTpl(name, ...args);
    }
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
    if( type.type === 'component' ) {
        prompt([{
            type: 'list', 
            name: 'componentType', 
            message: '选择业务组件类型', 
            choices: ['business', 'global'],
            default: 0
        }]).then(componentType => {
            prompt([{ 
                type: 'input', 
                name: 'name', 
                message: '请输入组件名', 
                default: 'default'
            }]).then(name=> {
                writeTemplate(type.type, name.name, componentType.componentType);
            });
        });
    } else {
        prompt([{ 
            type: 'input', 
            name: 'name', 
            message: '请输入页面名', 
            default: 'default'
        }]).then(name=> {
            writeTemplate(type.type, name.name);
        });
    }
    
});
// 对话框 --------//