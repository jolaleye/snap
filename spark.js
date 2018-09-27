#!/usr/bin/env node

const cli = require('commander');

const package = require('./package.json');

// cli info
cli
  .version(package.version, '-v, --version')
  .usage('<command> [options]')
  .on('--help', () => {
    console.log();
    console.log('If you have any problems, please file an issue:');
    console.log('  https://github.com/jolaleye/spark/issues');
    console.log();
  });

// save - save a directory or repository to a name
cli
  .command('save <name> [source]')
  .usage('<name> [source] [options]')
  .description('save a directory or respository')
  .on('--help', () => {
    console.log();
    console.log('[source] can be...');
    console.log('  - a local path to a directory relative to the current directory: ./starter');
    console.log('  - a Git repository URL: https://github.com/user/starter.git');
    console.log('If no source is provided, it will default to the current directory.')
    console.log();
  })
  .action((name, src, options) => {});

// ls - list the available boilerplates
cli
  .command('ls')
  .description('list the available boilerplates')
  .action(() => {});

// show - display the file structure of a boilerplate
cli
  .command('show <name>')
  .usage('<name> [options]')
  .description('display the file structure of a boilerplate')
  .action((name, options) => {});

// rm - remove a saved boilerplate
cli
  .command('rm <name>')
  .usage('<name> [options]')
  .description('remove a saved boilerplate')
  .action((name, options) => {});

// parse arguments
cli.parse(process.argv);
