/**
 * @fileoverview Minecraft Forge Utils - Block commands
 * @license Apache-2.0
 * @author Markus@Bordihn.de (Markus Bordihn)
 */

const chalk = require('chalk');
const fs = require('fs-extra');
const { configurationUtils } = require('minecraft-utils-shared');

const blocks = require('../utils/blocks.js');
const preChecks = require('../utils/preChecks.js');
const prompts = require('./blockPrompts.js');

/**
 * @param {String} name
 * @param {Object} options
 */
const add = (name, options = {}) => {
  // Only add items if we found any existing projects.
  if (preChecks.errorNonJavaPath()) {
    return;
  }

  // Load options from config file for automated creation and tests.
  if (name && name.endsWith('.mfu')) {
    options = configurationUtils.loadConfig(name);
    name = options.name;
  }

  // Handle template files
  if (
    name &&
    (name.endsWith('.template') ||
      name.endsWith('.json') ||
      name.endsWith('.java')) &&
    fs.existsSync(name)
  ) {
    prompts
      .newTemplateItem(name)
      .run()
      .then((answers) => add(answers.name, answers))
      .catch(console.error);
    return;
  }

  // If no name was provided start interactive questions.
  if (!name) {
    prompts.newBlockType
      .run()
      .then((type) => {
        console.log('🏷️  = placeholder');
        switch (type) {
          case 'ore':
            prompts.newOreBlock
              .run()
              .then((answers) => add(answers.name, answers))
              .catch(console.error);
            break;
          case 'simple':
            prompts.newSimpleBlock
              .run()
              .then((answers) => add(answers.name, answers))
              .catch(console.error);
            break;
          case 'rod':
            prompts.newRodBlock
              .run()
              .then((answers) => add(answers.name, answers))
              .catch(console.error);
            break;
          case 'custom':
            prompts.newCustomBlock
              .run()
              .then((answers) => add(answers.name, answers))
              .catch(console.error);
            break;
          default:
            console.warn(
              chalk.red(
                'Unknown block type' + type + ', will use custom instead!'
              )
            );
            prompts.newCustomBlock
              .run()
              .then((answers) => add(answers.name, answers))
              .catch(console.error);
        }
      })
      .catch(console.error);
    return;
  }

  blocks.createBlock(name, options);

  console.info(
    `\nTip: Use "${chalk.green(
      'npx minecraft-forge-utils run'
    )}" to start Minecraft.\n`
  );
};

exports.add = add;
