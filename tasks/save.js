const path = require('path');
const fs = require('fs-extra');
const os = require('os');
const chalk = require('chalk');
const shell = require('shelljs');

// save a directory or repository provided by [source] to a <name>
const save = async (name, { src, type }) => {
  // ensure that the vault has been initialized
  const vaultExists = await fs.pathExists(path.resolve(os.homedir(), '.spark'));
  if (!vaultExists) shell.exec(`node ${path.resolve(__dirname, 'init.js')}`);

  const saveLocation = path.resolve(os.homedir(), '.spark', name);

  if (type === 'path') {
    // the source provided was a valid path
    fs.copy(src, saveLocation, { overwrite: false, errorOnExist: true })
      .then(() => {
        success();
        removeGit();
      })
      .catch(error);
  } else if (type === 'git') {
    // the source provided was a valid git url (repo may or may not exist)
    shell.exec(`git clone -q ${src} ${saveLocation}`, exitCode => {
      if (exitCode === 0) {
        success();
        removeGit();
      } else {
        error();
      }
    });
  }

  // remove the boilerplate's git repo
  async function removeGit() {
    const repoExists = await fs.pathExists(path.resolve(saveLocation, '.git'));
    if (!repoExists) return;
  
    fs.remove(path.resolve(saveLocation, '.git'))
      .then(() => console.log('.git has been removed from your new boilerplate.\n'))
      .catch(err => console.error(err));
  }

  // save successful
  function success() {
    console.log(chalk.green('\nSuccess! ＼(＾O＾)／'));
    console.log(`You can now use ${chalk.green(`spark ${name} <project-directory>`)} to use your new boilerplate!\n`);
  }

  // Houston, we have a problem
  function error(err) {
    if (err) console.error(err);
    console.error(chalk.redBright('\nSomething went wrong :('));
    console.log(`  - Make sure there isn\'t already a boilerplate saved with that name. You can check with ${chalk.green('spark ls')}.`);
    console.log(`  - If you wanted to save a Git repo, make sure that the Git URL is correct.\n`);
  }
};

// spark save <name> [source]
module.exports = async (name, src = path.resolve()) => {
  // check if the source resolves to a valid path
  const pathExists = await fs.pathExists(path.resolve(src));
  if (pathExists) return save(name, { src: path.resolve(src), type: 'path' });

  // check if the source is a valid git url
  const gitUrl = /((git|ssh|http(s)?)|(git@[\w.]+))(:(\/\/)?)([\w.@:/\-~]+)(\.git)(\/)?/;
  const validGit = gitUrl.test(src);
  if (validGit) return save(name, { src, type: 'git' });

  // if the source was invalid
  console.error(chalk.redBright('\nInvalid [source]'));
  console.log(`Use ${chalk.green('spark save -h')} to display help information\n`);
}
