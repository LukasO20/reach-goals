import { useRef } from 'react'

import { useVisibility } from '../../provider/ui/visibility-provider'
import { useSwitchLayout } from '../../provider/ui/switch-layout-provider'
import { useOutsideClick } from '../../hooks/useOutsideClick.js'
import { useManageModel } from '../../provider/model/manage-model-provider'

import { visibilityMap, switchLayoutMap } from '../../utils/mapping/mappingUtils.js'

import { ModalTagWrapper } from './modal-tag/modal-tag-wrapper.jsx'
import { ModalDetailsWrapper } from './modal-details/modal-details-wrapper.jsx'
import Overlay from '../items/elements/overlay'

import { cx } from '../../utils/utils.js'

import './style.scss'

const ModalSwitcherRight = () => {
    const { visibleElements, toggleVisibility } = useVisibility()
    const { model } = useManageModel()
    const { data: { layout }, setSwitchLayout } = useSwitchLayout()
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
            const buildSwitchLayoutMap = switchLayoutMap({
                area: 'modal',
                layout: {
                    modalName: null,
                    layoutName: null
                }
            })
            toggleVisibility(visibilityMap(null))
            setSwitchLayout(buildSwitchLayoutMap)
        }
    })

    return (
        isVisible && (
            <>
                <Overlay />
                <div className={modalRightClass} ref={modalRef}>
                    {isModalTag && (<ModalTagWrapper />)}
                    {isModalDetails && (<ModalDetailsWrapper modelID={model.mainModelID} type={model.typeModel} />)}
                </div>
            </>
        )
    )
}

export default ModalSwitcherRight