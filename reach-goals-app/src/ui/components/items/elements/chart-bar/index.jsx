import ButtonAction from '../button-action/index.jsx'

import { iconMap } from '../../../../../utils/mapping/mappingIcons.jsx'
import { calculatePercent } from '../../../../../utils/utils.js'

import './style.scss'

/** @typedef {import('./types.js').ChartBarProps} Props */

/**
 * @param {Props} props
 */
const ChartBar = ({ data, quantity, showLegend }) => {

    const activityLabel = quantity === 1 ? `${quantity} activity` : `${quantity} activities`

    return (
        <div className='chart-bar'>
            {showLegend && (
                <label className='label-activity'>{activityLabel}</label>
            )}
            {
                data.map((item) => {
                    const percentLabel = calculatePercent(item.quantity, quantity)
                    const activityLabel = item.quantity === 1 ? `${item.quantity} activity` : `${item.quantity} activities`

                    const hasActivity = !!item.quantity

                    return (
                        <div className={`bar ${item.id}`} key={item.id}>
                            <div className={`bar-progress`} style={{ width: `${percentLabel}%` }}>
                                <div className='bar-title'>
                                    <div>
                                        {iconMap[item.id]}
                                        <label>{item.label}</label>
                                    </div>
                                    {hasActivity && (
                                        <div>
                                            <label className='label-percent'>{percentLabel}% - {activityLabel}</label>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className='bar-actions'>
                                <ButtonAction classBtn='details-activity circle' icon='arrowright' />
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ChartBar