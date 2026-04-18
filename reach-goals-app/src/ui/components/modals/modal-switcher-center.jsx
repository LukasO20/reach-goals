import { useVisibility } from '../../../provider/ui/VisibilityProvider.jsx'
import { useSwitchLayout } from '../../../provider/ui/SwitchLayoutProvider.jsx'

import { ModalFormWrapper } from './modal-form/modal-form-wrapper.jsx'
import ModalConfig from './modal-config'

import './style.scss'

const ModalSwitcherCenter = () => {
    const { visibleElements } = useVisibility()
    const { data: { layout } } = useSwitchLayout()

    const showModalCenter = visibleElements.includes('modal-center') ? 'show' : ''
    const typeModalLayout = layout.modal.layoutName
    const typeVisibility = visibleElements[1]

    const isVisible = !!typeModalLayout && !!typeVisibility && showModalCenter === 'show'
    const isModalForm = typeModalLayout === 'form'
    const isModalConfig = typeModalLayout === 'config'

    return (
        isVisible && (
            <div className={`container-modal modal-center ${typeModalLayout} ${typeVisibility} ${showModalCenter}`}>
                {isModalForm && (<ModalFormWrapper />)}
                {isModalConfig && (<ModalConfig />)}
            </div>
        )
    )
}

export default ModalSwitcherCenter