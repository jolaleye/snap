'use strict';

const os = require('os');
const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');

// spark rm <names...>
// delete one or more boilerplates
function rm(names) {
  const vault = path.resolve(os.homedir(), '.spark');

  console.log();
  for (const name of names) {
    const pathTo = path.resolve(vault, name);
    const exists = fs.pathExistsSync(pathTo);
    if (exists) {
      fs.removeSync(pathTo);
      console.log(`${chalk.green('Success:')} ${chalk.redBright(name)} has been deleted!`);
    } else {
      console.log(`${chalk.redBright('Error:')} ${name} does not exist.`);
    }
  }
  console.log();
}

module.exports = rm;
