import { useState } from 'react'

import { findEmptyFields } from '../helpers.js'

import ButtonAction from '../../../elements/button-action'
import InputCode from '../../../elements/input-code'
import InputText from '../../../elements/input-text'

/** @typedef {import('../types.js').FormDemoSessionProps & React.HTMLAttributes<HTMLDivElement>} Props */

/**
 * @param {Props} props
 */
const FormDemoSession = ({
    isCodeSended,
    sendCode,
    verifyDemoSession,
    erro,
    demoSessionForm,
    onDemoSessionForm,
    onSendCode,
    onResetSendCode,
    onVerifyDemoSession,
    mutationLoading,
    mutationError,
}) => {
    /** @type {import('../types.js').SetEmptyFieldsProps} */
    const [emptyFields, setEmptyFields] = useState({
        fields: [],
        isEmptyFields: false,
    })

    const handleButtonActionClick = () => {
        const formatFields = {
            name: demoSessionForm.name,
            email: demoSessionForm.email,
            ...(isCodeSended && {
                code: demoSessionForm.code,
            }),
        }

        const fields = findEmptyFields({
            form: formatFields,
        })
        setEmptyFields(fields)

        if (fields.isEmptyFields) return

        !isCodeSended
            ? onSendCode(formatFields)
            : onVerifyDemoSession(formatFields)
    }

    const buttonTitle = isCodeSended ? 'Start a session' : 'Send code'

    const inputCodeErrorMessage = emptyFields.fields.includes('code')
        ? 'Code is required'
        : mutationError.error

    return (
        <div className='demo-session-form'>
            <div className='content'>
                {!isCodeSended && (
                    <>
                        <InputText
                            id='demo-session-name'
                            name='name'
                            placeholder='Type your name'
                            onChange={onDemoSessionForm}
                            errorMessage={
                                emptyFields.fields.includes('name') &&
                                'Name is required'
                            }
                        />
                        <InputText
                            id='demo-session-email'
                            name='email'
                            placeholder='Type your e-mail'
                            onChange={onDemoSessionForm}
                            errorMessage={
                                emptyFields.fields.includes('email') &&
                                'Email is required'
                            }
                        />
                    </>
                )}
                {isCodeSended && (
                    <>
                        <InputCode
                            id='demo-session-code'
                            name='code'
                            length={6}
                            title='Code'
                            onChange={onDemoSessionForm}
                            onPaste={onDemoSessionForm}
                            errorMessage={inputCodeErrorMessage}
                        />
                        <ButtonAction
                            classBtn='text-icon'
                            title='Set new e-mail'
                            onClick={onResetSendCode}
                            icon='icon-arrow-left'
                        />
                    </>
                )}
            </div>
            <div className='actions'>
                <ButtonAction
                    classBtn='demo-session-action plan'
                    title={buttonTitle}
                    onClick={handleButtonActionClick}
                    pendingState={mutationLoading}
                />
            </div>
        </div>
    )
}

export default FormDemoSession
