#!/usr/bin/env node

const cli = require('commander');

// cli info
cli
  .version('0.1.0', '-v, --version')
  .usage('<command> [options]')
  .description('A flexible and simple boilerplate management tool');


// save - save a directory or repository to a name
cli
  .command('save <name> [source]')
  .description('save a directory or respository to a name')
  .action((name, src) => {});


// ls - list the available boilerplates
cli
  .command('ls')
  .description('list the available boilerplates')
  .action(() => {});


// show - display the file structure of a boilerplate
cli
  .command('show <name>')
  .description('display the file structure of a boilerplate')
  .action((name) => {});


// parse arguments
cli.parse(process.argv);
