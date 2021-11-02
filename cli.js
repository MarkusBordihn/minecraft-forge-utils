#!/usr/bin/env node

/**
 * @fileoverview Minecraft Forge Utils - Debug
 * @license Apache-2.0
 * @author Markus@Bordihn.de (Markus Bordihn)
 */

const args = process.argv.slice(2);

const block = require('./commands/block.js');
const debug = require('./commands/debug.js');
const init = require('./commands/init.js');
const item = require('./commands/item.js');
const project = require('./commands/project.js');
const run = require('./commands/run.js');
const usage = require('./usage.js');
const uuid = require('./commands/uuid.js');
const { version } = require('./package.json');

switch (args[0]) {
  case 'add':
    switch (args[1]) {
      case 'item':
        item.add(args[2]);
        break;
      case 'block':
        block.add(args[2]);
        break;
      default:
        usage.showAddUsage();
    }
    break;
  case 'debug':
    debug();
    break;
  case 'init':
    init.newWorkspace();
    break;
  case 'new':
    project.newProject(args[1], args[2]);
    break;
  case 'run':
    run.runClient();
    break;
  case 'uuid':
    console.log(uuid.getUUID(args[1], args[2]));
    break;
  case 'version':
  case '-v':
  case '-version':
    console.log(version);
    break;
  default:
    usage.showUsage();
}
