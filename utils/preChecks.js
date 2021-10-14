/**
 * @fileoverview Minecraft Forge Utils - Pre-checks lib
 * @license Apache-2.0
 * @author Markus@Bordihn.de (Markus Bordihn)
 */

const chalk = require('chalk');
const fs = require('fs');
const { spawnSync } = require('child_process');

const defaultPath = require('../utils/path.js');

/**
 * @return {boolean}
 */
exports.errorNonJavaPath = () => {
  if (!fs.existsSync(defaultPath.javaPath)) {
    console.error(chalk.red('Unable to find src/main/java folder!'));
    console.info(
      '\nTip: Use "npx minecraft-forge-utils new" to start a new project.\n'
    );
    return true;
  }
  return false;
};

/**
 * @return {boolean}
 */
exports.errorExistingJavaPath = () => {
  if (fs.existsSync(defaultPath.javaPath)) {
    console.error(chalk.red('Found existing src/main/java folder!'));
    return true;
  }
  return false;
};

/**
 * @return {boolean}
 */
exports.errorNoJavaJDK = () => {
  const versionString = spawnSync('java', ['-version']).stderr.toString() || '';
  if (!versionString.toLocaleLowerCase().includes('jdk ')) {
    if (versionString) {
      console.error(
        chalk.red('Found Java JRE installation instead of Java JDK!')
      );
      console.info(
        '\nTip: Remove Java JRE and install Java JDK like https://www.oracle.com/java/technologies/downloads/.\n'
      );
    } else {
      console.error(chalk.red('Unable to find any Java installation!'));
      console.info(
        '\nTip: Install Java JDK like https://www.oracle.com/java/technologies/downloads/.\n'
      );
    }
    return true;
  }
  return false;
};

/**
 * @return {boolean}
 */
exports.warnNonProjectConfig = () => {
  if (
    !fs.existsSync(defaultPath.configPath) ||
    !fs.existsSync(defaultPath.configFile)
  ) {
    console.warn(
      chalk.yellow(
        'Unable to find any project configuration file under',
        defaultPath.configPath,
        '!'
      )
    );
    console.log(
      'This is no error, but means that you need to enter more information manually.'
    );
    console.info(
      '\nTip: Use "npx minecraft-forge-utils new" to start a new project.\n'
    );
    return true;
  }
  return false;
};
