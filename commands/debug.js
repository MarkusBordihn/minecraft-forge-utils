/**
 * @fileoverview Minecraft Forge Utils - Debug command
 * @license Apache-2.0
 * @author Markus@Bordihn.de (Markus Bordihn)
 */

const args = process.argv.slice(2);
const {
  configurationUtils,
  defaultPath,
  translationUtils,
  utilsVersion,
} = require('minecraft-utils-shared');

const debug = () => {
  const projectConfig = configurationUtils.loadProjectConfig();

  console.log('minecraft-forge-utils:', args, '\n');
  console.log('Detected Language:', translationUtils.language);
  if (projectConfig) {
    console.log('Project Config', projectConfig);
  }
  console.log('Detected paths:', defaultPath);
  console.log('Process Env:', process.env);
  console.log('Shared utils version:', utilsVersion);
  console.log('Version:', process.env.npm_package_version);
};

module.exports = debug;
