const path = require('path');
const chalk = require('chalk');
const msg = require('fs')
  .readFileSync(path.resolve('.git/COMMIT_EDITMSG'), 'utf-8')
  .trim();

const commitReg =
  /^(revert: )?(feat|fix|revert|docs|style|ui|refactor|perf|test|build|ci|chore|types|typo|wip|merge)(\(.+\))?: .{1,50} \((((bug|story)#\d+)|#000)\)( \(\w+\))?$/;

if (!commitReg.test(msg)) {
  /* eslint-disable */
  console.log();
  console.error(
    `${chalk.bgRed.white(' ERROR ')} ${chalk.red(`无效的提交格式：`)}\n\n` +
    `  ${chalk.bgRed(msg)}\n\n` +
    chalk.red(`  请确认提交格式是否正确，期望的格式如下示例:\n\n`) +
    `  ${chalk.green(`fix: 修复xxx不显示问题 (bug#666)`)}\n` +
    `  ${chalk.green(`feat(f9): 页面添加xxx模块 (story#123)`)}\n\n`,
  );
  process.exit(1);
}
