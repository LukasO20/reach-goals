import { useContext } from 'react'

import { VisibilityContext } from '../../../provider/VisibilityProvider.jsx'
import { useSwitchLayout } from '../../../provider/SwitchLayoutProvider.jsx'

import ModalForm from './ModalForm/ModalForm.jsx'
import ModalConfig from './ModalConfig/ModalConfig.jsx'

import './ModalSwitcher.scss'

const ModalSwitcherCenter = () => {
    const { visibleElements } = useContext(VisibilityContext)
    const { layout } = useSwitchLayout()

    const showModalCenter = visibleElements.includes('modal-center') ? 'show' : ''
    const typeModalLayout = layout.modal.layoutName
    const typeVisibility = visibleElements[1]

    const renderModal = (type) => {
        if (!typeof type === 'string') return console.error('Invalid type for renderModal')

        if (type === 'form') {
            return <ModalForm />
        } else if (type === 'config') {
            return <ModalConfig />
        }
    }

    return (
        <div className={`container-modal modal-center ${typeModalLayout} ${typeVisibility} ${showModalCenter}`}>
            {renderModal(typeModalLayout)}
        </div>
    )
}

export default ModalSwitcherCenter