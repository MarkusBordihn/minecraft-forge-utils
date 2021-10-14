/**
 * @fileoverview Minecraft Forge Utils - Init command
 * @license Apache-2.0
 * @author Markus@Bordihn.de (Markus Bordihn)
 */

const chalk = require('chalk');
const defaultPath = require('../utils/path.js');
const execa = require('execa');
const { fileUtils } = require('minecraft-utils-shared');
const fs = require('fs');
const path = require('path');

const newWorkspace = () => {
  console.log(chalk.green('Preparing workspace ...'));

  // Make sure we have a existing package.json file
  if (!fs.existsSync('package.json')) {
    try {
      execa.commandSync('npm init -y private true');
    } catch (error) {
      console.error(('Unable to create package.json file:', error));
      return;
    }
  }

  // Confirm the file exists before going to the next steps.
  if (!fs.existsSync('package.json')) {
    console.error(chalk.red('Unable to find package.json file, give up!'));
    return;
  }

  // Installing a local copy of the minecraft-forge-utils.
  try {
    execa.commandSync('npm install minecraft-forge-utils');
  } catch (error) {
    chalk.red(
      console.error(
        'Unable to install a local copy of minecraft-forge-utils:',
        error
      )
    );
    return;
  }

  // Add git related files if not exists.
  fileUtils.copyFileIfNotExists(
    path.join(defaultPath.assetsInitPath, '.gitignore'),
    '.gitignore'
  );
  fileUtils.copyFileIfNotExists(
    path.join(defaultPath.assetsInitPath, '.gitattributes'),
    '.gitattributes'
  );

  console.log(chalk.green('Done.'));
  console.info(
    `\nUse "${chalk.green(
      'npx minecraft-forge-utils new'
    )}" to create a new project.\n`
  );
};

exports.newWorkspace = newWorkspace;
