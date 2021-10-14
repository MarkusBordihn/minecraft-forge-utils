/**
 * @fileoverview Minecraft Forge Utils - Launch command
 * @license Apache-2.0
 * @author Markus@Bordihn.de (Markus Bordihn)
 */

const { gradleUtils } = require('minecraft-utils-shared');

const preChecks = require('../utils/preChecks.js');

exports.runClient = () => {
  if (preChecks.errorNoJavaJDK() || preChecks.errorNonJavaPath()) {
    return;
  }

  console.info('Starting force client, please wait ...');
  gradleUtils.runTask('runClient');
};
