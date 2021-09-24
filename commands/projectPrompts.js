/**
 * @fileoverview Minecraft Forge Utils - project command prompts
 *
 * @license Copyright 2021 Markus Bordihn
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @author Markus@Bordihn.de (Markus Bordihn)
 */

const { Form, Select } = require('enquirer');

const possibleNamespacePrefix =
  (
    process.env.LC_ALL ||
    process.env.LC_MESSAGES ||
    process.env.LANG ||
    process.env.LANGUAGE ||
    ''
  ).substring(0, 2) || 'net';

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
      initial: process.env.USER || require('os').userInfo().username || '',
    },
    {
      name: 'name',
      message: 'Project Name',
      initial:
        process.env.npm_package_config_project_name ||
        process.env.npm_package_name ||
        'New cool mod',
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
      initial: 'MIT',
    },
    {
      name: 'description',
      message: 'description',
      initial: 'This is my first Minecraft Forge Mod',
    },
    {
      name: 'className',
      message: 'Class Name',
      initial: 'MyFirstMod',
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
      initial: 'net.mynamespace.modname',
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
      initial: '',
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
