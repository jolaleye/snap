'use strict';

const path = require('path');
const os = require('os');
const fs = require('fs-extra');
const chalk = require('chalk');

// snap show <name>
// display the file structure of a boilerplate
function show(name) {
  const root = path.join(os.homedir(), '.snap', name);
  if (!fs.pathExistsSync(root)) {
    console.log(`\n${chalk.red('Error:')} ${chalk.yellow(name)} does not exist.\n`);
    return;
  }

  const tree = walk(root, 0);
  console.log();
  printTree(tree);
  console.log();
}

function printTree(item, parentWasLast, isLast) {
  if (item.level === 0) console.log(chalk.yellow(item.name));
  else {
    // build the item's indent/prefix
    let prefix = '';
    prefix += parentWasLast ? '    '.repeat(item.level - 1) : '│   '.repeat(item.level - 1);
    prefix += isLast ? '└── ' : '├── ';

    console.log(`${prefix}${item.name}`);
  }

  // recursively print children
  if (item.children) {
    for (const child of item.children) {
      const lastChild = child === item.children[item.children.length - 1];
      printTree(child, isLast, lastChild);
    }
  }
}

function walk(currentPath, level) {
  // give the current item a name & level
  const item = { name: path.basename(currentPath), level };
  // get its stats
  const stats = fs.statSync(currentPath);
  // look at the item's contents if it has any
  if (stats.isDirectory()) {
    item.children = fs.readdirSync(currentPath).map(child => walk(path.join(currentPath, child), level + 1));
  }
  return item;
}

module.exports = show;
