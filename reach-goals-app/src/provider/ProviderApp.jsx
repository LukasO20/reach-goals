import { TitleProvider } from './TitleProvider.jsx'
import { VisibilityProvider } from './VisibilityProvider.jsx'
import { CheckboxProvider } from './CheckboxProvider.jsx'
import { ManageModelProvider } from './ManageModelProvider.jsx'
import { SwitchLayoutProvider } from './SwitchLayoutProvider.jsx'
import { FilterModelProvider } from './model/FilterModelProvider.jsx'

const ProviderApp = ({ children }) => (
    <ManageModelProvider>
        <FilterModelProvider>
            <VisibilityProvider>
                <SwitchLayoutProvider>
                    <TitleProvider>
                        <CheckboxProvider>
                            {children}
                        </CheckboxProvider>
                    </TitleProvider>
                </SwitchLayoutProvider>
            </VisibilityProvider>
        </FilterModelProvider>
    </ManageModelProvider>
)

export default ProviderApp