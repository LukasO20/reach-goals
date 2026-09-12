import { useRef } from 'react'
import { useOutsideClick } from '../../../hooks/use-outside-click.js'
import { useAnchorPosition } from '../../../hooks/use-anchor-position.js'
import { useVisibility } from '../../../provider/ui/visibility-provider'

import { getTransform } from '../../../utils/utils.js'
import { visibilityMap } from '../../../utils/mapping/mapping-utils.js'

import ButtonAction from '../../elements/button-action'
import ModalUserContent from './components/modal-user.content.jsx'
import Tooltip from '../../elements/tooltip'
import Dots from '../../elements/dots'

import './style.scss'

/** @typedef {import('./types.js').ModalUserProps & React.HTMLAttributes<HTMLDivElement>} Props */

/**
 * @param {Props} props
 */
const ModalUser = ({ visitor, mutationLoading, logoutSession, ...rest }) => {
    const { visibleElements = [], toggleVisibility } = useVisibility()
    const { coords, calculatePosition } = useAnchorPosition()

    const containerRef = useRef(null)

    const handleOnModalUserContent = (elementTarget) => {
        calculatePosition(elementTarget, containerRef.current)
    }

    const hasSomeQuotaExceeded = Object.values(
        visitor.quotaModel.quotaExceeded
    ).some((item) => item)

    const isShowModalUserContent =
        visibleElements.includes('modal-user-content')

    useOutsideClick(containerRef, () => {
        if (isShowModalUserContent) {
            toggleVisibility(
                visibilityMap('modal-user-content', { remove: true })
            )
        }
    })

    return (
        <div className='container-modal-user' ref={containerRef} {...rest}>
            <Tooltip title='Profile panel'>
                {hasSomeQuotaExceeded && <Dots quantity={1} />}
                <ButtonAction
                    classBtn='circle user'
                    icon='icon-user'
                    onClick={(e) => handleOnModalUserContent(e.event.target)}
                    visibility={visibilityMap('modal-user-content')}
                />
            </Tooltip>
            {isShowModalUserContent && (
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
                />
            )}
        </div>
    )
}

export default ModalUser
