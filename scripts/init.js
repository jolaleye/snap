// initialize the vault (boilerplate save location)

const fs = require('fs-extra');
const os = require('os');
const path = require('path');

const vault = path.resolve(os.homedir(), '.spark');

fs.ensureDir(vault)
  .then(() => console.log('vault initialized'))
  .catch(err => console.error(err));
