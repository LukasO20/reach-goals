import { TitleProvider } from './TitleProvider.jsx'
import { VisibilityProvider } from './VisibilityProvider.jsx'
import { CheckboxProvider } from './CheckboxProvider.jsx'
import { ManageModelProvider } from './ManageModelProvider.jsx'
import { SwitchLayoutProvider } from './SwitchLayoutProvider.jsx'
import { FilterModelProvider } from './model/FilterModelProvider.jsx'
import { SearchBarProvider } from './SearchBarProvider.jsx'

const ProviderApp = ({ children }) => (
    <ManageModelProvider>
        <TitleProvider>
            <VisibilityProvider>
                <FilterModelProvider>
                    <SearchBarProvider>
                        <SwitchLayoutProvider>
                            <CheckboxProvider>
                                {children}
                            </CheckboxProvider>
                        </SwitchLayoutProvider>
                    </SearchBarProvider>
                </FilterModelProvider>
            </VisibilityProvider>
        </TitleProvider>
    </ManageModelProvider>
)

export default ProviderApp