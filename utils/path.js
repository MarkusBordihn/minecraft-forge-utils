/**
 * @fileoverview Minecraft Forge Utils - Path lib
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

const path = require('path');

const getWorkingPath = () => {
  return process.cwd();
};

// General path definitions
exports.configPath = path.join(process.cwd(), '.minecraft-forge-utils');
exports.modulePath = path.resolve(__dirname, '..');
exports.workingPath = getWorkingPath();

// Working directories
exports.srcPath = path.join(process.cwd(), 'src');
exports.mainPath = path.join(process.cwd(), 'src', 'main');
exports.javaPath = path.join(process.cwd(), 'src', 'main', 'java');
exports.resourcePath = path.join(process.cwd(), 'src', 'main', 'resources');

// Assets and Third Party Paths
exports.assetsPath = path.join(exports.modulePath, 'assets');
exports.assetsInitPath = path.join(exports.modulePath, 'assets', 'init');
exports.thirdPartyPath = path.join(exports.modulePath, 'third_party');
