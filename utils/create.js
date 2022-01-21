/**
 * @fileoverview Minecraft Forge Utils - Blocks lib
 * @license Apache-2.0
 * @author Markus@Bordihn.de (Markus Bordihn)
 */

const chalk = require('chalk');
const fs = require('fs-extra');

const woodNames = [
  'Oak',
  'Spruce',
  'Birch',
  'Jungle',
  'Acacia',
  'Dark Oak',
  'Crimson',
  'Warped',
];

const createWoodFiles = (name) => {
  const isUpperCase = name.charAt(0) === name.charAt(0).toUpperCase();
  console.log(
    'Create wood placeholder files with for ',
    name,
    'with upper-case:',
    isUpperCase
  );
  woodNames.forEach((woodName) => {
    const fileName = isUpperCase
      ? `${woodName.replace(' ', '')}${name}`
      : `${woodName.replace(' ', '_').toLocaleLowerCase()}_${name}`;
    if (fs.existsSync(fileName)) {
      console.info(chalk.red('[Skipping]'), fileName, 'already exists.');
    } else {
      console.info(chalk.green('[Create Wood File]'), fileName);
      fs.ensureFileSync(fileName);
    }
  });
};

exports.createWoodFiles = createWoodFiles;
