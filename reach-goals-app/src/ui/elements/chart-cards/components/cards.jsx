import { useRef } from 'react'

import { calculatePercent } from '../../../../utils/utils.js'

import ButtonAction from '../../button-action'
import Icons from '../../icons'

/** @typedef {import('../types.js').CardProps} Props */

/**
 * @param {Props} props
 */
const Cards = ({
    type,
    title,
    quantity,
    totalQuantity,
    renderBody,
    onModalChartCards,
    anchorCalculatePosition
}) => {
    const buttonRef = useRef(null)

    const handleButtonActionClick = () => {
        anchorCalculatePosition?.(buttonRef)
        onModalChartCards?.()
    }

    const percentLabel = calculatePercent(quantity, totalQuantity)
    const activityLabel = quantity === 1 ?
        `${quantity} activity - ${totalQuantity} activities`
        : `${quantity} activities - ${totalQuantity} activities`
    const hasActivity = quantity

    return (
        <div className={`card-chart ${type}`}>
            <div className='head'>
                <div>
                    <div>
                        <Icons icon={`icon-${type}`} />
                        {title}
                    </div>
                    <label className='label-percent'>
                        {percentLabel}%
                    </label>
                </div>
                {hasActivity && (
                    <div>
                        <label className='label-activity'>{activityLabel}</label>
                    </div>
                )}
            </div>
            {renderBody && (
                <div className='body'>
                    <ButtonAction
                        innerRef={buttonRef}
                        classBtn='cards-details plan-round max-width' 
                        icon='icon-plus' 
                        title='see details'
                        onClick={handleButtonActionClick} 
                    />
                </div>
            )}
        </div>
    )
}

export default Cards 