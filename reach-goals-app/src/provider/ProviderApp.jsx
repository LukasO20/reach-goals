import { TitleProvider } from './TitleProvider'
import { VisibilityProvider } from './VisibilityProvider'
import { CheckboxProvider } from './CheckboxProvider'
import { ManageModelProvider } from './ManageModelProvider'
import { ModalListProvider } from './ModalListProvider'
import { SwitchLayoutProvider } from './SwitchLayoutProvider'
import { PageTypeProvider } from './PageTypeProvider'

const ProviderApp = ({ children }) => (
    <TitleProvider>
        <VisibilityProvider>
            <CheckboxProvider>
                <ManageModelProvider>
                    <ModalListProvider>
                        <SwitchLayoutProvider>
                            <PageTypeProvider>
                                {children}
                            </PageTypeProvider>
                        </SwitchLayoutProvider>
                    </ModalListProvider>
                </ManageModelProvider>
            </CheckboxProvider>
        </VisibilityProvider>
    </TitleProvider>
)

export default ProviderApp