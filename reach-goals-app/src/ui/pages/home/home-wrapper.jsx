import { useEffect } from 'react'

import { ModelQueryClientProvider } from '../../../provider/model/model-queryclient-provider'
import { useTitle } from '../../../provider/ui/title-provider'
import { useDemoSession } from '../../../provider/model/demo-session-provider'

import Home from '.'

export const HomeWrapper = () => {
    const { update } = useTitle()
    const { visitor } = useDemoSession()

    useEffect(() => {
        update({ header: `Welcome ${visitor.name}. Let's produce?` })
    }, [update])

    return (
        <ModelQueryClientProvider>
            <Home />
        </ModelQueryClientProvider>
    )
}
