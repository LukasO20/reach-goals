import { TitleProvider } from './TitleProvider.jsx'
import { VisibilityProvider } from './VisibilityProvider.jsx'
import { CheckboxProvider } from './CheckboxProvider.jsx'
import { ManageModelProvider } from './ManageModelProvider.jsx'
import { ModalListProvider } from './ModalListProvider.jsx'
import { SwitchLayoutProvider } from './SwitchLayoutProvider.jsx'
import { PageTypeProvider } from './PageTypeProvider.jsx'

const ProviderApp = ({ children }) => (
    <ManageModelProvider>
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
    </ManageModelProvider>

)

export default ProviderApp