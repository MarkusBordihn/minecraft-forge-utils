/**
 * @fileoverview Minecraft Forge Utils - File lib
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
const fs = require('fs-extra');
const glob = require('glob');
const path = require('path');

/**
 * @param {String} source
 * @param {String} target
 */
exports.copyFileIfNotExists = (source, target) => {
  if (fs.existsSync(source) && !fs.existsSync(target)) {
    fs.copyFileSync(source, target);
  }
};

/**
 * @param {String} source
 * @param {String} target
 */
exports.copyFolderIfNotExists = (source, target) => {
  if (fs.existsSync(source) && !fs.existsSync(target)) {
    fs.copySync(source, target);
  }
};

/**
 * @param {String} source
 * @param {String} target
 */
exports.createBackupFile = (source, target) => {
  if (fs.existsSync(source)) {
    if (!target || source == target) {
      fs.copyFileSync(source, `${source}.bak`);
    } else {
      fs.copyFileSync(source, target);
    }
  }
};

/**
 * @param {String} folderPath
 * @param {String} name
 * @param {String} content
 */
exports.createFileIfNotExists = (folderPath, name, content = '') => {
  const pathName = name ? path.join(folderPath, name) : folderPath;
  if (!fs.existsSync(pathName)) {
    fs.writeFileSync(pathName, content, (error) => {
      if (error) {
        return console.error(
          chalk.red('Error creating new file', pathName, ':', error)
        );
      }
    });
  }
};

/**
 * @param {String} folderPath
 * @param {String} name
 */
exports.createFolderIfNotExists = (folderPath, name) => {
  const pathName = name ? path.join(folderPath, name) : folderPath;
  if (!fs.existsSync(pathName)) {
    fs.mkdir(pathName, { recursive: true }, (error) => {
      if (error) {
        return console.error(
          chalk.red('Error creating new folder', pathName, ':', error)
        );
      }
    });
  }
};

/**
 * @param {String} name
 * @return {String}
 */
exports.normalizeFileName = (name = '') => {
  return name
    .replace(/\s+/g, '_')
    .replace(':', '__')
    .replace(/[^a-zA-Z0-9_.-]/g, '');
};

/**
 * @param {String} pattern
 * @param {String} from
 * @param {String} to
 * @return {Array}
 */
exports.replaceInFiles = (pattern, from, to) => {
  const relevantFiles = [];
  const result = [];
  glob
    .sync(pattern, {
      nodir: true,
    })
    .map((file) => {
      relevantFiles.push(path.resolve(file));
    });
  if (relevantFiles.length <= 0) {
    return result;
  }
  for (const file of relevantFiles || []) {
    const content = fs.readFileSync(file, 'utf-8');
    if (content && content.includes(from)) {
      // Use split and join to replace all findings.
      fs.writeFileSync(file, content.split(from).join(to), (error) => {
        if (error) {
          return console.error(
            chalk.red('Error replacing content for', file, ':', error)
          );
        }
      });
      result.push(file);
    }
  }
  return result;
};

/**
 * @param {string} oldPath
 * @param {string} newPath
 * @param {boolean} overwrite
 */
exports.renameFileIfExists = (oldPath, newPath, overwrite = false) => {
  if (fs.existsSync(oldPath)) {
    fs.moveSync(oldPath, newPath, { overwrite: overwrite });
  }
};

/**
 * @param {string} pattern
 * @param {string} name
 * @param {string} to
 */
exports.setPlaceholder = (pattern, name, to) => {
  exports.replaceInFiles(pattern, `[[ --${name}-- ]]`, to);
};