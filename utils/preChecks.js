/**
 * @fileoverview Minecraft Forge Utils - Pre-checks lib
 * @license Apache-2.0
 * @author Markus@Bordihn.de (Markus Bordihn)
 */

const chalk = require('chalk');
const fs = require('fs');
const { spawnSync } = require('child_process');

const { defaultPath } = require('minecraft-utils-shared');

/**
 * @return {boolean}
 */
exports.errorNonJavaPath = () => {
  if (!fs.existsSync(defaultPath.forge.javaPath)) {
    console.error(
      chalk.red(
        'Unable to find src/main/java folder at',
        defaultPath.forge.javaPath
      )
    );
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
  if (fs.existsSync(defaultPath.forge.javaPath)) {
    console.error(
      chalk.red(
        'Found existing src/main/java folder under',
        defaultPath.forge.javaPath
      )
    );
    return true;
  }
  return false;
};

/**
 * @return {boolean}
 */
exports.errorNoJavaJDK = () => {
  const javaVersion = spawnSync('java', ['-version']).stderr.toString() || '';
  const javaJDKCheck =
    spawnSync('javac', ['-version'], { shell: true }).stdout.toString() || '';
  if (!javaJDKCheck) {
    if (javaVersion && !javaVersion.toLocaleLowerCase().includes('jdk ')) {
      const javaVersionString = javaVersion.split('\n')[0].trim();
      console.error(
        chalk.red(
          `Found Java JRE installation ${javaVersionString} instead of Java JDK!`
        )
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
  if (javaJDKCheck.includes(' 17.')) {
    console.warn(chalk.yellow('Found unsupported Java Version >= 17.x !'));
  }
  return false;
};

/**
 * @return {boolean}
 */
exports.warnNonProjectConfig = () => {
  if (
    !fs.existsSync(defaultPath.project.config) ||
    !fs.existsSync(defaultPath.project.path)
  ) {
    console.warn(
      chalk.yellow(
        'Unable to find any project configuration file under',
        defaultPath.config.path,
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
