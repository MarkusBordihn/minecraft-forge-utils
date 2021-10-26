/**
 * @fileoverview Minecraft Forge Utils - project command
 * @license Apache-2.0
 * @author Markus@Bordihn.de (Markus Bordihn)
 */

const { configurationUtils, gradleUtils } = require('minecraft-utils-shared');

const preChecks = require('../utils/preChecks.js');
const project = require('../utils/project.js');
const prompts = require('./projectPrompts.js');

/**
 * @param {String} name
 * @param {Object} options
 */
const newProject = (name, options = {}) => {
  // Only create new projects if we don't found any existing projects.
  if (preChecks.errorNoJavaJDK() || preChecks.errorExistingJavaPath()) {
    return;
  }

  // Load options from config file for automated creation and tests.
  if (name && name.endsWith('.mfu')) {
    options = configurationUtils.loadConfig(name);
    name = options.name;
  }

  // If no name was provided start interactive questions.
  if (!name) {
    prompts.newProjectPrompt
      .run()
      .then((gameVersion) => {
        if (!project.getProjectTemplate(gameVersion)) {
          console.warn(
            'Unsupported Version, you need to setup the Mdk manually!'
          );
        }
        prompts.newProject
          .run()
          .then((value) => {
            newProject(value.name, { minEngineVersion: gameVersion, ...value });
          })
          .catch(console.error);
      })
      .catch(console.error);
    return;
  }

  // Set Project details
  console.log(options);

  // Create new Project template based on the given information.
  project.newProjectTemplate(name, options);

  // Run Gradle to init basic project
  if (preChecks.errorNonJavaPath()) {
    return;
  }
  gradleUtils.runTask('');
};

exports.newProject = newProject;
