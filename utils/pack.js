/**
 * @fileoverview Minecraft Forge Utils - Pack lib
 * @license Apache-2.0
 * @author Markus@Bordihn.de (Markus Bordihn)
 */

const fs = require('fs');
const path = require('path');

const AdmZip = require('adm-zip');
const chalk = require('chalk');
const gitIgnore = require('ignore');
const glob = require('glob');

const packResourcePack = (name) => {
  console.log('Packing resource pack for', name);
  const zipFile = new AdmZip();
  let assetsFile = null;
  let gitIgnoreFile = null;

  // Resource for possible .gitignore files.
  if (fs.existsSync(path.join(process.cwd(), '.gitignore'))) {
    gitIgnoreFile = path.join(process.cwd(), '.gitignore');
  } else if (fs.existsSync(path.join(process.cwd(), '..', '.gitignore'))) {
    gitIgnoreFile = path.join(process.cwd(), '..', '.gitignore');
  }

  // Handle .gitignore entries
  if (gitIgnoreFile) {
    console.log(
      `Using .gitignore file at ${gitIgnoreFile} for additional filtering ...`
    );
    assetsFile = gitIgnore()
      .add(fs.readFileSync(gitIgnoreFile).toString())
      .filter(
        glob.sync('**', {
          cwd: path.join('./assets'),
        })
      );
  } else {
    assetsFile = glob.sync('**', {
      cwd: path.join('./assets'),
    });
  }

  // Pack Resource Pack.
  if (fs.existsSync(path.join(process.cwd(), 'license.txt'))) {
    console.log('➕ license.txt');
    zipFile.addLocalFile(path.join(process.cwd(), 'license.txt'));
  }
  console.log('➕ pack.png');
  zipFile.addLocalFile(path.join(process.cwd(), 'pack.png'));
  console.log('➕ pack.mcmeta');
  zipFile.addLocalFile(path.join(process.cwd(), 'pack.mcmeta'));

  // Handle assets files.
  assetsFile.forEach(function (file) {
    const filePath = path.join(process.cwd(), file);

    const lastSyncState = fs.lstatSync(filePath);
    if (!lastSyncState.isDirectory()) {
      if (lastSyncState.size > 1000000) {
        console.log(
          chalk.red(
            `➕ ${path.relative(path.join(process.cwd()), filePath)} (${
              lastSyncState.size
            })`
          )
        );
      } else if (lastSyncState.size > 100000) {
        console.log(
          chalk.yellow(
            `➕ ${path.relative(path.join(process.cwd()), filePath)} (${
              lastSyncState.size
            })`
          )
        );
      } else {
        console.log(
          `➕ ${path.relative(path.join(process.cwd()), filePath)} (${
            lastSyncState.size
          })`
        );
      }
      zipFile.addLocalFile(
        filePath,
        path.relative(path.join(process.cwd()), path.dirname(filePath))
      );
    }
  });

  // Parse version from mcmeta
  let version = '1.0';
  let minecraftVersion = '';
  const metaData = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'pack.mcmeta'))
  );
  console.info(metaData);

  // Parse Minecraft Version
  if (metaData.pack.pack_format == 6) {
    minecraftVersion = '1.16';
  } else if (metaData.pack.pack_format == 7) {
    minecraftVersion = '1.17';
  } else if (metaData.pack.pack_format == 8) {
    minecraftVersion = '1.18';
  }

  // Parse Version
  if (
    metaData.pack.description.toLowerCase().includes('version ') &&
    metaData.pack.description.toLowerCase().includes('\n')
  ) {
    version = metaData.pack.description
      .toLowerCase()
      .split('version ')[1]
      .split('\n')[0];
  }

  // Store zip file under dist.
  if (name.endsWith('.zip')) {
    zipFile.writeZip(path.join(process.cwd(), 'dist', name));
  } else {
    zipFile.writeZip(
      path.join(
        process.cwd(),
        'dist',
        `${name}-${minecraftVersion}-v${version}.zip`
      )
    );
  }
};

exports.packResourcePack = packResourcePack;
