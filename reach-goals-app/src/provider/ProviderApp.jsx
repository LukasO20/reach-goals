import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TitleProvider } from './ui/title-provider.jsx'
import { VisibilityProvider } from './ui/visibility-provider.jsx'
import { CheckboxProvider } from './ui/checkbox-provider.jsx'
import { ManageModelProvider } from './model/manage-model-provider.jsx'
import { SwitchLayoutProvider } from './ui/switch-layout-provider.jsx'
import { SearchBarProvider } from './ui/searchbar-provider.jsx'
import { UtilityProvider } from './model/utility-provider.jsx'

const queryClient = new QueryClient()

const providers = [
    [QueryClientProvider, { client: queryClient }],
    [ManageModelProvider],
    [TitleProvider],
    [VisibilityProvider],
    [SearchBarProvider],
    [SwitchLayoutProvider],
    [CheckboxProvider],
    [UtilityProvider]
]

const Compose = ({ providers, children }) => {
    return providers.reduceRight((acc, provider) => {
        if (Array.isArray(provider)) {
            const [Provider, props] = provider
            return <Provider {...props}>{acc}</Provider>
        }
        const Provider = provider
        return <Provider>{acc}</Provider>
    }, children)
}

const ProviderApp = ({ children }) => {
    return (
        <Compose providers={providers}>
            {children}
        </Compose>
    )
}

export default ProviderApp