import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TitleProvider } from './ui/TitleProvider.jsx'
import { VisibilityProvider } from './ui/VisibilityProvider.jsx'
import { CheckboxProvider } from './ui/CheckboxProvider.jsx'
import { ManageModelProvider } from './model/ManageModelProvider.jsx'
import { SwitchLayoutProvider } from './ui/SwitchLayoutProvider.jsx'
import { ModelQueryClientProvider } from './model/ModelQueryClientProvider.jsx'
import { SearchBarProvider } from './ui/SearchBarProvider.jsx'
import { UtilityProvider } from './model/UtilityProvider.jsx'

const queryClient = new QueryClient()

const providers = [
    [QueryClientProvider, { client: queryClient }],
    [ManageModelProvider],
    [TitleProvider],
    //[ModelQueryClientProvider],
    [VisibilityProvider],
    //[SearchBarProvider],
    [SwitchLayoutProvider],
    [CheckboxProvider],
    //[UtilityProvider]
];

const Compose = ({ providers, children }) => {
    return providers.reduceRight((acc, provider) => {
        if (Array.isArray(provider)) {
            const [Provider, props] = provider;
            return <Provider {...props}>{acc}</Provider>;
        }
        const Provider = provider;
        return <Provider>{acc}</Provider>;
    }, children);
};

const ProviderApp = ({ children }) => {
    return (
        <Compose providers={providers}>
            {children}
        </Compose>
    )
}

export default ProviderApp