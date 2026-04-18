import { useVisibility } from '../../../provider/ui/VisibilityProvider.jsx'
import { useSwitchLayout } from '../../../provider/ui/SwitchLayoutProvider.jsx'

import { ModalTagWrapper } from './modal-tag/modal-tag-wrapper.jsx'
import ModalDetails from './modal-details'

import './style.scss'

const ModalSwitcherRight = () => {
    const { visibleElements } = useVisibility()
    const { data: { layout } } = useSwitchLayout()

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