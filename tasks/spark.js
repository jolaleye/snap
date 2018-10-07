'use strict';

const path = require('path');
const fs = require('fs-extra');
const os = require('os');
const chalk = require('chalk');

function spark(bplateName, projectDir) {
  // find the boilerplate
  const bplate = path.join(os.homedir(), '.spark', bplateName);
  if (!fs.pathExistsSync(bplate)) {
    console.log(`\n${chalk.red('Error:')} ${chalk.yellow(bplateName)} does not exist.\n`);
    return;
  }

  const projectPath = path.resolve(projectDir);
  // check if the project directory is already taken
  if (fs.pathExistsSync(projectPath)) {
    console.log(`\n${chalk.red('Error:')} ${chalk.cyan(projectPath)} already exists.\n`);
    return;
  }

  // spark up the new project ;)
  fs.copySync(bplate, projectPath);
  console.log(chalk.green('\nSuccess! ＼(＾O＾)／'));
  console.log(`You can now ${chalk.yellow(`cd ${projectDir}`)}\n`);
}

module.exports = spark;
