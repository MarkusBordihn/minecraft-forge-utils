/**
 * @fileoverview Minecraft Forge Utils - Test command
 * @license Apache-2.0
 * @author Markus@Bordihn.de (Markus Bordihn)
 */

const { gradleUtils } = require('minecraft-utils-shared');

const chalk = require('chalk');
const pack = require('../utils/pack.js');
const path = require('path');
const preChecks = require('../utils/preChecks.js');

exports.packResourcePack = () => {
  // Only create resource pack if we are able to find resource pack file.
  if (preChecks.errorNonResourcePackFile()) {
    return;
  }
  pack.packResourcePack(path.basename(process.cwd()));
};

exports.packProject = () => {
  // Only create new projects if we don't found any existing projects.
  if (preChecks.errorNoJavaJDK() || preChecks.errorExistingJavaPath()) {
    return;
  }
  console.info('Starting packing project into build/libs, please wait ...');
  gradleUtils.runTask('build');
  console.info(chalk.green('Done.'));
};
