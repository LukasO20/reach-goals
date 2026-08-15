import { useRef, useState } from 'react'
import { useOutsideClick } from '../../../hooks/useOutsideClick.js'
import { useAnchorPosition } from '../../../hooks/useAnchorPosition.js'

import { getTransform } from '../../../utils/utils.js'

import ButtonAction from '../../elements/button-action'
import ModalUserContent from './components/modal-user.content.jsx'
import Tooltip from '../../elements/tooltip'

import './style.scss'

/** @typedef {import('./types.js').ModalUserProps & React.HTMLAttributes<HTMLDivElement>} Props */

/**
 * @param {Props} props
 */
const ModalUser = ({ visitor, mutationLoading, logoutSession, ...rest }) => {
    const [showModalUserContent, setShowModalUserContent] = useState(false)
    const { coords, calculatePosition } = useAnchorPosition()

    const modalUserContentRef = useRef(null)
    const containerRef = useRef(null)
    const buttonRef = useRef(null)

    useOutsideClick(modalUserContentRef, () => {
        setShowModalUserContent(false)
    })

    const handleOnModalUserContent = (elementTarget) => {
        calculatePosition(elementTarget, containerRef.current)
        setShowModalUserContent(true)
    }

    return (
        <div className='container-modal-user' ref={containerRef} {...rest}>
            <Tooltip title='Profile panel'>
                <ButtonAction
                    classBtn='circle user'
                    icon='icon-user'
                    onClick={(e) => handleOnModalUserContent(e.event.target)}
                    innerRef={buttonRef}
                />
            </Tooltip>
            {showModalUserContent && (
                <ModalUserContent
                    style={{
                        position: 'absolute',
                        left: `${coords.x}px`,
                        top: `25px`,
                        minWidth: `${coords.width}px`,
                        transform: getTransform(
                            coords.placementX,
                            coords.placementY
                        ),
                    }}
                    visitor={visitor}
                    mutationLoading={mutationLoading}
                    logoutSession={logoutSession}
                    ref={modalUserContentRef}
                />
            )}
        </div>
    )
}

export default ModalUser
