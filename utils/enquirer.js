/**
 * @fileoverview Minecraft Forge Utils - Enquirer lib
 * @license Apache-2.0
 * @author Markus@Bordihn.de (Markus Bordihn)
 */

const spaceBarHint = ' (toggle with space)';

/**
 * @param {String} input
 * @param {*} choice
 * @param {*} scope
 * @return {String}
 */
const formatBoolean = (input, choice, scope) => {
  choice.input = '';
  choice.cursor = 0;
  const { noop, success, dark } = scope.styles;
  const check = () =>
    choice.enabled
      ? success('true') + '\t' + dark(spaceBarHint)
      : noop('false') + '\t' + dark(spaceBarHint);
  if (input !== ' ') {
    scope.alert();
    return check();
  }
  choice.enabled = !choice.enabled;
  return check();
};

/**
 * @param {String} input
 * @param {*} choice
 * @param {*} scope
 * @return {String}
 */
const formatOptional = (input, choice, scope) => {
  choice.input = '';
  choice.cursor = 0;
  const { noop, success, dark } = scope.styles;
  const check = () =>
    choice.enabled
      ? success('true') + ' 🏷️\t ' + dark(spaceBarHint)
      : noop('false') + ' 🏷️\t ' + dark(spaceBarHint);
  if (input !== ' ') {
    scope.alert();
    return check();
  }
  choice.enabled = !choice.enabled;
  return check();
};

exports.formatBoolean = formatBoolean;
exports.formatOptional = formatOptional;
