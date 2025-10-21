import { TitleProvider } from './TitleProvider.jsx'
import { VisibilityProvider } from './VisibilityProvider.jsx'
import { CheckboxProvider } from './CheckboxProvider.jsx'
import { ManageModelProvider } from './ManageModelProvider.jsx'
import { ModalListProvider } from './ModalListProvider.jsx'
import { SwitchLayoutProvider } from './SwitchLayoutProvider.jsx'
import { MasterDataProvider } from './model/MasterDataProvider.jsx'
import { FilterModelProvider } from './model/FilterModelProvider.jsx'

const ProviderApp = ({ children }) => (
    <ManageModelProvider>
        <FilterModelProvider>
            <VisibilityProvider>
                <SwitchLayoutProvider>
                    <TitleProvider>
                        <ModalListProvider>
                            <CheckboxProvider>
                                {children}
                            </CheckboxProvider>
                        </ModalListProvider>
                    </TitleProvider>
                </SwitchLayoutProvider>
            </VisibilityProvider>
        </FilterModelProvider>
    </ManageModelProvider>
)

export default ProviderApp