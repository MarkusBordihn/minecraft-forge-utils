/**
 * @fileoverview Minecraft Forge Utils - Blocks lib
 * @license Apache-2.0
 * @author Markus@Bordihn.de (Markus Bordihn)
 */

const chalk = require('chalk');
const fs = require('fs-extra');

const colorNames = [
  'Black',
  'Blue',
  'Brown',
  'Cyan',
  'Gray',
  'Green',
  'Light Blue',
  'Light Gray',
  'Lime',
  'Magenta',
  'Orange',
  'Pink',
  'Purple',
  'Red',
  'White',
  'Yellow',
];

const woodNames = [
  'Acacia',
  'Birch',
  'Crimson',
  'Dark Oak',
  'Jungle',
  'Oak',
  'Spruce',
  'Warped',
];

const createColorFiles = (name) => {
  const isUpperCase = name.charAt(0) === name.charAt(0).toUpperCase();
  const fileExtension = name.includes('.') ? '.' + name.split('.')[1] : '';
  if (fileExtension) {
    name = name.replace(fileExtension, '');
  }
  console.log(
    'Create color placeholder files with for ',
    name,
    'with upper-case:',
    isUpperCase
  );
  colorNames.forEach((colorName) => {
    const fileName = isUpperCase
      ? `${name}${colorName.replace(' ', '')}${fileExtension}`
      : `${name}_${colorName
          .replace(' ', '_')
          .toLocaleLowerCase()}${fileExtension}`;
    if (fs.existsSync(fileName)) {
      console.info(chalk.red('[Skipping]'), fileName, 'already exists.');
    } else {
      console.info(chalk.green('[Create Color File]'), fileName);
      fs.ensureFileSync(fileName);
    }
  });
};

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

exports.createColorFiles = createColorFiles;
exports.createWoodFiles = createWoodFiles;
