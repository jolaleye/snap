'use strict';

const path = require('path');
const fs = require('fs-extra');
const os = require('os');
const chalk = require('chalk');
const shell = require('shelljs');

// spark <boilerplate-name> <project-directory> [-i]
// create a new project with a boilerplate
function spark(bplateName, projectDir, options) {
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
  console.log('\nCopying...');
  fs.copySync(bplate, projectPath);

  if (options.install) {
    console.log(`Running '${chalk.yellow('npm install')}'...`);
    shell.exec(`cd ${projectDir} && npm install`);
  }

  console.log(chalk.green('\nSuccess! ＼(＾O＾)／'));
  console.log(`You can now ${chalk.yellow(`cd ${projectDir}`)}\n`);
}

module.exports = spark;
