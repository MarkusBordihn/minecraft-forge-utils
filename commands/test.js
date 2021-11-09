/**
 * @fileoverview Minecraft Forge Utils - Test command
 * @license Apache-2.0
 * @author Markus@Bordihn.de (Markus Bordihn)
 */

const { gradleUtils } = require('minecraft-utils-shared');

const preChecks = require('../utils/preChecks.js');

exports.runTest = () => {
  if (preChecks.errorNoJavaJDK() || preChecks.errorNonJavaPath()) {
    return;
  }

  console.info('Starting force client, please wait ...');
  gradleUtils.runTask('build');
};
