/**
 * @fileoverview Minecraft Forge Utils - Project lib
 * @license Apache-2.0
 * @author Markus@Bordihn.de (Markus Bordihn)
 */

const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const {
  configurationUtils,
  defaultConfig,
  defaultPath,
  fileUtils,
} = require('minecraft-utils-shared');

const projectTemplatePath = path.join(
  path.resolve(__dirname, '..'),
  'third_party'
);

const newProjectTemplate = (
  name,
  projectOptions = defaultConfig.project.config
) => {
  console.log('Creating new project template for', name);

  // Normalized options
  const options = defaultConfig.project.normalize(
    projectOptions,
    name,
    defaultConfig.project.gameType.FORGE
  );

  // Prepare template files based on the minEngineVersion, if needed.
  if (!options.forge.templatePath) {
    options.forge.templatePath = path.join(
      projectTemplatePath,
      getProjectTemplate(options.minEngineVersion)
    );
    options.forge.templatesPath = path.join(
      options.forge.templatePath,
      'templates'
    );
  }
  if (!options.forge.templatePath) {
    console.error('Unsupported version', options.minEngineVersion, '!');
    return;
  } else if (!fs.existsSync(options.forge.templatePath)) {
    console.error(
      chalk.red('Template Path', options.forge.templatePath, 'does not exists!')
    );
    return;
  }
  console.log(
    'Using template',
    options.forge.templatePath,
    'for project',
    defaultPath.project.path
  );

  copyProjectTemplateFiles(
    path.join(options.forge.templatePath),
    defaultPath.project.path
  );

  // Prepare Source Code
  prepareProjectTemplate(defaultPath.project.path, options);

  // Replace Template placeholder
  replaceProjectTemplatePlaceholder(defaultPath.project.path, options);

  // Store project configuration
  configurationUtils.saveProjectConfig(options);
};

const copyProjectTemplateFiles = (template, target) => {
  // Copy VS Code relevant files
  fileUtils.copyFolderIfNotExists(
    path.join(template, '.vscode'),
    path.join(target, '.vscode')
  );
  fileUtils.copyFileIfNotExists(
    path.join(template, 'java-google-style.xml'),
    path.join(target, 'java-google-style.xml')
  );

  // Copy git / Github relevant files
  fileUtils.copyFolderIfNotExists(
    path.join(template, '.github'),
    path.join(target, '.github')
  );
  fileUtils.copyFileIfNotExists(
    path.join(template, '.gitattributes'),
    path.join(target, '.gitattributes')
  );
  fileUtils.copyFileIfNotExists(
    path.join(template, '.gitignore'),
    path.join(target, '.gitignore')
  );

  // Copy Gradle relevant files
  fileUtils.copyFolderIfNotExists(
    path.join(template, 'build.gradle'),
    path.join(target, 'build.gradle')
  );
  fileUtils.copyFolderIfNotExists(
    path.join(template, 'gradle'),
    path.join(target, 'gradle')
  );
  fileUtils.copyFileIfNotExists(
    path.join(template, 'gradle.properties'),
    path.join(target, 'gradle.properties')
  );
  fileUtils.copyFileIfNotExists(
    path.join(template, 'gradlew'),
    path.join(target, 'gradlew')
  );
  fileUtils.copyFileIfNotExists(
    path.join(template, 'gradlew.bat'),
    path.join(target, 'gradlew.bat')
  );

  // Copy Source files
  fileUtils.copyFolderIfNotExists(
    path.join(template, 'src'),
    path.join(target, 'src')
  );
};

const prepareProjectTemplate = (target, options) => {
  // Create mod folder
  fileUtils.createFolderIfNotExists(options.forge.classPath);

  // Rename template main class files
  const templateDir = path.join(
    defaultPath.project.path,
    'src',
    'main',
    'java',
    '__mod_namespace__'
  );
  fileUtils.renameFileIfExists(
    path.join(templateDir, '__mod_class_name__.java'),
    path.join(templateDir, `${options.forge.className}.java`)
  );
  fileUtils.renameFileIfExists(templateDir, options.forge.classPath, true);

  // Create assets folder
  fileUtils.createFolderIfNotExists(options.forge.assetsPath);
};

const replaceProjectTemplatePlaceholder = (target, options) => {
  // build.gradle
  const buildFile = path.join(target, 'build.gradle');
  fileUtils.setPlaceholder(buildFile, 'ModId', options.id);

  // gradle.properties files
  const gradleFile = path.join(target, 'gradle.properties');
  fileUtils.setPlaceholder(gradleFile, 'Author', options.author);
  fileUtils.setPlaceholder(gradleFile, 'ModNamespace', options.forge.namespace);
  fileUtils.setPlaceholder(gradleFile, 'ModId', options.id);
  fileUtils.setPlaceholder(gradleFile, 'ModName', options.name);
  fileUtils.setPlaceholder(gradleFile, 'VendorName', options.forge.vendorName);

  // Resources files
  const resourceFiles = path.join(target, 'src', 'main', 'resources', '**');
  fileUtils.setPlaceholder(resourceFiles, 'Author', options.author);
  fileUtils.setPlaceholder(
    resourceFiles,
    'ModDescription',
    options.forge.description
  );
  fileUtils.setPlaceholder(resourceFiles, 'ModId', options.id);
  fileUtils.setPlaceholder(resourceFiles, 'ModLicense', options.license);
  fileUtils.setPlaceholder(resourceFiles, 'ModName', options.name);

  // Source files
  const sourceFiles = path.join(target, 'src', 'main', 'java', '**', '*.java');
  fileUtils.setPlaceholder(
    sourceFiles,
    'ModClassName',
    options.forge.className
  );
  fileUtils.setPlaceholder(sourceFiles, 'ModId', options.id);
  fileUtils.setPlaceholder(sourceFiles, 'ModName', options.name);
  fileUtils.setPlaceholder(
    sourceFiles,
    'packageNamespace',
    options.forge.namespace
  );
};

/**
 * @param {string} version
 * @returns {string}
 */
const getProjectTemplate = (version) => {
  const prefix = 'minecraft-forge-template-';
  switch (version) {
    case '1.16.5':
    case '1.17.1':
      return `${prefix}${version}`;
    default:
      return '';
  }
};

exports.getProjectTemplate = getProjectTemplate;
exports.newProjectTemplate = newProjectTemplate;
