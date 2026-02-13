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

    const isVisible = !!typeModalLayout && showModalRight === 'show'
    const isModalTag = typeModalLayout === 'tag'
    const isModalDetails = typeModalLayout === 'details'

    return (
        isVisible && (
            <div className={`container-modal modal-right ${typeModalLayout || ''} ${showModalRight}`}>
                {isModalTag && (<ModalTag />)}
                {isModalDetails && (<ModalDetails />)}
            </div>
        )
    )
}

export default ModalSwitcherRight