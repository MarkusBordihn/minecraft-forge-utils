/**
 * @fileoverview Minecraft Forge Utils - Create command
 * @license Apache-2.0
 * @author Markus@Bordihn.de (Markus Bordihn)
 */

const create = require('../utils/create.js');
const prompts = require('./createPrompts.js');

const createFiles = (type, name) => {
  // If no name was provided start interactive questions.
  if (!name) {
    switch (type) {
      case 'color':
        prompts.createColorFiles
          .run()
          .then((answers) => createFiles(type, answers.file_name))
          .catch(console.error);
        break;
      case 'wood':
        prompts.createWoodFiles
          .run()
          .then((answers) => createFiles(type, answers.file_name))
          .catch(console.error);
        break;
    }
    return;
  }

  switch (type) {
    case 'color':
      create.createColorFiles(name);
      break;
    case 'wood':
      create.createWoodFiles(name);
      break;
  }
};

exports.createFiles = createFiles;
