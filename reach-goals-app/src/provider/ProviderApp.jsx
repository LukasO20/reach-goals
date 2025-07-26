import { TitleProvider } from './TitleProvider.jsx'
import { VisibilityProvider } from './VisibilityProvider.jsx'
import { CheckboxProvider } from './CheckboxProvider.jsx'
import { ManageModelProvider } from './ManageModelProvider.jsx'
import { ModalListProvider } from './ModalListProvider.jsx'
import { SwitchLayoutProvider } from './SwitchLayoutProvider.jsx'
import { PageTypeProvider } from './PageTypeProvider.jsx'
import { DataModelProvider } from './DataModelProvider.jsx'

const ProviderApp = ({ children }) => (
    <ManageModelProvider>
        <DataModelProvider>
            <VisibilityProvider>
                <TitleProvider>
                    <CheckboxProvider>
                        <ModalListProvider>
                            <SwitchLayoutProvider>
                                <PageTypeProvider>
                                    {children}
                                </PageTypeProvider>
                            </SwitchLayoutProvider>
                        </ModalListProvider>
                    </CheckboxProvider>
                </TitleProvider>
            </VisibilityProvider>
        </DataModelProvider>
    </ManageModelProvider>

)

export default ProviderApp