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

// Relative Path converter
const toRelativePath = (folderPath) => {
  if (path.isAbsolute(folderPath)) {
    return path.relative(defaultPath.project.path, folderPath);
  }
  return folderPath;
};

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
    options.forge.templatePath = toRelativePath(
      path.join(
        projectTemplatePath,
        getProjectTemplate(options.minEngineVersion)
      )
    );
    options.forge.templatesPath = toRelativePath(
      path.join(options.forge.templatePath, 'templates')
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

  // Copy project Template
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
  console.log('✔️  Copy project template ...');

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
  fileUtils.copyFolderIfNotExists(
    path.join(template, 'settings.gradle'),
    path.join(target, 'settings.gradle')
  );
  fileUtils.copyFileIfNotExists(
    path.join(template, 'gradlew'),
    path.join(target, 'gradlew')
  );
  fileUtils.copyFileIfNotExists(
    path.join(template, 'gradlew.bat'),
    path.join(target, 'gradlew.bat')
  );

  // Copy Source files (java and resources)
  fileUtils.copyFolderIfNotExists(
    path.join(template, 'src'),
    path.join(target, 'src')
  );
};

const prepareProjectTemplate = (target, options) => {
  console.log('✔️  Prepare project template ...');

  // Create mod folder
  fileUtils.createFolderIfNotExists(options.forge.classPath);

  // Rename java main class files and java folder
  const javaDir = path.join(
    defaultPath.project.path,
    'src',
    'main',
    'java',
    '__mod_namespace__'
  );
  fileUtils.renameFile(
    path.join(javaDir, '__mod_class_name__.java'),
    path.join(javaDir, `${options.forge.className}.java`)
  );
  fileUtils.renameFile(javaDir, options.forge.classPath, true);

  // Rename resource folder
  const resourceDir = path.join(
    defaultPath.project.path,
    'src',
    'main',
    'resources'
  );
  fileUtils.renameFile(
    path.join(resourceDir, 'assets', '__mod_namespace__'),
    options.forge.assetsPath,
    true
  );
  fileUtils.renameFile(
    path.join(resourceDir, 'data', '__mod_namespace__'),
    options.forge.dataPath,
    true
  );
};

const replaceProjectTemplatePlaceholder = (target, options) => {
  console.log('✔️  Replace template placeholder in', target);

  // build.gradle
  console.log('Handle build.gradle file ...');
  fileUtils.setPlaceholder(target, 'build.gradle', 'ModId', options.id);

  // gradle.properties files
  console.log('Handle gradle.properties file ...');
  const gradleFile = 'gradle.properties';
  fileUtils.setPlaceholder(target, gradleFile, 'Author', options.author);
  fileUtils.setPlaceholder(
    target,
    gradleFile,
    'ModNamespace',
    options.forge.namespace
  );
  fileUtils.setPlaceholder(target, gradleFile, 'ModId', options.id);
  fileUtils.setPlaceholder(target, gradleFile, 'ModName', options.name);
  fileUtils.setPlaceholder(
    target,
    gradleFile,
    'VendorName',
    options.forge.vendorName
  );

  // Resources files
  const resourceFiles = path.join(target, 'src', 'main', 'resources');
  console.log('Handle resources files at', resourceFiles);
  fileUtils.setPlaceholder(resourceFiles, '**', 'Author', options.author);
  fileUtils.setPlaceholder(
    resourceFiles,
    '**',
    'ModDescription',
    options.forge.description
  );
  fileUtils.setPlaceholder(resourceFiles, '**', 'ModId', options.id);
  fileUtils.setPlaceholder(resourceFiles, '**', 'ModLicense', options.license);
  fileUtils.setPlaceholder(resourceFiles, '**', 'ModName', options.name);

  // Source files
  const sourceFiles = path.join(target, 'src', 'main', 'java');
  console.log('Handle sources files at', sourceFiles);
  fileUtils.setPlaceholder(
    sourceFiles,
    '**/*.java',
    'ModClassName',
    options.forge.className
  );
  fileUtils.setPlaceholder(sourceFiles, '**/*.java', 'ModId', options.id);
  fileUtils.setPlaceholder(sourceFiles, '**/*.java', 'ModName', options.name);
  fileUtils.setPlaceholder(
    sourceFiles,
    '**/*.java',
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
    case '1.18':
    case '1.18.1':
    case '1.18.2':
    case '1.19.2':
      return `${prefix}${version}`;
    default:
      return '';
  }
};

exports.getProjectTemplate = getProjectTemplate;
exports.newProjectTemplate = newProjectTemplate;
