'use strict';

const os = require('os');
const path = require('path');
const shell = require('shelljs');
const chalk = require('chalk');

// spark ls
// list saved boilerplates
function ls() {
  const vault = path.join(os.homedir(), '.spark');
  const list = shell.ls(vault);
  if (!list.length) {
    console.log('\nIt seems you don\'t have anything saved...');
    console.log(`You can run ${chalk.yellow('spark save')} to save a directory or Git repo for future use!`);
    console.log(`Run ${chalk.yellow('spark save -h')} for more info.\n`);
    return;
  }

  console.log('\nThe following boilerplates have been saved...');
  console.log(`Run ${chalk.yellow('spark <boilerplate-name> <project-directory>')} to get started with your new project!`);
  for (const bplate of list) {
    console.log(`  ○ ${bplate}`);
  }
  console.log();
}

module.exports = ls;
