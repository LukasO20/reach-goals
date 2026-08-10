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
    onVerifyDemoSession,
    mutationLoading,
}) => {
    /** @type {import('../types.js').SetEmptyFieldsProps} */
    const [emptyFields, setEmptyFields] = useState({
        fields: [],
        isEmptyFields: false,
    })

    console.log('form - ', demoSessionForm)
    const handleButtonActionClick = () => {
        const fields = findEmptyFields({
            form: { name: demoSessionForm.name, email: demoSessionForm.email },
        })
        setEmptyFields(fields)

        console.log('fields ', fields)
        if (fields.isEmptyFields) return

        !isCodeSended
            ? onSendCode({
                  name: demoSessionForm.name,
                  email: demoSessionForm.email,
              })
            : onVerifyDemoSession({
                  code: demoSessionForm.code,
                  name: demoSessionForm.name,
                  email: demoSessionForm.email,
              })
    }

    const buttonTitle = isCodeSended ? 'Start a session' : 'Send code'

    //TODO: IMPROVE InputCode ERROR MESSAGE WHEN WRONG CODE SCENARY HAPPENS

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
                    <InputCode
                        id='demo-session-code'
                        name='code'
                        length={6}
                        title='Code'
                        onChange={onDemoSessionForm}
                        errorMessage={
                            emptyFields.fields.includes('code') &&
                            'Code is required'
                        }
                    />
                )}
                {
                    //TODO: Need a button to go back (usefull when e-mail is wrong)
                }
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
