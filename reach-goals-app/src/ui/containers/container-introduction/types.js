/** @import * as React from 'react' */

/** @typedef {import('../../../provider/model/demo-session-provider/types.js').SendCodeProps} OnDemoSessionFormProps */
/** @typedef {import('../../../provider/model/demo-session-provider/types.js').ResetSendCodeProps} OnResetSendCodeProps */
/** @typedef {import('../../../provider/model/demo-session-provider/types.js').VerifyDemoSessionProps} OnVerifyDemoSessionProps */
/** @typedef {import('../../../provider/model/demo-session-provider/types.js').DemoSessionContextValue} ContainerIntroductionProps */
/** @typedef {import('../../../provider/model/demo-session-provider/types.js').HttpErrorProps} HttpErrorProps */

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
 * @property {Object} form
 */

/**
 * @typedef {Object} DemoSessionForm
 * @property {string} name
 * @property {string} email
 * @property {string} code
 */

/**
 * @callback SetDemoSessionFormProps
 * @param {DemoSessionForm} params
 * @returns {void}
 */

/**
 * @typedef {[DemoSessionForm, React.Dispatch<React.SetStateAction<DemoSessionForm>> ]} SetDemoSessionFormStateProps
 */

/**
 * @typedef {Object} FormDemoSessionProps
 * @property {boolean} isCodeSended
 * @property {HttpErrorProps} mutationError
 * @property {boolean} mutationLoading
 * @property {string} error
 * @property {DemoSessionForm} demoSessionForm
 * @property {SetDemoSessionFormProps} onDemoSessionForm
 * @property {OnDemoSessionFormProps} onSendCode
 * @property {OnResetSendCodeProps} onResetSendCode
 * @property {OnVerifyDemoSessionProps} onVerifyDemoSession
 */

export {}
