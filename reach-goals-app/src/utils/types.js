/* VISIBILITY-CONFIG-PROPS */
/** 
 * @typedef {'progress' | 'conclude' | 'cancel'} StatusType
 */

/** 
 * @typedef {'column-3x3' | 'column-2x2' | null} ColumnsType
 */

/** 
 * @typedef {'goal' | 'assignment' | 'all-activities'} LayoutType
 */

/**
 * @typedef {Object} VisibilityConfigProps
 * @property {'card' | 'card-mini'} cards
 * @property {'chart-pie' | 'chart-bar'} charts
 * @property {LayoutType} layoutHome
 * @property {LayoutType} layoutCalendar
 * @property {LayoutType} layoutObjectives
 * @property {'minimize' | null | undefined} layoutPopupModel
 * @property {StatusType[]} status
 * @property {ColumnsType} columns
 * @property {boolean} tagsCard
 */

/* MODEL-PROPS */
/**
 * @typedef {'goal' | 'assignment' | 'tag'} ModelTypeProps
 */

/**
 * @typedef {Object} SelectedModelProps
 * @property {Array<Object>} tag
 * @property {Array<Object>} assignment
 * @property {Array<Object>} goal
 */

/**
 * @typedef {Object} DataModelScopeProps
 * @property {Array<Object>} core
 * @property {Array<Object>} support
 */

/**
 * @typedef {Object} DataModelProps
 * @property {DataModelScopeProps} goal
 * @property {DataModelScopeProps} assignment
 * @property {DataModelScopeProps} tag
 */

/**
 * @typedef {Object} ModelProps
 * @property {ModelTypeProps | ''} typeModel
 * @property {string | number | null} mainModelID
 * @property {SelectedModelProps} selectedModel
 * @property {DataModelProps} dataModel
 * @property {Object} filter
 * @property {Object} activeModel
 */

export {}