const path = require('path');
const fs = require('fs-extra');
const buildConfig = require('./build-config');

let preview = buildConfig.destinationDir + '/dev';
let previewFolder = path.join(__dirname, preview);
if( fs.existsSync(previewFolder) ) {
  fs.removeSync(previewFolder);
}

let config = require('@ucd-lib/cork-app-build').watch({
  // root directory, all paths below will be relative to root
  root : __dirname,
  // path to your entry .js file
  entry : buildConfig.entry,
  // folder where bundle.js will be written
  preview : preview,
  modern : buildConfig.fileName,
  clientModules : buildConfig.clientModules
});

module.exports = config;
