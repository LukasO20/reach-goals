import { TitleProvider } from './TitleProvider.jsx'
import { VisibilityProvider } from './VisibilityProvider.jsx'
import { CheckboxProvider } from './CheckboxProvider.jsx'
import { ManageModelProvider } from './ManageModelProvider.jsx'
import { ModalListProvider } from './ModalListProvider.jsx'
import { SwitchLayoutProvider } from './SwitchLayoutProvider.jsx'
import { MasterDataProvider } from './model/MasterDataProvider.jsx'

const ProviderApp = ({ children }) => (
    <MasterDataProvider>
        <ManageModelProvider>
            <VisibilityProvider>
                <TitleProvider>
                    <CheckboxProvider>
                        <ModalListProvider>
                            <SwitchLayoutProvider>
                                {children}
                            </SwitchLayoutProvider>
                        </ModalListProvider>
                    </CheckboxProvider>
                </TitleProvider>
            </VisibilityProvider>
        </ManageModelProvider>
    </MasterDataProvider>
)

export default ProviderApp