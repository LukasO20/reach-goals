import { useState } from 'react'
import { useTheme } from '../../../provider/ui/theme-provider'

import { safeDemoSessionForm, safeMutationError } from './defaults.js'

import FormDemoSession from './components/form-demo-session.jsx'
import Title from './components/title.jsx'

import LogoLight from '../../../assets/logo-light.svg'
import LogoDark from '../../../assets/logo-dark.svg'

import './style.scss'

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
    const { theme } = useTheme()

    /** @type {import('./types.js').SetDemoSessionFormStateProps} */
    const [demoSessionForm, setDemoSessionForm] = useState(safeDemoSessionForm)

    const logoImgTheme = theme === 'light' ? LogoLight : LogoDark

    const isCodeSended = sendCodeStatus === 'success'

    const handleDemoSessionForm = (e) => {
        const { name, value } = e.target

        setDemoSessionForm((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    return (
        <div className='container-demo-session' {...rest}>
            <div className='head'>
                <img className='logo' src={logoImgTheme} alt={'Logo'} />
                <Title
                    isCodeSended={isCodeSended}
                    someCodeAlreadySent={codeAlreadySent}
                />
            </div>
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
