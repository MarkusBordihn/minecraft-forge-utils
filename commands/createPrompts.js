/**
 * @file Minecraft Forge Utils - Block command prompts
 * @license Apache-2.0
 * @author Markus@Bordihn.de (Markus Bordihn)
 */

const { Form } = require('enquirer');

exports.createWoodFiles = new Form({
  name: 'files',
  message: 'Please provide the file name for the placeholder files for wood:',
  choices: [
    {
      name: 'file_name',
      message: 'Filename',
      initial: '',
    },
  ],
});
