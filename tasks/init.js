'use strict';

const fs = require('fs-extra');
const os = require('os');
const path = require('path');
const chalk = require('chalk');

// initialize the vault (boilerplate save location)
const vault = path.join(os.homedir(), '.spark');
fs.ensureDirSync(vault);
console.log(chalk.green(`\nSpark vault successfully initialized @ ${chalk.cyan(vault)}!\n`));
