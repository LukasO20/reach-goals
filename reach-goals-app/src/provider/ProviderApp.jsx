import { TitleProvider } from './TitleProvider'
import { VisibilityProvider } from './VisibilityProvider'
import { CheckboxProvider } from './CheckboxProvider'
import { ManageModelProvider } from './ManageModelProvider'
import { ModalListProvider } from './ModalListProvider'
import { SwitchLayoutProvider } from './SwitchLayoutProvider'
import { PageTypeProvider } from './PageTypeProvider'

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