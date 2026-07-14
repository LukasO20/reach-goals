/** @import * as React from 'react' */

/** @typedef {import('../../utils/types.js').ModelTypeProps} ModelTypeProps */
/** @typedef {import('../../utils/types.js').StatusType} StatusTypeProps */

/**
 * @typedef {Object} RenderDropdownStatusTitleProps
 * @property {StatusTypeProps} [status]
 */

/**
 * @typedef {Object} RenderModelEnviromentProps
 * @property {ModelTypeProps} type
 * @property {Object} modelForm
 * @property {number} mainModelID
 * @property {Object} modelSwitcherPropss
 * @property {Object} modelCopyProps
 * @property {'goal' | 'assignment'} region
 */

/**
 * @typedef {Object} RenderModelTagEnviromentReturns
 * @property {Object} props
 * @property {ModelTypeProps} type
 * @property {'copy' | 'switcher'} render
 */

/**
 * @typedef {Object} RenderModelTagEnviromentProps
 * @property {ModelTypeProps} type
 * @property {Object} modelForm
 * @property {number} mainModelID
 * @property {Object} modelSwitcherProps
 * @property {Object} modelCopyProps
 */

/**
 * @typedef {Object} EmptyFieldsStateProps
 * @property {Array<string>} fields
 * @property {boolean} isEmptyFields
 */

/**
 * @typedef {[EmptyFieldsStateProps, React.Dispatch<React.SetStateAction<EmptyFieldsStateProps>> ]} SetEmptyFieldsProps
 */

/**
 * @typedef {EmptyFieldsStateProps} FindEmptyFieldReturns
 */

/**
 * @typedef {Object} FindEmptyFieldsProps
 * @property {Object} modelForm
 */

/**
 * @typedef {Object} FormProps
 * @property {ModelTypeProps} typeForm
 * @property {Object} functionFormMap
 * @property {Object} model
 * @property {Object} modelForm
 * @property {number} mainModelID
 * @property {boolean} [pendingState]
 */

/**
 * @typedef {Object} ModelRelationAddProps
 * @property {import('react').ReactNode} children
 * @property {'goal' | 'assignment'} type
 */

/**
 * @typedef {Object} FormTagProps
 * @property {ModelTypeProps} type
 * @property {Object} functionFormMap
 * @property {Function} [functionFormMap.mapHandleChange]
 * @property {Function} [functionFormMap.mapHandleSubmit]
 * @property {Object} model
 * @property {Object} modelForm
 * @property {number} mainModelID
 * @property {boolean} [pendingState]
 */

/**
 * @typedef {Object} FormStandardProps
 * @property {ModelTypeProps} type
 * @property {Object} functionFormMap
 * @property {Function} [functionFormMap.mapToggleVisibility]
 * @property {Function} [functionFormMap.mapHandleChange]
 * @property {Function} [functionFormMap.mapModelRelationAddMap]
 * @property {Function} [functionFormMap.mapHandleSubmit]
 * @property {Function} [functionFormMap.mapSetError]
 * @property {Object} model
 * @property {Object} modelForm
 * @property {number} mainModelID
 * @property {Object} [booleanFormMap]
 * @property {boolean} [pendingState]
 */

export {}