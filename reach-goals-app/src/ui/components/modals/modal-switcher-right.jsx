import { useRef } from 'react'

import { useVisibility } from '../../../provider/ui/VisibilityProvider.jsx'
import { useSwitchLayout } from '../../../provider/ui/SwitchLayoutProvider.jsx'
import { useOutsideClick } from '../../../hooks/useOutsideClick.js'

import { visibilityMap } from '../../../utils/mapping/mappingUtils.js'

import { ModalTagWrapper } from './modal-tag/modal-tag-wrapper.jsx'
import { ModalDetailsWrapper } from './modal-details/modal-details-wrapper.jsx'

import { cx } from '../../../utils/utils.js'

import './style.scss'

const ModalSwitcherRight = () => {
    const { visibleElements, toggleVisibility } = useVisibility()
    const { data: { layout } } = useSwitchLayout()
    const modalRef = useRef(null)

    const showModalRight = visibleElements.includes('modal-right') ? 'show' : ''
    const typeModalLayout = layout.modal.layoutName

    const modalRightClass = cx(`
        container-modal 
        modal-right 
        ${typeModalLayout}
        ${showModalRight}
        `)

    const isVisible = !!typeModalLayout && showModalRight === 'show'
    const isModalTag = typeModalLayout === 'tag'
    const isModalDetails = typeModalLayout === 'details'

    useOutsideClick(modalRef, () => {
        const allowedModalLayouts = ['modal-right']
        const shouldCloseModalCenter = visibleElements.some((elements) => allowedModalLayouts.includes(elements))

        if (shouldCloseModalCenter) {
            toggleVisibility(visibilityMap(null))
        }
    })

    return (
        isVisible && (
            <div className={modalRightClass} ref={modalRef}>
                {isModalTag && (<ModalTagWrapper />)}
                {isModalDetails && (<ModalDetailsWrapper />)}
            </div>
        )
    )
}

export default ModalSwitcherRight