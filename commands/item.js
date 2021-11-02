/**
 * @fileoverview Minecraft Forge Utils - Item commands
 * @license Apache-2.0
 * @author Markus@Bordihn.de (Markus Bordihn)
 */

const chalk = require('chalk');
const { configurationUtils } = require('minecraft-utils-shared');

const items = require('../utils/items.js');
const preChecks = require('../utils/preChecks.js');
const prompts = require('./itemPrompts.js');

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

  // If no name was provided start interactive questions.
  if (!name) {
    prompts.newItemType
      .run()
      .then((type) => {
        console.log('🏷️  = placeholder');
        switch (type) {
          case 'armor':
            prompts.newArmorType
              .run()
              .then((armorType) => {
                prompts
                  .newArmorItem(armorType)
                  .run()
                  .then((answers) => add(answers.name, answers))
                  .catch(console.error);
              })
              .catch(console.error);
            break;
          case 'digger':
            prompts.newDiggerItem
              .run()
              .then((answers) => add(answers.name, answers))
              .catch(console.error);
            break;
          case 'food':
            prompts.newFoodItem
              .run()
              .then((answers) => add(answers.name, answers))
              .catch(console.error);
            break;
          case 'fuel':
            prompts.newFuelItem
              .run()
              .then((answers) => add(answers.name, answers))
              .catch(console.error);
            break;
          case 'throwable':
            prompts.newThrowableItem
              .run()
              .then((answers) => add(answers.name, answers))
              .catch(console.error);
            break;
          case 'weapon':
            prompts.newWeaponItem
              .run()
              .then((answers) => add(answers.name, answers))
              .catch(console.error);
            break;
          case 'simple':
            prompts.newSimpleItem
              .run()
              .then((answers) => add(answers.name, answers))
              .catch(console.error);
            break;
          case 'custom':
          default:
            prompts.newCustomItem
              .run()
              .then((answers) => add(answers.name, answers))
              .catch(console.error);
            break;
        }
      })
      .catch(console.error);
    return;
  }

  items.createItem(name, options);

  console.info(
    `\nTip: Use "${chalk.green(
      'npx minecraft-forge-utils run'
    )}" to copy your files and starting Minecraft.\n`
  );
};

exports.add = add;
