import { useRef } from 'react'

import { useVisibility } from '../../../provider/ui/VisibilityProvider.jsx'
import { useManageModel } from '../../../provider/model/ManageModelProvider.jsx'
import { useSwitchLayout } from '../../../provider/ui/SwitchLayoutProvider.jsx'
import { useOutsideClick } from '../../../hooks/useOutsideClick.js'

import { visibilityMap } from '../../../utils/mapping/mappingUtils.js'
import { resetManageModelMap } from '../../../utils/mapping/mappingUtilsProvider.js'

import { ModalFormWrapper } from './modal-form/modal-form-wrapper.jsx'
import ModalConfig from './modal-config'

import { cx } from '../../../utils/utils.js'

import './style.scss'

const ModalSwitcherCenter = () => {
    const { visibleElements, toggleVisibility } = useVisibility()
    const { data: { layout } } = useSwitchLayout()
    const { resetManageModel } = useManageModel()
    const modalRef = useRef(null)

    const showModalCenter = visibleElements.includes('modal-center') ? 'show' : ''
    const typeModalLayout = layout.modal.layoutName
    const typeVisibility = visibleElements[1]

    const modalCenterClass = cx(`
        container-modal 
        modal-center
        ${showModalCenter}
        ${typeModalLayout}
        ${typeVisibility}
        `)

    const isVisible = !!typeModalLayout && !!typeVisibility && showModalCenter === 'show'
    const isModalForm = typeModalLayout === 'form'
    const isModalConfig = typeModalLayout === 'config'

    useOutsideClick(modalRef, () => {
        const allowedModalLayouts = ['modal-center', 'goal', 'assigment']
        const shouldCloseModalCenter = visibleElements.some((elements) => allowedModalLayouts.includes(elements))

        if (shouldCloseModalCenter && isModalForm) {
            if (isModalForm) resetManageModel(resetManageModelMap(['formModel', 'mainModelID', 'selectedModel']))
            toggleVisibility(visibilityMap(null))
        }
    })

    return (
        isVisible && (
            <div className={modalCenterClass} ref={modalRef}>
                {isModalForm && (<ModalFormWrapper />)}
                {isModalConfig && (<ModalConfig />)}
            </div>
        )
    )
}

export default ModalSwitcherCenter