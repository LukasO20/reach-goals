import { TitleProvider } from './ui/TitleProvider.jsx'
import { VisibilityProvider } from './ui/VisibilityProvider.jsx'
import { CheckboxProvider } from './ui/CheckboxProvider.jsx'
import { ManageModelProvider } from './model/ManageModelProvider.jsx'
import { SwitchLayoutProvider } from './ui/SwitchLayoutProvider.jsx'
import { ModelQueryClientProvider } from './model/ModelQueryClientProvider.jsx'
import { SearchBarProvider } from './ui/SearchBarProvider.jsx'
import { UtilityProvider } from './model/UtilityProvider.jsx'

const Compose = ({ providers, children }) => {
    return providers.reduceRight((acc, Provider) => {
        return <Provider>{acc}</Provider>
    }, children)
}

const providers = [
    ManageModelProvider,
    TitleProvider,     
    ModelQueryClientProvider,
    VisibilityProvider,
    SearchBarProvider,
    SwitchLayoutProvider,
    CheckboxProvider,
    UtilityProvider
];

const ProviderApp = ({ children }) => {
    return (
        <Compose providers={providers}>
            {children}
        </Compose>
    )
}

export default ProviderApp