/**
 * @fileoverview Minecraft Forge Utils - UUID command
 * @license Apache-2.0
 * @author Markus@Bordihn.de (Markus Bordihn)
 */

const { v4: uuidv4, v5: uuidv5 } = require('uuid');

/**
 * @param {String} name
 * @param {String} namespace
 * @return {String}
 */
const getUUID = (name, namespace = '13f6b944-4298-435d-afcb-a4e57a8c0713') => {
  if (name && namespace) {
    return uuidv5(name, namespace);
  }
  return uuidv4();
};

exports.getUUID = getUUID;
