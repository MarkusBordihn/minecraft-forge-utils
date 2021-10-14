/**
 * @fileoverview Minecraft Forge Utils - Config lib
 * @license Apache-2.0
 * @author Markus@Bordihn.de (Markus Bordihn)
 */

const fs = require('fs');
const path = require('path');

const defaultPath = require('../utils/path.js');
const { fileUtils } = require('minecraft-utils-shared');

const extension = '.mfu';
const configPath = '.minecraft-forge-utils';
const configFile = 'project.mfu';

/**
 * @param {String} file
 * @return {Object}
 */
const loadConfig = (file) => {
  if (!fs.existsSync(file)) {
    console.error('Unable to load configuration file', file);
    return {};
  }

  if (!file.endsWith(extension)) {
    console.warn(
      `File is not ending with ${extension} suffix, but will try to load it!`
    );
  }

  const configurationFile = fs.readFileSync(file);
  return JSON.parse(configurationFile);
};

/**
 * @param {String} name
 * @return {Object}
 */
const loadDefaultConfig = (name) => {
  return loadConfig(
    path.join(defaultPath.configPath, fileUtils.normalizeFileName(name))
  );
};

/**
 * @return {Object}
 */
const loadProjectConfig = () => {
  return loadConfig(defaultPath.configFile);
};

/**
 * @param {String} file
 * @param {Object} options
 */
const saveConfig = (file, options = {}) => {
  // Make sure file has an .mfu extension and remove unsupported chars.
  if (!file.endsWith(extension)) {
    file = `${file}${extension}`;
  }

  if (fs.existsSync(file)) {
    console.log('Overwrite configuration for', options.name, 'in file', file);
    fileUtils.createBackupFile(file);
  } else {
    console.log('Storing configuration for', options.name, 'in file', file);
  }

  // Remove context and other options to avoid a endless loop.
  delete options.context;
  delete options.save_config;

  fs.writeFileSync(file, JSON.stringify(options, null, 2));
};

/**
 * @param {String} name
 * @param {Object} options
 */
const saveDefaultConfig = (name, options = {}) => {
  fileUtils.createFolderIfNotExists(defaultPath.configPath);
  saveConfig(
    path.join(defaultPath.configPath, fileUtils.normalizeFileName(name)),
    options
  );
};

/**
 * @param {Object} options
 */
const saveProjectConfig = (options = {}) => {
  fileUtils.createFolderIfNotExists(defaultPath.configPath);
  saveConfig(defaultPath.configFile, options);
};

exports.configFile = configFile;
exports.configPath = configPath;
exports.loadConfig = loadConfig;
exports.loadDefaultConfig = loadDefaultConfig;
exports.loadProjectConfig = loadProjectConfig;
exports.saveConfig = saveConfig;
exports.saveDefaultConfig = saveDefaultConfig;
exports.saveProjectConfig = saveProjectConfig;
