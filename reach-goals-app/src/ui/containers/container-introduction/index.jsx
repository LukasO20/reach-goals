import { useState } from 'react'

import { useDemoSessionProvider } from '../../../provider/model/demo-session-provider'

import { safeDemoSessionForm, safeMutationError } from './defaults.js'

import FormDemoSession from './components/form-demo-session.jsx'
import Overlay from '../../elements/overlay/index.jsx'

import './style.scss'

const Title = (isCodeSended = false, someCodeAlreadySent = false) => {
    const titleContent = someCodeAlreadySent
        ? 'A verification code has already been sent'
        : isCodeSended
          ? 'The Verification code sent to email'
          : 'Fill all the fields to start a session'

    const subTitle =
        isCodeSended || someCodeAlreadySent ? (
            <label className='sub-title'>
                Please also check your spam or trash folders
            </label>
        ) : null
    const title = <label className='title'>{titleContent}</label>

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
const ContainerIntroduction = ({
    mutationLoading,
    mutationError,
    sendCodeStatus,
    sendCode,
    resetSendCode,
    verifyDemoSession,
    codeAlreadySent,
    ...rest
}) => {
    /** @type {import('./types.js').SetDemoSessionFormStateProps} */
    const [demoSessionForm, setDemoSessionForm] = useState(safeDemoSessionForm)

    const isCodeSended = sendCodeStatus === 'success'

    const handleDemoSessionForm = (e) => {
        const { name, value } = e.target

        setDemoSessionForm((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    return (
        <div className='container-demo-session'>
            <div className='head'>{Title(isCodeSended, codeAlreadySent)}</div>
            <div className='body'>
                <FormDemoSession
                    demoSessionForm={demoSessionForm}
                    isCodeSended={isCodeSended}
                    mutationLoading={mutationLoading}
                    mutationError={mutationError ?? safeMutationError}
                    onDemoSessionForm={handleDemoSessionForm}
                    onSendCode={sendCode}
                    onResetSendCode={resetSendCode}
                    onVerifyDemoSession={verifyDemoSession}
                />
            </div>
        </div>
    )
}

export default ContainerIntroduction
