/**
 * @fileoverview Minecraft Forge Utils - project command prompts
 * @license Apache-2.0
 * @author Markus@Bordihn.de (Markus Bordihn)
 */

const { Form, Select } = require('enquirer');
const { defaultConfig, translationUtils } = require('minecraft-utils-shared');

const possibleNamespacePrefix =
  translationUtils.language.substring(0, 2).toLocaleLowerCase() || 'net';

/**
 * @param {String} name
 * @return {String}
 */
const normalizeModId = (name = '') => {
  return name
    .replace(/\s+/g, '')
    .replace(/[_-]+/g, '')
    .replace(/[^a-zA-Z0-9_-]/g, '')
    .toLowerCase();
};

/**
 * @param {String} name
 * @return {String}
 */
const normalizeClassName = (name = '') => {
  return name
    .replace(/(^\w|\s\w)/g, (firstChar) => firstChar.toUpperCase())
    .replace(/\s+/g, '')
    .replace(/[_-]+/g, '')
    .replace(/[^a-zA-Z0-9_-]/g, '');
};

exports.projectTypePrompt = new Form({
  name: 'projectType',
  message: 'Please select the type of your project',
  choices: [
    {
      message: 'Mod',
      value: defaultConfig.project.type.MOD,
    },
    {
      message: 'Resource Pack',
      value: defaultConfig.project.type.RESOURCE_PACK,
      disabled: true,
    },
  ],
});

exports.newProjectPrompt = new Select({
  name: 'minecraftVersion',
  message: 'Please select the Minecraft version for your project',
  choices: [
    {
      message: '1.16.5',
      value: '1.16.5',
    },
    {
      message: '1.17',
      value: '1.17',
      disabled: true,
    },
  ],
});

exports.newProject = new Form({
  name: 'project',
  message: 'Please provide the following information for the project:',
  choices: [
    {
      name: 'author',
      message: 'Author Name',
      initial: defaultConfig.project.config.author,
    },
    {
      name: 'name',
      message: 'Project Name',
      initial: defaultConfig.project.config.name,
    },
    {
      name: 'id',
      message: 'Mod id',
      initial: 'my_first_mod',
      onChoice(state, choice) {
        const { name } = this.values;
        choice.initial = `${normalizeModId(name)}`;
      },
      validate(value) {
        return value == normalizeModId(value);
      },
      result(value) {
        return normalizeModId(value);
      },
    },
    {
      name: 'license',
      message: 'License',
      initial: defaultConfig.project.config.license,
    },
    {
      name: 'description',
      message: 'description',
      initial: defaultConfig.project.config.description,
    },
    {
      name: 'className',
      message: 'Class Name',
      initial: defaultConfig.project.config.className,
      onChoice(state, choice) {
        const { name } = this.values;
        choice.initial = `${normalizeClassName(name)}`;
      },
      validate(value) {
        return value == normalizeClassName(value);
      },
      result(value) {
        return normalizeClassName(value);
      },
    },
    {
      name: 'namespace',
      message: 'Class Namespace',
      initial: defaultConfig.project.config.namespace,
      onChoice(state, choice) {
        const { author, id } = this.values;
        choice.initial = `${possibleNamespacePrefix}.${normalizeModId(
          author
        )}.${id}`;
      },
    },
    {
      name: 'vendorName',
      message: 'Vendor Name',
      initial: defaultConfig.project.config.vendorName,
      onChoice(state, choice) {
        const { author } = this.values;
        choice.initial = `${normalizeModId(author)}`;
      },
      validate(value) {
        return value == normalizeModId(value);
      },
      result(value) {
        return normalizeModId(value);
      },
    },
  ],
});
