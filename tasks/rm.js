'use strict';

const os = require('os');
const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');

// snap rm <names...>
// delete one or more boilerplates
function rm(names) {
  console.log();
  for (const name of names) {
    const bplate = path.join(os.homedir(), '.snap', name);
    if (fs.pathExistsSync(bplate)) {
      fs.removeSync(bplate);
      console.log(`${chalk.green('Success:')} ${chalk.redBright(name)} has been deleted!`);
    } else {
      console.error(`${chalk.red('Error:')} ${chalk.yellow(name)} does not exist.`);
    }
  }
  console.log();
}

module.exports = rm;
