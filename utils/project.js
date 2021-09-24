/**
 * @fileoverview Minecraft Forge Utils - Project lib
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

const execa = require('execa');
const path = require('path');

const configuration = require('./configuration.js');
const defaultPath = require('./path.js');
const files = require('./files.js');

const newProjectTemplate = (name, options = {}) => {
  console.log('Creating new project template for', name);

  // Autocomplete Options if needed
  if (!options.name) {
    options.name = name;
  }
  if (!options.classPath) {
    options.classPath = path.join(
      defaultPath.workingPath,
      'src',
      'main',
      'java',
      ...options.namespace.split('.')
    );
  }
  if (!options.assetsPath) {
    options.assetsPath = path.join(
      defaultPath.workingPath,
      'src',
      'main',
      'resources',
      'assets',
      options.id
    );
  }

  // Prepare template files based on the minEngineVersion, if needed.
  if (!options.templatePath) {
    options.templatePath = path.join(
      defaultPath.thirdPartyPath,
      getProjectTemplate(options.minEngineVersion)
    );
  }
  if (!options.templatePath) {
    console.error('Unsupported version', options.minEngineVersion, '!');
    return;
  }
  console.log('Using template', options.templatePath, 'for project ...');
  copyProjectTemplateFiles(
    path.join(options.templatePath),
    defaultPath.workingPath
  );

  // Prepare Source Code
  prepareProjectTemplate(defaultPath.workingPath, options);

  // Replace Template placeholder
  replaceProjectTemplatePlaceholder(defaultPath.workingPath, options);

  // Store configuration
  configuration.saveDefaultConfig(`project.mfu`, options);
};

const runGradleSetup = () => {
  console.info('Running gradle setup, please wait ...');
  try {
    execa('gradlew').stdout.pipe(process.stdout);
  } catch (error) {
    console.error(('Unable to run ./gradlew:', error));
    return;
  }
};

const copyProjectTemplateFiles = (template, target) => {
  // Copy VS Code relevant files
  files.copyFolderIfNotExists(
    path.join(template, '.vscode'),
    path.join(target, '.vscode')
  );
  files.copyFileIfNotExists(
    path.join(template, 'java-google-style.xml'),
    path.join(target, 'java-google-style.xml')
  );

  // Copy git / Github relevant files
  files.copyFolderIfNotExists(
    path.join(template, '.github'),
    path.join(target, '.github')
  );
  files.copyFileIfNotExists(
    path.join(template, '.gitattributes'),
    path.join(target, '.gitattributes')
  );
  files.copyFileIfNotExists(
    path.join(template, '.gitignore'),
    path.join(target, '.gitignore')
  );

  // Copy Gradle relevant files
  files.copyFolderIfNotExists(
    path.join(template, 'build.gradle'),
    path.join(target, 'build.gradle')
  );
  files.copyFolderIfNotExists(
    path.join(template, 'gradle'),
    path.join(target, 'gradle')
  );
  files.copyFileIfNotExists(
    path.join(template, 'gradle.properties'),
    path.join(target, 'gradle.properties')
  );
  files.copyFileIfNotExists(
    path.join(template, 'gradlew'),
    path.join(target, 'gradlew')
  );
  files.copyFileIfNotExists(
    path.join(template, 'gradlew.bat'),
    path.join(target, 'gradlew.bat')
  );

  // Copy Source files
  files.copyFolderIfNotExists(
    path.join(template, 'src'),
    path.join(target, 'src')
  );
};

const prepareProjectTemplate = (target, options) => {
  // Create mod folder
  files.createFolderIfNotExists(path.join(options.classPath));

  // Rename template main class files
  const templateDir = path.join(
    defaultPath.workingPath,
    'src',
    'main',
    'java',
    '__mod_namespace__'
  );
  files.renameFileIfExists(
    path.join(templateDir, '__mod_class_name__.java'),
    path.join(templateDir, `${options.className}.java`)
  );
  files.renameFileIfExists(templateDir, options.classPath, true);

  // Create assets folder
  files.createFolderIfNotExists(options.assetsPath);
};

const replaceProjectTemplatePlaceholder = (target, options) => {
  // build.gradle
  const buildFile = path.join(target, 'build.gradle');
  files.setPlaceholder(buildFile, 'Mod Id', options.id);

  // gradle.properties files
  const gradleFile = path.join(target, 'gradle.properties');
  files.setPlaceholder(gradleFile, 'Author', options.author);
  files.setPlaceholder(gradleFile, 'Mod Namespace', options.namespace);
  files.setPlaceholder(gradleFile, 'Mod Id', options.id);
  files.setPlaceholder(gradleFile, 'Mod Name', options.name);
  files.setPlaceholder(gradleFile, 'Vendor Name', options.vendorName);

  // Resources files
  const resourceFiles = path.join(target, 'src', 'main', 'resources', '**');
  files.setPlaceholder(resourceFiles, 'Author', options.author);
  files.setPlaceholder(resourceFiles, 'Mod Description', options.description);
  files.setPlaceholder(resourceFiles, 'Mod Id', options.id);
  files.setPlaceholder(resourceFiles, 'Mod License', options.license);
  files.setPlaceholder(resourceFiles, 'Mod Name', options.name);

  // Source files
  const sourceFiles = path.join(target, 'src', 'main', 'java', '**', '*.java');
  files.setPlaceholder(sourceFiles, 'Mod ClassName', options.className);
  files.setPlaceholder(sourceFiles, 'Mod Id', options.id);
  files.setPlaceholder(sourceFiles, 'Mod Name', options.name);
  files.setPlaceholder(sourceFiles, 'Mod Namespace', options.namespace);
};

const getProjectTemplate = (version) => {
  const prefix = 'minecraft-forge-template-';
  switch (version) {
    case '1.16.5':
      return `${prefix}1.16.5`;
  }
  return '';
};

exports.getProjectTemplate = getProjectTemplate;
exports.newProjectTemplate = newProjectTemplate;
exports.runGradleSetup = runGradleSetup;
