const ejs = require('ejs');
const fs = require('fs');
const inquirer = require('inquirer');
const path = require('path');
const { routerPath, routerModuleConfig } = require('./config');

//选中的模块
const chooseModules = [];

function deelRouteName(name) {
  const preRoute = './modules/';
  return preRoute + name;
}

function init() {
  let entryDir = process.argv.slice(2);
  entryDir.push(...JSON.parse(process.env.npm_config_argv).original.slice(1));
  entryDir = [...new Set(entryDir)];
  if (entryDir && entryDir.length > 0) {
    for (const item of entryDir) {
      if (routerModuleConfig.includes(item)) {
        chooseModules.push(item);
      }
    }
    // console.log('output: ', chooseModules);
    getContentTemplate();
  } else {
    promptModule();
  }
}

const getContentTemplate = async () => {
  const html = await ejs.renderFile(
    path.resolve(__dirname, 'router.config.template.ejs'),
    { chooseModules, deelRouteName },
    { async: true },
  );
  fs.writeFileSync(path.resolve(__dirname, routerPath), html);
};

function promptModule() {
  inquirer
    .prompt({
      type: 'checkbox',
      name: 'modules',
      message:
        `请选择启动的模块, 点击上下键选择, 按空格键确认(可以多选), 回车运行!
  注意: 直接敲击回车会全量编译, 速度较慢!`,
      pageSize: 15,
      choices: routerModuleConfig.map((item) => {
        return {
          name: item,
          value: item,
        };
      }),
    })
    .then((answers) => {
      if (answers.modules.length === 0) {
        chooseModules.push(...routerModuleConfig);
      } else {
        chooseModules.push(...answers.modules);
      }
      getContentTemplate();
    });
}

init();
