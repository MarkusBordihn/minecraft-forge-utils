/**
 * @file Minecraft Forge Utils - Block command prompts
 * @license Apache-2.0
 * @author Markus@Bordihn.de (Markus Bordihn)
 */

const { Form, Select } = require('enquirer');
const {
  configurationUtils,
  defaultConfig,
  normalizeHelper,
  templateUtils,
} = require('minecraft-utils-shared');

const projectConfig = configurationUtils.loadProjectConfig();

/**
 * @param {String} type
 * @return {String}
 */
const getBlockTypeIconForSelection = (type) => {
  return `  ${defaultConfig.block.getBlockTypeIcon(type)}\t`;
};

const newBlockTemplate = (type = 'custom', choices = [], variation = '') => {
  const result = {
    name: type,
    message: `Please provide the following information for the ${type} block ${defaultConfig.block.getBlockTypeIcon(
      type
    )}`,
    choices: [
      {
        name: 'type',
        message: `Block Type`,
        initial: type,
        hidden: true,
      },
      {
        name: 'name',
        message: 'Block Name',
        initial: `New ${type} ${variation ? variation + ' ' : ''}block`,
      },
      {
        name: 'namespace',
        message: 'Namespace',
        initial: projectConfig.id || defaultConfig.item.config.namespace,
      },
      {
        name: 'forge.className',
        message: 'Class Name',
        initial: defaultConfig.item.config.namespace,
        onChoice(state, choice) {
          const { name } = this.values;
          choice.initial = `${normalizeHelper.normalizeClassName(name)}`;
        },
        validate(value) {
          return value == normalizeHelper.normalizeClassName(value);
        },
        result(value) {
          return normalizeHelper.normalizeClassName(value);
        },
        disabled: type == 'simple',
      },
    ],
  };
  if (choices.length > 0) {
    result.choices = result.choices.concat(choices);
  }
  return result;
};

exports.newBlockType = new Select({
  name: 'blockType',
  message: 'Select the block type you want to create',
  choices: [
    {
      name: 'simple',
      message: `${getBlockTypeIconForSelection(
        'simple'
      )} Simple Block (e.g. decoration)`,
    },
    {
      name: 'custom',
      message: `${getBlockTypeIconForSelection(
        'custom'
      )}  Custom block (e.g. custom block)`,
    },
    {
      name: 'ore',
      message: `${getBlockTypeIconForSelection(
        'ore'
      )} Ore Block (e.g. iron ore, ...)`,
    },
    {
      name: 'rod',
      message: `${getBlockTypeIconForSelection(
        'rod'
      )} Rod Block (e.g. end rod, ...)`,
    },
    {
      name: 'template',
      message: `${getBlockTypeIconForSelection(
        'template'
      )} Item based on template file in .minecraft-forge-utils-template folder`,
      disabled: !templateUtils.hasCustomTemplateFiles(),
    },
  ],
});

exports.newOreBlock = new Form(newBlockTemplate('ore'));

exports.newRodBlock = new Form(newBlockTemplate('rod'));

exports.newSimpleBlock = new Form(
  newBlockTemplate('simple', [
    {
      name: 'attributes.soundType',
      message: 'Sound Type',
      initial: 'SoundType.METAL',
    },
  ])
);

exports.newCustomBlock = new Form(newBlockTemplate('custom'));

exports.newTemplateItem = (template) => {
  const templateItemSelection = [
    {
      name: 'template',
      message: 'Template File',
      initial: template,
      hidden: true,
    },
  ];
  return new Form(newBlockTemplate('template', templateItemSelection));
};
