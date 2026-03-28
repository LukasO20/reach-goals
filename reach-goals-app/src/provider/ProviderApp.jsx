import { TitleProvider } from './ui/TitleProvider.jsx'
import { VisibilityProvider } from './ui/VisibilityProvider.jsx'
import { CheckboxProvider } from './ui/CheckboxProvider.jsx'
import { ManageModelProvider } from './model/ManageModelProvider.jsx'
import { SwitchLayoutProvider } from './ui/SwitchLayoutProvider.jsx'
import { ModelQueryClientProvider } from './model/ModelQueryClientProvider.jsx'
import { SearchBarProvider } from './ui/SearchBarProvider.jsx'
import { UtilityProvider } from './model/UtilityProvider.jsx'

const ProviderApp = ({ children }) => (
    <ManageModelProvider>
        <TitleProvider>
            <VisibilityProvider>
                <ModelQueryClientProvider>
                    <SearchBarProvider>
                        <SwitchLayoutProvider>
                            <CheckboxProvider>
                                <UtilityProvider>
                                    {children}
                                </UtilityProvider>
                            </CheckboxProvider>
                        </SwitchLayoutProvider>
                    </SearchBarProvider>
                </ModelQueryClientProvider>
            </VisibilityProvider>
        </TitleProvider>
    </ManageModelProvider>
)

export default ProviderApp