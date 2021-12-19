/**
 * @fileoverview Minecraft Forge Utils - Usage
 * @license Apache-2.0
 * @author Markus@Bordihn.de (Markus Bordihn)
 */

const chalk = require('chalk');

const command = chalk.green('minecraft-forge-utils');
const defaultSpace = '\t\t\t\t';
const defaultSpace2 = '\t\t\t';
const defaultSpace3 = '\t\t';
const defaultSpace4 = '\t';

const mainCommands = `
 ${command} init${defaultSpace}${chalk.grey('prepares workspace')}
 ${command} new${defaultSpace}${chalk.grey(
  'creates a new project (interactive)'
)}
`.substring(1);

const addCommands = `
 ${command} add item${defaultSpace}${chalk.grey('add a new item (interactive)')}
 ${command} add item <name>${defaultSpace2}${chalk.grey(
  'add a new item with the given name'
)}
 ${command} add item <config file>\t\t${chalk.grey(
  'add a new item based on the given config file'
)}
 ${command} add item <template file>\t\t${chalk.grey(
  'add a new item based on the given template file'
)}

 ${command} add block${defaultSpace2}${chalk.grey(
  'add a new block (interactive)'
)}
 ${command} add block <config file>${defaultSpace3}${chalk.grey(
  'add a new block based on the given config file'
)}
 ${command} add block <template file>${defaultSpace4}${chalk.grey(
  'add a new block based on the given template file'
)}
`.substring(1);

const listCommands = `
 ${command} list items${defaultSpace}${chalk.grey(
  'list all items for the current project'
)}
 ${command} list items <path>${defaultSpace2}${chalk.grey(
  'list all items for the specific project'
)}
 ${command} list recipes${defaultSpace}${chalk.grey(
  'list all recipes for the current project'
)}
 ${command} list recipes <path>${defaultSpace2}${chalk.grey(
  'list all recipes for the specific project'
)}
`.substring(1);

const runCommands = `
 ${command} run${defaultSpace}${chalk.grey(
  'starts the forge client with the mod'
)}
`.substring(1);

const packCommands = `
 ${command} pack resourcepack${defaultSpace3}${chalk.grey(
  'Packs and prepares the resource packs for shipping.'
)}
 ${command} pack project${defaultSpace2}${chalk.grey(
  'Packs and prepares the forge mod for shipping.'
)}
`.substring(1);

const miscCommands = `
 ${command} uuid <name> <namespace>${defaultSpace3}${chalk.grey(
  'returns a v5 UUID string for the given name and namespace'
)}
 ${command} uuid <name>${defaultSpace2}${chalk.grey(
  'returns a v5 UUID string for the given name with a default namespace'
)}
 ${command} uuid${defaultSpace}${chalk.grey('returns a v4 UUID string')}
`.substring(1);

const debugCommands = `
 ${command} debug${defaultSpace}${chalk.grey('shows debug information')}
 ${command} version${defaultSpace}${chalk.grey('shows current version number')}
 ${command} test${defaultSpace}${chalk.grey(
  'runs the compiler to test the code'
)}
`.substring(1);

exports.showUsage = () => {
  const usage = `${command} <command>
 
Usage:
 
${mainCommands}
${addCommands}
${runCommands}
${packCommands}
${miscCommands}
${debugCommands}`;
  console.log(usage);
};

exports.showAddUsage = () => {
  const usage = `Please specify the add option.
 
 Usage: add <type>
   
${addCommands}`;
  console.log(usage);
};

exports.showPackUsage = () => {
  const usage = `Please specify the pack option.
 
 Usage: pack <type>
   
${packCommands}`;
  console.log(usage);
};

exports.showListUsage = () => {
  const usage = `Please specify the list option.
 
 Usage: list <type>
   
${listCommands}`;
  console.log(usage);
};
