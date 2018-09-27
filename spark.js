#!/usr/bin/env node

const cli = require('commander');

const package = require('./package.json');

// cli info
cli
  .version(package.version, '-v, --version')
  .usage('<command> [options]')
  .description('A flexible and simple boilerplate management tool');


// save - save a directory or repository to a name
cli
  .command('save <name> [source]')
  .usage('<name> [source] [options]')
  .description('save a directory or respository')
  .on('--help', () => {
    console.log();
    console.log();
    console.log('  [source] can be...');
    console.log('    - a local path relative to the current working directory: ./react-boilerplate');
    console.log('    - a Git repository URL: https://github.com/jolaleye/spark.git');
    console.log('  If no source is provided it will default to the current directory.')
  })
  .action((name, src, cmd) => {});


// ls - list the available boilerplates
cli
  .command('ls')
  .description('list the available boilerplates')
  .action(() => {});


// show - display the file structure of a boilerplate
cli
  .command('show <name>')
  .description('display the file structure of a boilerplate')
  .action((name, cmd) => {});


// parse arguments
cli.parse(process.argv);
