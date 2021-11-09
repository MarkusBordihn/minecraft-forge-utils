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
    case defaultConfig.block.type.ROD:
      createRodBlock(options);
      break;
  }

  // Store block configuration, if needed
  configurationUtils.saveDefaultConfig(`block_${options.id}.mbu`, options);
};

/**
 * @param {object} options
 */
const createCustomBlock = (options) => {
  const templateOptions = {
    ...options.placeholder,
    ...projectConfig.placeholder,
  };
  templateUtils.processTemplateFile(
    path.join(templatesPath, 'java', 'block', 'CustomBlock.java'),
    templateOptions,
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
    templateOptions,
    projectConfig.forge.assetsPath
  );
};

/**
 * @param {object} options
 */
const createSimpleBlock = (options) => {
  const templateOptions = {
    ...options.placeholder,
    ...projectConfig.placeholder,
  };
  templateUtils.processTemplateFile(
    path.join(templatesPath, 'java', 'block', 'SimpleBlock.java'),
    templateOptions,
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
    templateOptions,
    projectConfig.forge.assetsPath
  );
};

/**
 * @param {object} options
 */
const createOreBlock = (options) => {
  const templateOptions = {
    ...options.placeholder,
    ...projectConfig.placeholder,
  };
  templateUtils.processTemplateFile(
    path.join(templatesPath, 'java', 'block', 'OreBlock.java'),
    templateOptions,
    projectConfig.forge.classPath
  );
  templateUtils.processTemplateFile(
    path.join(templatesPath, 'resources', 'models', 'block', 'OreBlock.json'),
    templateOptions,
    projectConfig.forge.assetsPath
  );
  templateUtils.processTemplateFile(
    path.join(templatesPath, 'resources', 'data', 'block', 'OreBlock.json'),
    templateOptions,
    projectConfig.forge.dataPath
  );
};

/**
 * @param {object} options
 */
const createRodBlock = (options) => {
  const templateOptions = {
    ...options.placeholder,
    ...projectConfig.placeholder,
  };
  templateUtils.processTemplateFile(
    path.join(templatesPath, 'java', 'block', 'RodBlock.java'),
    templateOptions,
    projectConfig.forge.classPath
  );
  templateUtils.processTemplateFile(
    path.join(templatesPath, 'resources', 'models', 'block', 'RodBlock.json'),
    templateOptions,
    projectConfig.forge.assetsPath
  );
  templateUtils.processTemplateFile(
    path.join(templatesPath, 'resources', 'data', 'block', 'RodBlock.json'),
    templateOptions,
    projectConfig.forge.dataPath
  );
};

exports.createBlock = createBlock;
