import { useEffect } from 'react'

import { ModelQueryClientProvider } from '../../../provider/model/model-queryclient-provider'
import { useTitle } from '../../../provider/ui/title-provider'

import Home from '.'

export const HomeWrapper = () => {
    const { update } = useTitle()

    useEffect(() => {
        update({ header: `Welcome. Let's produce?` })
    }, [update])
        
    return (
        <ModelQueryClientProvider>
            <Home />
        </ModelQueryClientProvider>
    )
}