import { useCountdown } from '../../../../hooks/use-count-down.js'

import ButtonAction from '../../../elements/button-action'
import Icons from '../../../elements/icons'
import ModalUserQuotaCard from './modal-user-quota.card.jsx'

import { safeVisitor } from '../defaults.js'
import ModalUserQuotaMessage from './modal-user-quota.message.jsx'

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

    const hasSomeQuotaExceeded = Object.values(
        visitor.quotaModel.quotaExceeded
    ).some((item) => item)

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
                <ModalUserQuotaCard quotaModel={visitor.quotaModel} />
                {hasSomeQuotaExceeded && <ModalUserQuotaMessage />}
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
