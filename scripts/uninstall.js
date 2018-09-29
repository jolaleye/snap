// clear the vault before uninstalling

const fs = require('fs-extra');
const os = require('os');
const path = require('path');

const vault = path.resolve(os.homedir(), '.spark');

fs.remove(vault)
  .then(() => console.log('vault cleared'))
  .catch(err => console.error(err));
