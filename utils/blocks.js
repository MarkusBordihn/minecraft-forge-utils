/**
 * @fileoverview Minecraft Forge Utils - Blocks lib
 * @license Apache-2.0
 * @author Markus@Bordihn.de (Markus Bordihn)
 */

const path = require('path');
const {
  configurationUtils,
  defaultConfig,
  templateUtils,
} = require('minecraft-utils-shared');

// Project related settings
const projectConfig = configurationUtils.loadProjectConfig();
const templatesPath = projectConfig.forge.templatesPath;

/**
 * @param {String} name
 * @param {Object} blockOptions
 */
const createBlock = (name, blockOptions = {}) => {
  // Normalized options
  const options = defaultConfig.block.normalize(blockOptions, name);

  switch (options.type) {
    case defaultConfig.block.type.CUSTOM:
      createCustomBlock(options);
      break;
    case defaultConfig.block.type.SIMPLE:
      createSimpleBlock(options);
      break;
    case defaultConfig.block.type.ORE:
      createOreBlock(options);
      break;
  }

  // Store block configuration, if needed
  configurationUtils.saveDefaultConfig(`block_${options.id}.mbu`, options);
};

/**
 * @param {object} options
 */
const createCustomBlock = (options) => {
  templateUtils.processTemplateFile(
    path.join(templatesPath, 'java', 'block', 'CustomBlock.java'),
    { ...options.placeholder, ...projectConfig.placeholder },
    projectConfig.forge.classPath
  );
  templateUtils.processTemplateFile(
    path.join(
      templatesPath,
      'resources',
      'models',
      'block',
      'CustomBlock.json'
    ),
    { ...options.placeholder, ...projectConfig.placeholder },
    projectConfig.forge.assetsPath
  );
};

/**
 * @param {object} options
 */
const createSimpleBlock = (options) => {
  templateUtils.processTemplateFile(
    path.join(templatesPath, 'java', 'block', 'SimpleBlock.java'),
    { ...options.placeholder, ...projectConfig.placeholder },
    projectConfig.forge.classPath
  );
  templateUtils.processTemplateFile(
    path.join(
      templatesPath,
      'resources',
      'models',
      'block',
      'SimpleBlock.json'
    ),
    { ...options.placeholder, ...projectConfig.placeholder },
    projectConfig.forge.assetsPath
  );
};

/**
 * @param {object} options
 */
const createOreBlock = (options) => {
  templateUtils.processTemplateFile(
    path.join(templatesPath, 'java', 'block', 'OreBlock.java'),
    { ...options.placeholder, ...projectConfig.placeholder },
    projectConfig.forge.classPath
  );
  templateUtils.processTemplateFile(
    path.join(templatesPath, 'resources', 'models', 'block', 'OreBlock.json'),
    { ...options.placeholder, ...projectConfig.placeholder },
    projectConfig.forge.assetsPath
  );
};

exports.createBlock = createBlock;
