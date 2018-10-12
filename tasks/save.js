'use strict';

const path = require('path');
const os = require('os');
const fs = require('fs-extra');
const chalk = require('chalk');
const shell = require('shelljs');

// snap save <name> [source]
// save a directory or repository provided by [source] to .snap/<name>
function save(name, src = path.resolve(), options) {
  // ensure that the vault exists
  const vault = path.join(os.homedir(), '.snap');
  if (!fs.pathExistsSync(vault)) shell.exec(`node ${path.join(__dirname, 'init.js')}`);

  const root = path.join(vault, name);

  // check if the name is already taken
  if (fs.pathExistsSync(root) && !options.overwrite) {
    console.error(`\n${chalk.red(chalk.underline(name), 'already exists')}\n`);
    return;
  }

  // check if the source provided resolves to a valid path
  const sourcePath = path.resolve(src);
  if (fs.pathExistsSync(sourcePath)) {
    // if --overwrite is passed, remove the existing save first
    if (options.overwrite) fs.removeSync(root);

    // copy the source provided to the new boilerplate in the vault
    fs.copySync(src, root, {
      overwrite: false, // don't want to modify existing boilerplates, -o will remove the old one first
      errorOnExist: true, // shouldn't happen, either the boilerplate is new or has been removed with -o
      filter: pathToCopy => {
        const match = pathToCopy.match(/node_modules$|.git$/);
        if (match) {
          console.log(`${chalk.dim.redBright(match[0])} has been excluded from ${chalk.yellow(name)}`);
        }
        return !match;
      }
    });

    logSuccess(name);
    clean(root, name);
    return;
  }

  // check if the source provided is a valid git url
  const gitUrl = /((git|ssh|http(s)?)|(git@[\w.]+))(:(\/\/)?)([\w.@:/\-~]+)(\.git)(\/)?/;
  if (gitUrl.test(src)) {
    shell.exec(`git clone ${src} ${root}`, { silent: true }, exitCode => {
      if (exitCode !== 0) {
        console.error(`\n${chalk.red('Save failed :(')}  Could not clone from ${chalk.cyan(src)}\n`);
      } else {
        logSuccess(name);
        clean(root, name);
      }
    });
    return;
  }

  // log if the source was invalid
  console.error(chalk.red('\nInvalid [source]'));
  console.log(`Run ${chalk.yellow('snap save -h')} to display help information.\n`);
}

function logSuccess(name) {
  console.log(chalk.green('\nSuccess! ＼(＾O＾)／'));
  console.log(`You can now run ${chalk.yellow('snap', chalk.underline(name), '<project-directory>')} to use your new boilerplate!\n`);
}

// clean out blacklisted content
function clean(root, name) {
  const blacklist = ['.git', 'node_modules'];
  for (const item of blacklist) {
    const pathToItem = path.join(root, item);
    if (fs.pathExistsSync(pathToItem)) {
      fs.removeSync(pathToItem);
      console.log(`${chalk.dim.redBright(item)} has been removed from ${chalk.yellow(name)}`);
    }
  }
}

module.exports = save;
