import { useVisibility } from '../../../provider/VisibilityProvider.jsx'
import { useSwitchLayout } from '../../../provider/SwitchLayoutProvider.jsx'

import ModalForm from './ModalForm/ModalForm.jsx'
import ModalConfig from './ModalConfig/ModalConfig.jsx'

import './ModalSwitcher.scss'

const ModalSwitcherCenter = () => {
    const { visibleElements } = useVisibility()
    const { layout } = useSwitchLayout()

    const showModalCenter = visibleElements.includes('modal-center') ? 'show' : ''
    const typeModalLayout = layout.modal.layoutName
    const typeVisibility = visibleElements[1]

    const isVisible = !!typeModalLayout && !!typeVisibility && showModalCenter === 'show'
    const isModalForm = typeModalLayout === 'form'
    const isModalConfig = typeModalLayout === 'config'

    return (
        isVisible && (
            <div className={`container-modal modal-center ${typeModalLayout} ${typeVisibility} ${showModalCenter}`}>
                {isModalForm && (<ModalForm />)}
                {isModalConfig && (<ModalConfig />)}
            </div>
        )
    )
}

export default ModalSwitcherCenter