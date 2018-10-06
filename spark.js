#!/usr/bin/env node
'use strict';

const cli = require('commander');
const chalk = require('chalk');

const pkg = require('./package.json');
const save = require('./tasks/save');

// cli info
cli
  .version(pkg.version, '-v, --version')
  .usage(`${chalk.yellow('<command>')} ${chalk.gray('or')} spark ${chalk.yellow('<boilerplate-name> <project-directory>')}`)
  .on('--help', () => {
    console.log('\nFor example, if you wanted to save and use a boilerplate for React projects...');
    console.log(`  spark save react https://github.com/user/react-starter.git`);
    console.log(`  spark react my-project`);
    console.log('  cd my-project\n');
    console.log('If you have any problems, please file an issue:');
    console.log(`  ${chalk.cyan('https://github.com/jolaleye/spark/issues')}\n`);
  });

// spark up a new project
cli
  .arguments('<boilerplate-name> <project-directory>')
  .action((boilerplate, name) => {});

// save - save a directory or repository to a name
cli
  .command('save <name> [source]')
  .usage(chalk.yellow('<name> [source]'))
  .description('save a directory or respository')
  .on('--help', () => {
    console.log(`\n${chalk.yellow('[source]')} can be...`);
    console.log(`  - a path to a directory: ${chalk.cyan('./starter')}`);
    console.log(`  - a Git repository URL: ${chalk.cyan('https://github.com/user/starter.git')}`);
    console.log('If no source is provided, it will default to the current directory.\n');
  })
  .action(save);

// ls - list the available boilerplates
cli
  .command('ls')
  .usage(' ')
  .description('list the available boilerplates')
  .action(() => {});

// show - display the file structure of a boilerplate
cli
  .command('show <name>')
  .usage(`${chalk.yellow('<name>')}`)
  .description('display the file structure of a boilerplate')
  .action((name) => {});

// delete - delete a saved boilerplate
cli
  .command('delete <names...>')
  .alias('rm')
  .usage(`${chalk.yellow('<names...>')}`)
  .description('delete a saved boilerplate')
  .on('--help', () => {
    console.log(`\n${chalk.yellow('<names...>')} can be one or multiple names of saved boilerplates.\n`);
  })
  .action((names) => {});

// parse arguments
cli.parse(process.argv);
