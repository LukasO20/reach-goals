/**
 * @typedef {'tag' | 'goal' | 'assignment'} ModelType
 */

/**
 * @typedef {'home' | 'calendar' | 'objectives'} SwitchModelType
 */

/**
 * @typedef {Object} ModelOptionsProps
 * @property {ModelType} [type]
 */

/**
 * @typedef {Object} SwitchModelOptionsProps
 * @property {SwitchModelType} [type]
 * @property {function(string):void} [onFilterTabs]
 */

/**
 * @typedef {Object} PopupModelOptionsProps
 * @property {'pop-chart' | 'pop-model' | 'pop-switch-model'} type
 * @property {ModelType} typeModelOptions
 * @property {SwitchModelType} typeSwitchModelOptions
 * @property {function(string):void} onFilterTabs
 */

export {}