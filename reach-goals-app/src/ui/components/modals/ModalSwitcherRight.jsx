import { useContext } from 'react'

import { VisibilityContext } from '../../../provider/VisibilityProvider'
import { useSwitchLayout } from '../../../provider/SwitchLayoutProvider'

import ModalTag from './ModalTag/ModalTag'
import ModalDetails from './ModalDetails/ModalDetails'

const ModalSwitcherRight = () => {
    const { visibleElements } = useContext(VisibilityContext)
    const { layoutComponent } = useSwitchLayout()

    const showModalRight = visibleElements.includes('modal-right') ? 'show' : ''
    const typeModalLayout = layoutComponent.panel.layout
    const typeModelVisible = visibleElements[1]

    const renderModal = (type) => {
        if (!typeof type === 'string') return console.error('Invalid type for renderModal')

        if (type === 'tag') {
            return <ModalTag />
        } else if (type === 'details') {
            return <ModalDetails type={typeModelVisible} />
        }
    }

    console.log('VISLBE HEHEHE - ', typeModelVisible)
    return (
        <div className={`container-modal modal-right ${showModalRight}`}>
            {renderModal(typeModalLayout)}
        </div>
    )
}

export default ModalSwitcherRight