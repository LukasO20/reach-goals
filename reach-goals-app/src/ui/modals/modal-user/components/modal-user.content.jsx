import { useCountdown } from '../../../../hooks/useCountDown.js'

import ButtonAction from '../../../elements/button-action/index.jsx'
import Icons from '../../../elements/icons/index.jsx'

import { safeVisitor } from '../defaults.js'

/** @typedef {import('../types.js').ModalUserProps & React.HTMLAttributes<HTMLDivElement>} Props */

/**
 * @param {Props} props
 */
const ModalUserContent = ({
    visitor = safeVisitor,
    mutationLoading,
    logoutSession,
    ...rest
}) => {
    const expiresTimer = useCountdown(visitor.expiresAt)

    const handleLogoutButtonClick = () => logoutSession(visitor.id)

    return (
        <div className='modal-user-content' {...rest}>
            <div className='head'>
                <div>
                    <Icons icon='icon-user-circle' /> {visitor.name}
                </div>
                <label>{visitor.email}</label>
            </div>
            <div className='body'>
                <div className='timer'>
                    <span>Your session timer is:</span>
                    <label>{expiresTimer.formatted}</label>
                </div>
                <ButtonAction
                    classBtn='sign-out plan-round max-width'
                    title='Sign out'
                    icon='icon-logout'
                    onClick={handleLogoutButtonClick}
                    pendingState={mutationLoading}
                />
            </div>
        </div>
    )
}

export default ModalUserContent
