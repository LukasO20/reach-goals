import { createContext, useContext, useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'

import * as demoVisitorService from '../../../services/demo-visitor.js'

import { safeDemoSessionData, safeAuthDemoSessionData } from './defaults.js'

/** @import * as React from 'react' */

/** @typedef {import('./types.js').DemoSessionContextValue} DemoSessionContextValue */

/** @type {React.Context<DemoSessionContextValue>} */
const DemoSessionContext = createContext()

export const DemoSessionProvider = ({ children }) => {
    const {
        data: authDemoSessionData = safeAuthDemoSessionData,
        error: authDemoSessionError,
        isLoading: authDemoSessionIsLoading,
    } = useQuery({
        queryKey: ['auth-demo-session'],
        queryFn: demoVisitorService.getAuthenticateDemoSession,
    })

    const {
        data: demoSessionData = safeDemoSessionData,
        error: demoSessionError,
        isLoading: demoSessionIsLoading,
    } = useQuery({
        queryKey: ['demo-session'],
        queryFn: () =>
            demoVisitorService.getDemoVisitor(authDemoSessionData.sub),
    })

    const sendCodeMutation = useMutation({
        mutationFn: (data) => demoVisitorService.demoVisitorStart(data),
    })

    const verifyDemoSessionMutation = useMutation({
        mutationFn: (data) => demoVisitorService.demoVisitorVerify(data),
    })

    return (
        <DemoSessionContext.Provider
            value={{
                visitor: {
                    name: demoSessionData.visitor.name,
                    email: demoSessionData.visitor.email,
                    status: demoSessionData.session.status,
                },
                sendCode: sendCodeMutation.mutate,
                verifyDemoSession: verifyDemoSessionMutation.mutate,
                mutationError:
                    sendCodeMutation.error ?? verifyDemoSessionMutation.error,
                mutationLoading:
                    sendCodeMutation.isPending ||
                    verifyDemoSessionMutation.isPending,
                error: authDemoSessionError || demoSessionError,
                isLoading: authDemoSessionIsLoading || demoSessionIsLoading,
            }}
        >
            {children}
        </DemoSessionContext.Provider>
    )
}

export const useDemoSessionProvider = () => useContext(DemoSessionContext)
