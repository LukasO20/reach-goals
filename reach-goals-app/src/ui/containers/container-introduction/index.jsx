import { useState } from 'react'

import { useDemoSessionProvider } from '../../../provider/model/demo-session-provider'

import { safeDemoSessionForm } from './defaults.js'

import FormDemoSession from './components/form-demo-session.jsx'
import Overlay from '../../elements/overlay/index.jsx'

import './style.scss'

const Title = (isCodeSended = false) => {
    const subTitle = isCodeSended ? (
        <label className='sub-title'>
            Please also check your spam or trash folders
        </label>
    ) : null
    const title = (
        <label className='title'>
            {isCodeSended
                ? 'The Verification code sent to email'
                : 'Fill all the fields to start a session'}
        </label>
    )

    return (
        <>
            {title}
            {subTitle}
        </>
    )
}

/** @typedef {import('./types.js').ContainerIntroductionProps & React.HTMLAttributes<HTMLDivElement>} Props */

/**
 * @param {Props} props
 */

//ADD SAFE VALUE TO PROPS VISITOR HERE (ACCORDING ATTRIBUTES USED)
const ContainerIntroduction = ({
    visitor = {},
    mutationLoading,
    sendCodeStatus,
    sendCode,
    verifyDemoSession,
    mutationError,
    ...rest
}) => {
    /** @type {import('./types.js').SetDemoSessionFormStateProps} */
    const [demoSessionForm, setDemoSessionForm] = useState(safeDemoSessionForm)

    const isCodeSended = sendCodeStatus === 'success'
    console.log('err - ', mutationError)
    const handleDemoSessionForm = (e) => {
        const { name, value } = e.target

        setDemoSessionForm((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const shouldNotRender = visitor.status === 'EXPIRED'

    if (!shouldNotRender) return null

    return (
        <div className='container-demo-session'>
            <div className='head'>{Title(isCodeSended)}</div>
            <div className='body'>
                <FormDemoSession
                    demoSessionForm={demoSessionForm}
                    isCodeSended={isCodeSended}
                    mutationLoading={mutationLoading}
                    onDemoSessionForm={handleDemoSessionForm}
                    onSendCode={sendCode}
                    onVerifyDemoSession={verifyDemoSession}
                />
            </div>
        </div>
    )
}

export default ContainerIntroduction
