import { useRef, useState } from 'react'
import { useAnchorPosition } from '../../../../../hooks/useAnchorPosition.js'

import ButtonAction from '../button-action/index.jsx'
import ModalChartCards from '../../../modals/modal-chart-cards/index.jsx'

import { iconMap } from '../../../../../utils/mapping/mappingIcons.jsx'
import { calculatePercent, getTransform } from '../../../../../utils/utils.js'

import { cx } from '../../../../../utils/utils.js'

import './style.scss'

/** @typedef {import('../chart-cards/types.js').ModalChartCardsProps} ModalChartCardsProps */

/** @typedef {import('./types.js').ChartBarProps} Props */

/**
 * @param {Props} props
 */
const ChartBar = ({ data, quantity, showLegend }) => {
    /** @type {[ModalChartCardsProps, React.Dispatch<React.SetStateAction<ModalChartCardsProps>>]} */
    const [modalChartCards, setModalChartCards] = useState()
    const [showModalChartCards, setShowModalChartCards] = useState(false)
    const { coords, calculatePosition } = useAnchorPosition()

    const activityLabel = quantity === 1 ? 'activity' : 'activities'

    const containerRef = useRef(null)

    const handleCalculatePosition = (elementTarget) => {
        calculatePosition(elementTarget, containerRef.current)
    }

    /** @param {ModalChartCardsProps} */
    const hancleOnModalChartCards = ({ icon, title, data }) => {
        setModalChartCards({ icon, title, data })
        setShowModalChartCards(true)
    }

    return (
        <div className='chart-bar' ref={containerRef}>
            <div className='head'>
                {showLegend && (
                    <label className='label-activity'>
                        {quantity} {activityLabel}
                    </label>
                )}
            </div>
            <div className='body'>
                {
                    data.map((item) => {
                        const hasActivity = item.quantity
                        const percentLabel = calculatePercent(item.quantity, quantity)
                        const labelMessage = hasActivity ? `${item.label} - ${item.quantity} ${activityLabel}` : `No ${item.label}s found`
                        const iconModalChartCards = item.id

                        const barClass = cx(`
                            bar
                            ${item.id}
                            ${!hasActivity && 'empty'}
                         `)

                        return (
                            <div className={barClass} key={item.id}>
                                <div className={`bar-progress`} style={{ height: `${percentLabel}%` }}>
                                    <div className='bar-title'>
                                        {iconMap[item.id]}
                                        <label className='label-message'>{labelMessage}</label>
                                    </div>
                                    {hasActivity && (
                                        <label className='label-percent'>{percentLabel}%</label>
                                    )}
                                </div>
                                <div className='bar-actions'>
                                    {hasActivity && (
                                        <ButtonAction
                                            classBtn='details-activity circle'
                                            icon='plus'
                                            onClick={(e) => {
                                                hancleOnModalChartCards({ icon: iconModalChartCards, title: item.label, data: item.activities })
                                                handleCalculatePosition(e.event.target)
                                            }}
                                        />
                                    )}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            {showModalChartCards && (
                <ModalChartCards
                    style={{
                        position: 'absolute',
                        left: `${coords.x}px`,
                        top: `${coords.y}px`,
                        minWidth: `${coords.width}px`,
                        transform: getTransform(coords.placementX, coords.placementY),
                    }}
                    data-placement-y={coords.placementY}
                    data-placement-x={coords.placementX}
                    icon={modalChartCards.icon}
                    title={modalChartCards.title}
                    data={modalChartCards.data}
                    onShowModalChartCards={setShowModalChartCards}
                />
            )}
        </div>
    )
}

export default ChartBar