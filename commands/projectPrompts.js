/**
 * @fileoverview Minecraft Forge Utils - project command prompts
 * @license Apache-2.0
 * @author Markus@Bordihn.de (Markus Bordihn)
 */

const { Form, Select } = require('enquirer');
const {
  defaultConfig,
  translationUtils,
  normalizeHelper,
} = require('minecraft-utils-shared');

const possibleNamespacePrefix =
  translationUtils.language.substring(0, 2).toLocaleLowerCase() || 'net';

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
      message: '1.18',
      value: '1.18',
    },
    {
      message: '1.17.1',
      value: '1.17.1',
    },
    {
      message: '1.16.5',
      value: '1.16.5',
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
      message: 'Project Id',
      initial: defaultConfig.project.config.id,
      onChoice(state, choice) {
        const { name } = this.values;
        choice.initial = `${normalizeHelper.normalizeModId(name)}`;
      },
      validate(value) {
        return value == normalizeHelper.normalizeModId(value);
      },
      result(value) {
        return normalizeHelper.normalizeModId(value);
      },
    },
    {
      name: 'license',
      message: 'License',
      initial: defaultConfig.project.config.license,
    },
    {
      name: 'forge.description',
      message: 'description',
      initial: defaultConfig.project.config.forge.description,
    },
    {
      name: 'forge.className',
      message: 'Class Name',
      initial: defaultConfig.project.config.forge.className,
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
    },
    {
      name: 'forge.namespace',
      message: 'Class Namespace',
      initial: defaultConfig.project.config.forge.namespace,
      onChoice(state, choice) {
        const { author, id } = this.values;
        choice.initial = `${normalizeHelper.normalizeClassNameSpace(
          possibleNamespacePrefix
        )}.${normalizeHelper.normalizeClassNameSpace(
          author
        )}.${normalizeHelper.normalizeClassNameSpace(id || 'new_project')}`;
      },
    },
    {
      name: 'forge.vendorName',
      message: 'Vendor Name',
      initial: defaultConfig.project.config.forge.vendorName,
      onChoice(state, choice) {
        const { author } = this.values;
        choice.initial = `${normalizeHelper.normalizeVendorName(author)}`;
      },
      validate(value) {
        return value == normalizeHelper.normalizeVendorName(value);
      },
      result(value) {
        return normalizeHelper.normalizeVendorName(value);
      },
    },
  ],
});
