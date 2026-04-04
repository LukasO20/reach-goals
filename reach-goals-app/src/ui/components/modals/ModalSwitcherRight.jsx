import { useVisibility } from '../../../provider/ui/VisibilityProvider'
import { useSwitchLayout } from '../../../provider/ui/SwitchLayoutProvider'

import { ModalTagWrapper } from './ModalTag/ModalTagWrapper'
import ModalDetails from './ModalDetails/ModalDetails'

import './ModalSwitcher.scss'

const ModalSwitcherRight = () => {
    const { visibleElements } = useVisibility()
    const { layout } = useSwitchLayout()

    const showModalRight = visibleElements.includes('modal-right') ? 'show' : ''
    const typeModalLayout = layout.modal.layoutName

    const isVisible = !!typeModalLayout && showModalRight === 'show'
    const isModalTag = typeModalLayout === 'tag'
    const isModalDetails = typeModalLayout === 'details'

    return (
        isVisible && (
            <div className={`container-modal modal-right ${typeModalLayout || ''} ${showModalRight}`}>
                {isModalTag && (<ModalTagWrapper />)}
                {isModalDetails && (<ModalDetails />)}
            </div>
        )
    )
}

export default ModalSwitcherRight