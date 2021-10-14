/**
 * @fileoverview Minecraft Forge Utils - Project lib
 * @license Apache-2.0
 * @author Markus@Bordihn.de (Markus Bordihn)
 */

const execa = require('execa');
const path = require('path');

const configuration = require('./configuration.js');
const defaultPath = require('./path.js');
const { fileUtils } = require('minecraft-utils-shared');

const defaultOptions = {
  author:
    process.env.USER || require('os').userInfo().username || 'Author Name',
  className: 'NewModClassName',
  classPath: path.join(
    defaultPath.workingPath,
    ...'src/main/java/net/example'.split('/')
  ),
  assetsPath: path.join(
    defaultPath.workingPath,
    ...'src/main/resources/assets/new_mod'.split('/')
  ),
  description: 'This is the description for a new Forge mod',
  id: 'new_mod',
  license: 'MIT',
  name:
    process.env.npm_package_config_project_name ||
    process.env.npm_package_name ||
    'New Project',
  minEngineVersion: '1.16.5',
  namespace: 'net.example',
  vendorName: 'vendorname',
};

const newProjectTemplate = (name, options = defaultOptions) => {
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

  // Store project configuration
  configuration.saveProjectConfig(options);
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
  fileUtils.createFolderIfNotExists(path.join(options.classPath));

  // Rename template main class files
  const templateDir = path.join(
    defaultPath.workingPath,
    'src',
    'main',
    'java',
    '__mod_namespace__'
  );
  fileUtils.renameFileIfExists(
    path.join(templateDir, '__mod_class_name__.java'),
    path.join(templateDir, `${options.className}.java`)
  );
  fileUtils.renameFileIfExists(templateDir, options.classPath, true);

  // Create assets folder
  fileUtils.createFolderIfNotExists(options.assetsPath);
};

const replaceProjectTemplatePlaceholder = (target, options) => {
  // build.gradle
  const buildFile = path.join(target, 'build.gradle');
  fileUtils.setPlaceholder(buildFile, 'Mod Id', options.id);

  // gradle.properties files
  const gradleFile = path.join(target, 'gradle.properties');
  fileUtils.setPlaceholder(gradleFile, 'Author', options.author);
  fileUtils.setPlaceholder(gradleFile, 'Mod Namespace', options.namespace);
  fileUtils.setPlaceholder(gradleFile, 'Mod Id', options.id);
  fileUtils.setPlaceholder(gradleFile, 'Mod Name', options.name);
  fileUtils.setPlaceholder(gradleFile, 'Vendor Name', options.vendorName);

  // Resources files
  const resourceFiles = path.join(target, 'src', 'main', 'resources', '**');
  fileUtils.setPlaceholder(resourceFiles, 'Author', options.author);
  fileUtils.setPlaceholder(
    resourceFiles,
    'Mod Description',
    options.description
  );
  fileUtils.setPlaceholder(resourceFiles, 'Mod Id', options.id);
  fileUtils.setPlaceholder(resourceFiles, 'Mod License', options.license);
  fileUtils.setPlaceholder(resourceFiles, 'Mod Name', options.name);

  // Source files
  const sourceFiles = path.join(target, 'src', 'main', 'java', '**', '*.java');
  fileUtils.setPlaceholder(sourceFiles, 'Mod ClassName', options.className);
  fileUtils.setPlaceholder(sourceFiles, 'Mod Id', options.id);
  fileUtils.setPlaceholder(sourceFiles, 'Mod Name', options.name);
  fileUtils.setPlaceholder(sourceFiles, 'Mod Namespace', options.namespace);
};

const getProjectTemplate = (version) => {
  const prefix = 'minecraft-forge-template-';
  switch (version) {
    case '1.16.5':
      return `${prefix}1.16.5`;
  }
  return '';
};

exports.defaultOptions = defaultOptions;
exports.getProjectTemplate = getProjectTemplate;
exports.newProjectTemplate = newProjectTemplate;
exports.runGradleSetup = runGradleSetup;
