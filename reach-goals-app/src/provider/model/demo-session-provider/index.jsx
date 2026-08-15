import { createContext, useContext, useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'

import * as demoVisitorService from '../../../services/demo-visitor.js'

import { safeDemoSessionData, safeAuthDemoSessionData } from './defaults.js'

/** @import * as React from 'react' */

/** @typedef {import('./types.js').DemoSessionContextValue} DemoSessionContextValue */

/** @type {React.Context<DemoSessionContextValue>} */
const DemoSessionContext = createContext()

export const DemoSessionProvider = ({ children }) => {
    const [codeAlreadySent, setCodeAlreadySent] = useState(false)

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

    const {
        data: authDemoSessionData = safeAuthDemoSessionData,
        error: authDemoSessionError,
        isLoading: authDemoSessionIsLoading,
    } = useQuery({
        queryKey: ['auth-demo-session'],
        queryFn: async () => {
            await delay(3500)
            const result = await demoVisitorService.getAuthenticateDemoSession()
            return result
        },
    })

    const {
        data: demoSessionData = safeDemoSessionData,
        error: demoSessionError,
        isLoading: demoSessionIsLoading,
    } = useQuery({
        queryKey: ['demo-session'],
        queryFn: () =>
            demoVisitorService.getDemoVisitor(authDemoSessionData.sub),
        enabled:
            !!authDemoSessionData?.sub &&
            authDemoSessionData !== safeAuthDemoSessionData,
    })

    const sendCodeMutation = useMutation({
        mutationFn: (data) => demoVisitorService.demoVisitorStart(data),
        onSuccess: ({ alreadySent }) => {
            setCodeAlreadySent(alreadySent)
        },
    })

    const verifyDemoSessionMutation = useMutation({
        mutationFn: (data) => demoVisitorService.demoVisitorVerify(data),
        onSuccess: () => window.location.reload(),
    })

    const logoutSessionMutation = useMutation({
        mutationFn: (demoVisitorId) =>
            demoVisitorService.logoutDemoSession(demoVisitorId),
        onSuccess: () => window.location.reload(),
    })

    return (
        <DemoSessionContext.Provider
            value={{
                visitor: {
                    id: demoSessionData.visitor.id,
                    name: demoSessionData.visitor.name,
                    email: demoSessionData.visitor.email,
                    status: demoSessionData.session.status,
                    expiresAt: demoSessionData.session.expiresAt,
                },
                sendCode: sendCodeMutation.mutate,
                verifyDemoSession: verifyDemoSessionMutation.mutate,
                sendCodeStatus: sendCodeMutation.status,
                resetSendCode: sendCodeMutation.reset,
                logoutSession: logoutSessionMutation.mutate,
                mutationError:
                    sendCodeMutation.error ?? verifyDemoSessionMutation.error,
                mutationLoading:
                    sendCodeMutation.isPending ||
                    verifyDemoSessionMutation.isPending ||
                    logoutSessionMutation.isPending,
                error: authDemoSessionError || demoSessionError,
                isLoading: authDemoSessionIsLoading || demoSessionIsLoading,
                codeAlreadySent,
            }}
        >
            {children}
        </DemoSessionContext.Provider>
    )
}

export const useDemoSessionProvider = () => useContext(DemoSessionContext)
