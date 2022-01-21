#!/usr/bin/env node

/**
 * @fileoverview Minecraft Forge Utils - Debug
 * @license Apache-2.0
 * @author Markus@Bordihn.de (Markus Bordihn)
 */

const args = process.argv.slice(2);

const blockCommand = require('./commands/block.js');
const createCommand = require('./commands/create.js');
const debugCommand = require('./commands/debug.js');
const initCommand = require('./commands/init.js');
const itemCommand = require('./commands/item.js');
const packCommand = require('./commands/pack.js');
const projectCommand = require('./commands/project.js');
const runCommand = require('./commands/run.js');
const testCommand = require('./commands/test.js');
const usageCommand = require('./usage.js');
const uuidCommand = require('./commands/uuid.js');
const { version } = require('./package.json');

switch (args[0]) {
  case 'add':
    switch (args[1]) {
      case 'item':
        itemCommand.add(args[2]);
        break;
      case 'block':
        blockCommand.add(args[2]);
        break;
      default:
        usageCommand.showAddUsage();
    }
    break;
  case 'create':
    if (args[2]) {
      switch (args[1]) {
        case 'files':
          createCommand.createFiles(args[2], args[3]);
          break;
        default:
          usageCommand.showCreateUsage();
      }
    } else {
      usageCommand.showCreateUsage();
    }
    break;
  case 'debug':
    debugCommand();
    break;
  case 'init':
    initCommand.newWorkspace();
    break;
  case 'new':
    projectCommand.newProject(args[1], args[2]);
    break;
  case 'pack':
    switch (args[1]) {
      case 'resourcepack':
        packCommand.packResourcePack();
        break;
      case 'project':
        packCommand.packProject();
        break;
      default:
        usageCommand.showPackUsage();
    }
    break;
  case 'run':
    runCommand.runClient();
    break;
  case 'test':
    testCommand.runTest();
    break;
  case 'uuid':
    console.log(uuidCommand.getUUID(args[1], args[2]));
    break;
  case 'version':
  case '-v':
  case '-version':
    console.log(version);
    break;
  default:
    usageCommand.showUsage();
}
