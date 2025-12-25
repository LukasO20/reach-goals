import { useContext } from 'react'

import { VisibilityContext } from '../../../provider/VisibilityProvider'
import { useSwitchLayout } from '../../../provider/SwitchLayoutProvider'

import ModalForm from '../panels/ModalForm/ModalForm'
import ModalConfig from '../panels/ModalConfig/ModalConfig'

import './ModalSwitcher.scss'

const ModalSwitcherCenter = () => {
    const { visibleElements } = useContext(VisibilityContext)
    const { layoutComponent } = useSwitchLayout()

    const showModalCenter = visibleElements.includes('modal-center') ? 'show' : ''
    const typeModalLayout = layoutComponent.panel.layout
    const typeModelVisible = visibleElements[1]

    const renderModal = (type) => {
        if (!typeof type === 'string') return console.error('Invalid type for renderModal')

        if (type === 'form') {
            return <ModalForm type={typeModelVisible} />
        } else if (type === 'config') {
            return <ModalConfig />
        }
    }

    return (
        <div className={`container-modal modal-center ${typeModalLayout} ${typeModelVisible} ${showModalCenter}`}>
            {renderModal(typeModalLayout)}
        </div>
    )
}

export default ModalSwitcherCenter