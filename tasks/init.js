'use strict';

const fs = require('fs-extra');
const os = require('os');
const path = require('path');
const chalk = require('chalk');

// initialize the vault (boilerplate save location)
const vault = path.join(os.homedir(), '.snap');
fs.ensureDirSync(vault);
console.log(chalk.green(`\nVault successfully initialized @ ${chalk.cyan(vault)}!`));
console.log('This is where all of your saved boilerplates will go!\n');
