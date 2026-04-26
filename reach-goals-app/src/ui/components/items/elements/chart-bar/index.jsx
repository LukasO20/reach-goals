import ButtonAction from '../button-action/index.jsx'

import { iconMap } from '../../../../../utils/mapping/mappingIcons.jsx'

import './style.scss'

/** @typedef {import('./types.js').ChartBarProps} Props */

/**
 * @param {Props} props
 */
const ChartBar = ({ data, quantityActivity }) => {

    const calculatePercent = (value) => {
        if (quantityActivity === 0) return 0
        return ((value / quantityActivity) * 100).toFixed(2)
    }

    return (
        <div className='chart-bar'>
            {
                data.map((item) => {
                    const percentLabel = calculatePercent(item.quantity)
                    const activityLabel = item.quantity === 1 ? 'activity' : 'activities'

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
                                            <label className='label-percent'>{percentLabel}% - {item.quantity} {activityLabel}</label>
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