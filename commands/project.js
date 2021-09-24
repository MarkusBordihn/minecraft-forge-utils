/**
 * @fileoverview Minecraft Forge Utils - project command
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

const gradle = require('../utils/gradle.js');
const project = require('../utils/project.js');
const prompts = require('./projectPrompts.js');

/**
 * @param {String} name
 * @param {Object} options
 */
const newProject = (name, options = {}) => {
  // Only create new projects if we don't found any existing projects.

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
  gradle.runTask('');
};

exports.newProject = newProject;
