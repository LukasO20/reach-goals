import { useContext } from 'react'

import { VisibilityContext } from '../../../provider/VisibilityProvider'
import { useSwitchLayout } from '../../../provider/SwitchLayoutProvider'

import ModalTag from './ModalTag/ModalTag'
import ModalDetails from './ModalDetails/ModalDetails'

import './ModalSwitcher.scss'

const ModalSwitcherRight = () => {
    const { visibleElements } = useContext(VisibilityContext)
    const { layout } = useSwitchLayout()

    const showModalRight = visibleElements.includes('modal-right') ? 'show' : ''
    const typeModalLayout = layout.modal.layoutName

    const renderModal = (type) => {
        if (!typeof type === 'string') return console.error('Invalid type for renderModal')

        if (type === 'tag') {
            return <ModalTag />
        } else if (type === 'details') {
            return <ModalDetails />
        }
    }

    return (
        <div className={`container-modal modal-right ${typeModalLayout} ${showModalRight}`}>
            {renderModal(typeModalLayout)}
        </div>
    )
}

export default ModalSwitcherRight