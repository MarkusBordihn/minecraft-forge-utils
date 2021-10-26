/**
 * @file Minecraft Forge Utils - Item command prompts
 * @license Apache-2.0
 * @author Markus@Bordihn.de (Markus Bordihn)
 */

const { Form, Select } = require('enquirer');
const {
  configurationUtils,
  defaultConfig,
  enquirerHelper,
  normalizeHelper,
} = require('minecraft-utils-shared');

const projectConfig = configurationUtils.loadProjectConfig();

/**
 * @param {String} type
 * @return {String}
 */
const getItemTypeIconForSelection = (type) => {
  return `  ${defaultConfig.item.getItemTypeIcon(type)}\t`;
};

const newItemTemplate = (type = 'custom', choices = [], variation = '') => {
  const result = {
    name: type,
    message: `Please provide the following information for the ${type} item ${defaultConfig.item.getItemTypeIcon(
      type
    )}`,
    choices: [
      {
        name: 'type',
        message: `Item Type`,
        initial: type,
        hidden: true,
      },
      {
        name: 'name',
        message: 'Item Name',
        initial: `New ${type} ${variation ? variation + ' ' : ''}item`,
      },
      {
        name: 'namespace',
        message: 'Namespace',
        initial: projectConfig.id || defaultConfig.item.config.namespace,
      },
      {
        name: 'forge.className',
        message: 'Class Name',
        initial: defaultConfig.item.config.namespace,
        onChoice(state, choice) {
          const { name } = this.values;
          choice.initial = `${normalizeHelper.normalizeClassName(name)}`;
        },
        validate(value) {
          return value == normalizeHelper.normalizeClassName(value);
        },
        result(value) {
          return normalizeHelper.normalizeClassName(value);
        },
        disabled: type == 'simple',
      },
      {
        name: 'attributes.foil',
        message: 'Foil',
        enabled: false,
        format(input, choice) {
          return enquirerHelper.formatBoolean(input, choice, this);
        },
        result(value, choice) {
          return choice.enabled;
        },
      },
    ],
  };
  if (choices.length > 0) {
    result.choices = result.choices.concat(choices);
  }
  return result;
};

exports.newItemType = new Select({
  name: 'itemType',
  message: 'Select the item type you want to create',
  choices: [
    {
      name: 'simple',
      message: `${getItemTypeIconForSelection(
        'simple'
      )} Simple Item (e.g. nuggets)`,
    },
    {
      name: 'custom',
      message: `${getItemTypeIconForSelection(
        'custom'
      )}  Custom item (e.g. custom items)`,
    },
    {
      name: 'armor',
      message: `${getItemTypeIconForSelection(
        'armor'
      )}  Armor item (e.g. helmet, chestplate, ...)`,
      disabled: true,
    },
    {
      name: 'blockPlacer',
      message: `${getItemTypeIconForSelection(
        'blockPlacer'
      )} Planter item for blocks (e.g. seeds)`,
      disabled: true,
    },
    {
      name: 'digger',
      message: `${getItemTypeIconForSelection(
        'digger'
      )}  Digger item (e.g. pickaxe)`,
      disabled: true,
    },
    {
      name: 'dyePowder',
      message: `${getItemTypeIconForSelection(
        'dyePowder'
      )} Dye powder item (e.g. red, green, blue, ...)`,
      disabled: true,
    },
    {
      name: 'entityPlacer',
      message: `${getItemTypeIconForSelection(
        'entityPlacer'
      )}  Planter item for entities (e.g. spider on web)`,
      disabled: true,
    },
    {
      name: 'food',
      message: `${getItemTypeIconForSelection('food')} Food item (e.g. apple)`,
      disabled: true,
    },
    {
      name: 'fuel',
      message: `${getItemTypeIconForSelection('fuel')}  Fuel item (e.g. coal)`,
      disabled: true,
    },
    {
      name: 'projectile',
      message: `${getItemTypeIconForSelection(
        'projectile'
      )} Projectile item (e.g. arrow)`,
      disabled: true,
    },
    {
      name: 'throwable',
      message: `${getItemTypeIconForSelection(
        'throwable'
      )}  Throwable item (e.g. snowball)`,
      disabled: true,
    },
    {
      name: 'weapon',
      message: `${getItemTypeIconForSelection(
        'weapon'
      )}  Weapon item (e.g. axe, sword, ...)`,
      disabled: true,
    },
    {
      name: 'wearable',
      message: `${getItemTypeIconForSelection(
        'wearable'
      )} Wearable item (e.g. cloth)`,
      disabled: true,
    },
  ],
});

exports.newArmorType = new Select({
  name: 'armor.type',
  message: 'Select the armor type you want to create',
  choices: [
    {
      name: 'custom',
      message: `${getItemTypeIconForSelection('custom')}   Custom armor`,
    },
    {
      name: 'helmet',
      message: `${getItemTypeIconForSelection('helmet')}  Helmet`,
    },
    {
      name: 'chestplate',
      message: `${getItemTypeIconForSelection('chestplate')}  Chestplate`,
    },
    {
      name: 'leggings',
      message: `${getItemTypeIconForSelection('leggings')}  Leggings`,
    },
    {
      name: 'boots',
      message: `${getItemTypeIconForSelection('boots')} Boots`,
    },
  ],
});

exports.newArmorItem = (armor_type) => {
  const armorItemSelection = [
    {
      name: 'variation',
      message: 'Armor Type',
      initial: armor_type,
      hidden: true,
    },
    {
      name: 'armor.protection',
      message: 'Protection 🧪',
      initial: '5',
    },
    {
      name: 'armor.textureType',
      message: 'Texture type (e.g. diamond, gold, ...) 🧪',
      initial: '',
    },
    {
      name: 'attributes.maxStackSize',
      message: 'Max stack size',
      initial: '1',
    },
  ];

  // Default Texture per Armor Type
  switch (armor_type) {
    case 'boots':
    case 'chestplate':
    case 'helmet':
      armorItemSelection.push({
        name: 'textures.default',
        message: 'Texture (default)',
        initial: 'textures/models/armor/armor_1',
      });
      break;
    case 'leggings':
      armorItemSelection.push({
        name: 'textures.default',
        message: 'Texture (default)',
        initial: 'textures/models/armor/armor_2',
      });
      break;
    case 'custom':
      armorItemSelection.push({
        name: 'renderOffset.type',
        message: 'Render offset',
        initial: 'chestplates',
      });
      armorItemSelection.push({
        name: 'wearable.slot',
        message: 'Wearable slot',
        initial: 'slot.armor.chest',
      });
      armorItemSelection.push({
        name: 'textures.default',
        message: 'Texture (default)',
        initial: 'textures/models/armor/armor_custom',
      });
      break;
  }
  armorItemSelection.push({
    name: 'textures.enchanted',
    message: 'Texture (enchanted)',
    initial: 'textures/misc/enchanted_armor',
  });

  // Attachable Config per armor Type
  switch (armor_type) {
    case 'boots':
    case 'chestplate':
    case 'helmet':
    case 'leggings':
      armorItemSelection.push({
        name: 'attachable.geometry',
        message: 'Attachable Geometry',
        initial: 'geometry.humanoid.armor.' + armor_type,
      });
      break;
    default:
      armorItemSelection.push({
        name: 'attachable.geometry',
        message: 'Attachable Geometry',
        initial: '',
      });
  }

  return new Form(newItemTemplate(`armor`, armorItemSelection, armor_type));
};

exports.newDiggerItem = new Form(
  newItemTemplate('digger', [
    {
      name: 'digger.useEfficiency',
      message: 'Use Efficiency 🧪',
      enabled: false,
      format(input, choice) {
        return enquirerHelper.formatBoolean(input, choice, this);
      },
      result(value, choice) {
        return choice.enabled;
      },
    },
    {
      name: 'digger.destroySpeeds',
      message: 'Destroy speed 🧪',
      enabled: false,
      format(input, choice) {
        return enquirerHelper.formatOptional(input, choice, this);
      },
      result(value, choice) {
        return choice.enabled;
      },
    },
    {
      name: 'digger.onDig',
      message: 'On Dig action (for unlisted blocks) 🧪',
      initial: '',
    },
    {
      name: 'attributes.handEquipped',
      message: 'Hand equipped',
      enabled: true,
      format(input, choice) {
        return enquirerHelper.formatBoolean(input, choice, this);
      },
      result(value, choice) {
        return choice.enabled;
      },
    },
    {
      name: 'attributes.maxStackSize',
      message: 'Max stack size',
      initial: '1',
    },
  ])
);

exports.newFoodItem = new Form(
  newItemTemplate('food', [
    {
      name: 'food.canAlwaysEat',
      message: 'Can always eat',
      initial: false,
      format(input, choice) {
        return enquirerHelper.formatBoolean(input, choice, this);
      },
      result(value, choice) {
        return choice.enabled;
      },
    },
    {
      name: 'food.nutrition',
      message: 'Nutrition (number)',
      initial: '4',
    },
    {
      name: 'food.effects',
      message: 'Effects',
      enabled: false,
      format(input, choice) {
        return enquirerHelper.formatOptional(input, choice, this);
      },
      result(value, choice) {
        return choice.enabled;
      },
    },
    {
      name: 'food.saturationModifier',
      message: 'Saturation Modifier',
      initial: 'low',
    },
    {
      name: 'food.usingConvertsTo',
      message: 'Using Converts to	(e.g. bowl) 🧪',
      initial: '',
    },
    {
      name: 'attributes.useDuration',
      message: 'Use duration',
      initial: '8',
    },
    {
      name: 'attributes.useAnimation',
      message: 'Use Animation',
      initial: 'eat',
    },
  ])
);

exports.newFuelItem = new Form(
  newItemTemplate('fuel', [
    {
      name: 'fuel.duration',
      message: 'Duration',
      initial: '3',
    },
  ])
);

exports.newThrowableItem = new Form(
  newItemTemplate('throwable', [
    {
      name: 'throwable.doSwingAnimation',
      message: 'Do swing animation',
      enabled: true,
      format(input, choice) {
        return enquirerHelper.formatBoolean(input, choice, this);
      },
      result(value, choice) {
        return choice.enabled;
      },
    },
    {
      name: 'throwable.launchPowerScale',
      message: 'Launch power scale',
      initial: '1.0',
    },
    {
      name: 'throwable.maxDrawDuration',
      message: 'Max draw duration',
      initial: '0.0',
    },
    {
      name: 'throwable.maxLaunchPower',
      message: 'Max launch power',
      initial: '1.0',
    },
    {
      name: 'throwable.minDrawDuration',
      message: 'Min draw duration 🧪',
      initial: '0.0',
    },
    {
      name: 'throwable.scalePowerByDrawDuration',
      message: 'Scale power by draw duration 🧪',
      enabled: true,
      format(input, choice) {
        return enquirerHelper.formatBoolean(input, choice, this);
      },
      result(value, choice) {
        return choice.enabled;
      },
    },
    {
      name: 'attributes.handEquipped',
      message: 'Hand equipped',
      enabled: true,
      format(input, choice) {
        return enquirerHelper.formatBoolean(input, choice, this);
      },
      result(value, choice) {
        return choice.enabled;
      },
    },
    {
      name: 'attributes.useDuration',
      message: 'Use duration',
      initial: '3600',
    },
  ])
);

exports.newWeaponItem = new Form(
  newItemTemplate('weapon', [
    {
      name: 'weapon.onHitBlock',
      message: 'On hit block',
      initial: '',
    },
    {
      name: 'weapon.onHurtEntity',
      message: 'On hurt entity',
      initial: '',
    },
    {
      name: 'weapon.onNotHurtEntity',
      message: 'On not hurt entity',
      initial: '',
    },
    {
      name: 'attributes.damage',
      message: 'Damages',
      initial: '',
    },
    {
      name: 'attributes.handEquipped',
      message: 'Hand equipped',
      enabled: true,
      format(input, choice) {
        return enquirerHelper.formatBoolean(input, choice, this);
      },
      result(value, choice) {
        return choice.enabled;
      },
    },
    {
      name: 'attributes.maxStackSize',
      message: 'Max stack size',
      initial: '1',
    },
  ])
);

exports.newSimpleItem = new Form(newItemTemplate('simple'));

exports.newCustomItem = new Form(newItemTemplate('custom'));
