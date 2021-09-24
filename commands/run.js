/**
 * @fileoverview Minecraft Forge Utils - Launch command
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

const chalk = require('chalk');
const fs = require('fs');

const defaultPath = require('../utils/path.js');
const gradle = require('../utils/gradle.js');

exports.runClient = () => {
  if (!fs.existsSync(defaultPath.javaPath)) {
    console.error(chalk.red('Unable to find src/main/java folder!'));
    console.info(
      '\nTip: Use "npx minecraft-forge-utils new" to start a new project.\n'
    );
  }

  console.info('Starting force client, please wait ...');
  gradle.runTask('runClient');
};
