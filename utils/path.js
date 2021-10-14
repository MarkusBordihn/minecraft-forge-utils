/**
 * @fileoverview Minecraft Forge Utils - Path lib
 * @license Apache-2.0
 * @author Markus@Bordihn.de (Markus Bordihn)
 */

const path = require('path');

const configuration = require('./configuration.js');

const getWorkingPath = () => {
  return process.cwd();
};

// General path definitions
exports.configPath = path.join(process.cwd(), configuration.configPath);
exports.configFile = path.join(
  process.cwd(),
  configuration.configPath,
  configuration.configFile
);
exports.modulePath = path.resolve(__dirname, '..');
exports.workingPath = getWorkingPath();

// Working directories
exports.srcPath = path.join(process.cwd(), 'src');
exports.mainPath = path.join(process.cwd(), 'src', 'main');
exports.javaPath = path.join(process.cwd(), 'src', 'main', 'java');
exports.resourcePath = path.join(process.cwd(), 'src', 'main', 'resources');

// Assets and Third Party Paths
exports.assetsPath = path.join(exports.modulePath, 'assets');
exports.assetsInitPath = path.join(exports.modulePath, 'assets', 'init');
exports.thirdPartyPath = path.join(exports.modulePath, 'third_party');
