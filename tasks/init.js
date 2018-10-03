const fs = require('fs-extra');
const os = require('os');
const path = require('path');
const chalk = require('chalk');

const vault = path.resolve(os.homedir(), '.spark');

// initialize the vault (boilerplate save location)
fs.ensureDir(vault)
  .then(() => console.log(chalk.green(`Spark vault successfully initialized @ ${chalk.cyan(vault)}!`)))
  .catch(err => console.error(err));
