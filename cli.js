#!/usr/bin/env node

/**
 * @fileoverview Minecraft Forge Utils - Debug
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

const args = process.argv.slice(2);

const debug = require('./commands/debug.js');
const init = require('./commands/init.js');
const project = require('./commands/project.js');
const run = require('./commands/run.js');
const usage = require('./usage.js');
const uuid = require('./commands/uuid.js');
const { version } = require('./package.json');

switch (args[0]) {
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
