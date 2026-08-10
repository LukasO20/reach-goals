import AppRoutes from './Routes.jsx'

import { useDemoSessionProvider } from '../provider/model/demo-session-provider'

import Navigate from '../ui/navigate'
import ContainerHeader from '../ui/containers/container-header'
import ContainerMain from '../ui/containers/container-main'
import ContainerIntroduction from '../ui/containers/container-introduction'
import MessageToast from '../ui/elements/message-toast'
import ModalSwitcherCenter from '../ui/modals/modal-switcher-center.jsx'
import ModalSwitcherRight from '../ui/modals/modal-switcher-right.jsx'
import ModalDemoseSession from '../ui/containers/container-introduction'
import Loading from '../ui/elements/loading'

const AppWrapper = () => {
    const {
        visitor,
        sendCode,
        verifyDemoSession,
        sendCodeStatus,
        mutationLoading,
        isLoading,
        mutationError,
    } = useDemoSessionProvider()

    const shouldRenderContainerIntroduction =
        visitor.status === 'EXPIRED' && !isLoading

    if (isLoading) return <Loading title='Getting ready...' />

    if (shouldRenderContainerIntroduction)
        return (
            <ContainerIntroduction
                visitor={visitor}
                mutationLoading={mutationLoading}
                sendCodeStatus={sendCodeStatus}
                sendCode={sendCode}
                verifyDemoSession={verifyDemoSession}
                mutationError={mutationError}
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
            <ModalDemoseSession />
        </>
    )
}

export default AppWrapper
