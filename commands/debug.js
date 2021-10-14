/**
 * @fileoverview Minecraft Forge Utils - Debug command
 * @license Apache-2.0
 * @author Markus@Bordihn.de (Markus Bordihn)
 */

const args = process.argv.slice(2);
const path = require('../utils/path.js');
const { translationUtils } = require('minecraft-utils-shared');

const debug = () => {
  console.log('minecraft-forge-utils:', args, '\n');
  console.log('Detected Language:', translationUtils.language);
  console.log('Detected paths:', path);
  console.log('Process Env:', process.env);
};

module.exports = debug;
