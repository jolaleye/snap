const path = require('path');
const os = require('os');
const fs = require('fs-extra');
const chalk = require('chalk');
const shell = require('shelljs');

// spark save <name> [source]
// save a directory or repository provided by [source] to .spark/<name>
function save(name, src = path.resolve()) {
  // ensure that the vault exists
  const vaultExists = fs.pathExistsSync(path.resolve(os.homedir(), '.spark'));
  if (!vaultExists) shell.exec(`node ${path.resolve(__dirname, 'init.js')}`);

  const root = path.resolve(os.homedir(), '.spark', name);

  // check if the source provided resolves to a valid path
  const sourcePath = path.resolve(src);
  const pathExists = fs.pathExistsSync(sourcePath);
  if (pathExists) {
    fs.copySync(src, root, { overwrite: false, errorOnExist: true });
    logSuccess(name);
    clean(root, name);
    return;
  }

  // check if the source provided is a valid git url
  const gitUrl = /((git|ssh|http(s)?)|(git@[\w.]+))(:(\/\/)?)([\w.@:/\-~]+)(\.git)(\/)?/;
  const validGit = gitUrl.test(src);
  if (validGit) {
    shell.exec(`git clone ${src} ${root}`, exitCode => {
      if (exitCode !== 0) {
        console.error(`${chalk.redBright('\nGit clone failed :(')} Make sure that the Git URL is correct.`);
      } else {
        logSuccess(name);
        clean(root, name);
      }
    });
    return;
  }

  // log if the source was invalid
  console.error(chalk.redBright('\nInvalid [source]'));
  console.log(`Run ${chalk.green('spark save -h')} to display help information.\n`);
}

function logSuccess(name) {
  console.log(chalk.green('\nSuccess! ＼(＾O＾)／'));
  console.log(`You can now run ${chalk.green(`spark ${name} <project-directory>`)} to use your new boilerplate!\n`);
}

function clean(root, name) {
  const blacklist = ['.git', 'node_modules'];
  for (const item of blacklist) {
    const pathToItem = path.resolve(root, item);
    const itemExists = fs.pathExistsSync(pathToItem);
    if (itemExists) {
      fs.removeSync(pathToItem);
      console.log(`${chalk.redBright(item)} has been removed from ${chalk.green(name)}`);
    }
  }
}

module.exports = save;