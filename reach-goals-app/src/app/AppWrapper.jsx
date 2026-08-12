import AppRoutes from './Routes.jsx'

import { useDemoSessionProvider } from '../provider/model/demo-session-provider'

import Navigate from '../ui/navigate'
import ContainerHeader from '../ui/containers/container-header'
import ContainerMain from '../ui/containers/container-main'
import ContainerIntroduction from '../ui/containers/container-introduction'
import MessageToast from '../ui/elements/message-toast'
import ModalSwitcherCenter from '../ui/modals/modal-switcher-center.jsx'
import ModalSwitcherRight from '../ui/modals/modal-switcher-right.jsx'
import Loading from '../ui/elements/loading'

const AppWrapper = () => {
    const {
        visitor,
        sendCode,
        resetSendCode,
        verifyDemoSession,
        sendCodeStatus,
        mutationLoading,
        isLoading,
        mutationError,
        codeAlreadySent,
    } = useDemoSessionProvider()

    const shouldRenderContainerIntroduction =
        visitor.status === 'EXPIRED' && !isLoading

    if (isLoading) return <Loading title='Getting ready...' />

    if (shouldRenderContainerIntroduction)
        return (
            <ContainerIntroduction
                mutationLoading={mutationLoading}
                mutationError={mutationError}
                sendCodeStatus={sendCodeStatus}
                sendCode={sendCode}
                resetSendCode={resetSendCode}
                verifyDemoSession={verifyDemoSession}
                codeAlreadySent={codeAlreadySent}
            />
        )

    return (
        <>
            <Navigate />
            <ContainerHeader />
            <ContainerMain>
                <AppRoutes />
            </ContainerMain>
            <MessageToast />
            <ModalSwitcherCenter />
            <ModalSwitcherRight />
        </>
    )
}

export default AppWrapper
