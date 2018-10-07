'use strict';

const path = require('path');
const os = require('os');
const fs = require('fs-extra');
const chalk = require('chalk');

// spark show <name>
// display the file structure of a boilerplate
function show(name) {
  const root = path.resolve(os.homedir(), '.spark', name);
  const exists = fs.pathExistsSync(root);
  if (!exists) {
    console.log(`\n${chalk.redBright('Error:')} ${name} does not exist.\n`);
    return;
  }

  const tree = walk(root, 0);
  console.log();
  printTree(tree);
  console.log();
}

function printTree(item, isLast) {
  if (item.level === 0) console.log(chalk.yellow(item.name));
  else {
    // build the item's indent/prefix
    let prefix = '';
    prefix += '│    '.repeat(item.level - 1);
    prefix += isLast ? '└── ' : '├── ';

    console.log(`${prefix}${item.name}`);
  }

  // recursively print children
  if (item.children) {
    for (const child of item.children) {
      const isLastChild = child === item.children[item.children.length - 1];
      printTree(child, isLastChild);
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
