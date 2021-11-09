/**
 * @fileoverview Minecraft Forge Utils - Items lib
 * @license Apache-2.0
 * @author Markus@Bordihn.de (Markus Bordihn)
 */

const path = require('path');
const {
  configurationUtils,
  defaultConfig,
  defaultPath,
  templateUtils,
  fileUtils,
} = require('minecraft-utils-shared');

// Project related settings
const projectConfig = configurationUtils.loadProjectConfig();
const templatesPath = projectConfig.forge.templatesPath;

/**
 * @param {String} name
 * @param {Object} itemOptions
 */
const createItem = (name, itemOptions = {}) => {
  // Normalized options
  const options = defaultConfig.item.normalize(itemOptions, name);

  if (!options.forge.className) {
    console.error('Seems missing some important information!', options);
    return;
  }

  switch (options.type) {
    case defaultConfig.item.type.SIMPLE:
      createSimpleItem(options);
      break;
    case defaultConfig.item.type.CUSTOM:
      createCustomItem(options);
      break;
    case defaultConfig.item.type.TEMPLATE:
      createTemplateItem(options);
      break;
  }

  // Store item configuration, if needed
  configurationUtils.saveDefaultConfig(`item_${options.id}.mbu`, options);
};

/**
 * @param {object} options
 */
const createSimpleItem = (options) => {
  templateUtils.processTemplateFile(
    path.join(templatesPath, 'java', 'item', 'SimpleItem.java'),
    { ...options.placeholder, ...projectConfig.placeholder },
    projectConfig.forge.classPath
  );
  templateUtils.processTemplateFile(
    path.join(templatesPath, 'resources', 'models', 'item', 'SimpleItem.json'),
    { ...options.placeholder, ...projectConfig.placeholder },
    projectConfig.forge.assetsPath
  );
};

/**
 * @param {object} options
 */
const createCustomItem = (options) => {
  fileUtils.createFileIfNotExists(
    defaultPath.forge.itemPath,
    `${options.forge.className}.java`
  );
};

/**
 * @param {string} template
 * @param {object} options
 */
const createTemplateItem = (options) => {
  const placeholders = { ...options.placeholder, ...projectConfig.placeholder };
  const targetPaths = {
    assetsPath: projectConfig.forge.assetsPath,
    classPath: projectConfig.forge.classPath,
    dataPath: projectConfig.forge.dataPath,
  };
  templateUtils.processTemplateFile(
    options.template,
    placeholders,
    targetPaths
  );
};

exports.createItem = createItem;
