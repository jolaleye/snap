#!/usr/bin/env node

const cli = require('commander');
const chalk = require('chalk');

const package = require('./package.json');

// cli info
cli
  .version(package.version, '-v, --version')
  .usage(`${chalk.green('<command>')} ${chalk.gray('or')} spark ${chalk.green('<boilerplate-name> <project-directory>')}`)
  .on('--help', () => {
    console.log();
    console.log('For example, if you wanted to save and use a boilerplate for React projects...');
    console.log(`  spark save react https://github.com/user/react-starter.git`);
    console.log(`  spark react my-project`);
    console.log('  cd my-project')
    console.log();
    console.log('If you have any problems, please file an issue:');
    console.log(`  ${chalk.cyan('https://github.com/jolaleye/spark/issues')}`);
    console.log();
  });

// spark up a new project
cli
  .arguments('<boilerplate-name> <project-directory>')
  .action((boilerplate, name) => {});

// save - save a directory or repository to a name
cli
  .command('save <name> [source]')
  .usage(`${chalk.green('<name>')} ${chalk.greenBright('[source]')} [options]`)
  .description('save a directory or respository')
  .on('--help', () => {
    console.log();
    console.log(`${chalk.greenBright('[source]')} can be...`);
    console.log(`  - a local path to a directory relative to the current directory: ${chalk.cyan('./starter')}`);
    console.log(`  - a Git repository URL: ${chalk.cyan('https://github.com/user/starter.git')}`);
    console.log('If no source is provided, it will default to the current directory.')
    console.log();
  })
  .action((name, src) => {});

// ls - list the available boilerplates
cli
  .command('ls')
  .description('list the available boilerplates')
  .action(() => {});

// show - display the file structure of a boilerplate
cli
  .command('show <name>')
  .usage(`${chalk.green('<name>')} [options]`)
  .description('display the file structure of a boilerplate')
  .action((name) => {});

// delete - delete a saved boilerplate
cli
  .command('delete <names...>')
  .alias('rm')
  .usage(`${chalk.green('<names...>')}`)
  .description('delete a saved boilerplate')
  .on('--help', () => {
    console.log();
    console.log(`${chalk.green('<names...>')} can be one or multiple names of saved boilerplates.`);
    console.log();
  })
  .action((names) => {});

// parse arguments
cli.parse(process.argv);
