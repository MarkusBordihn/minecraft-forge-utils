/**
 * @fileoverview Minecraft Forge Utils - UUID command
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
