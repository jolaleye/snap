#!/usr/bin/env node
'use strict';

const cli = require('commander');
const chalk = require('chalk');

const pkg = require('./package.json');
const snap = require('./tasks/snap');
const save = require('./tasks/save');
const ls = require('./tasks/ls');
const show = require('./tasks/show');
const rm = require('./tasks/rm');

// cli info
cli
  .version(pkg.version, '-v, --version')
  .usage(`${chalk.yellow('<command>')} ${chalk.gray('or')} snap ${chalk.yellow('<boilerplate-name> <project-directory> [options]')}`)
  .on('--help', () => {
    console.log('\nFor example, to save a React starter project from GitHub for future use...');
    console.log(`  snap save react https://github.com/user/react-starter.git`);
    console.log(`  snap react my-project`);
    console.log('  cd my-project\n');
    console.log('If you encounter any problems, please open an issue:');
    console.log(`  ${chalk.cyan('https://github.com/jolaleye/snap/issues')}\n`);
  });

// start up a new project
cli
  .arguments('<boilerplate-name> <project-directory>')
  .option('-i, --install', 'run \'npm install\' after creating a project')
  .action(snap);

// save - save a directory or repository to a name
cli
  .command('save <name> [source]')
  .usage(chalk.yellow('<name> [source] [options]'))
  .description('save a directory or respository')
  .option('-o, --overwrite', 'overwrite an existing boilerplate with the same name')
  .on('--help', () => {
    console.log(`\n${chalk.yellow('[source]')} can be...`);
    console.log(`  - a local path to a directory: ${chalk.cyan('./starter')}`);
    console.log(`  - a Git repository URL: ${chalk.cyan('https://github.com/user/starter.git')}`);
    console.log('If no source is provided, it will default to the current directory.\n');
  })
  .action(save);

// ls - list the available boilerplates
cli
  .command('ls')
  .usage(' ')
  .description('list saved boilerplates')
  .action(ls);

// show - display the file structure of a boilerplate
cli
  .command('show <name>')
  .usage(`${chalk.yellow('<name>')}`)
  .description('display the file structure of a boilerplate')
  .action(show);

// rm - delete a saved boilerplate
cli
  .command('rm <names...>')
  .usage(`${chalk.yellow('<names...>')}`)
  .description('delete a saved boilerplate')
  .on('--help', () => {
    console.log(`\n${chalk.yellow('<names...>')} can be one or more names of saved boilerplates.`);
    console.log(`You can check out what you\'ve saved with ${chalk.yellow('snap ls')}.\n`);
  })
  .action(rm);

// parse arguments
cli.parse(process.argv);
