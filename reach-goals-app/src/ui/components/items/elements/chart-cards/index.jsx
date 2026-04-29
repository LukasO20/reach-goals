import { useState } from 'react'
import { useTransformModel } from '../../../../../hooks/useTransformModel.js'
import { useAnchorPosition } from '../../../../../hooks/useAnchorPosition.js'

import Cards from './components/cards.jsx'
import ModalChartCards from '../../../modals/modal-chart-cards/index.jsx'

import './style.scss'

/** @typedef {import('./types.js').ModalChartCardsProps} ModalChartCardsProps */

/** @typedef {import('./types.js').ChartCardsProps} ChartCardsProps */

/**
 * @param {ChartCardsProps} props
 */
const ChartCards = ({ data }) => {
    /** @type {[ModalChartCardsProps, React.Dispatch<React.SetStateAction<ModalChartCardsProps>>]} */
    const [modalChartCards, setModalChartCards] = useState()
    const [showModalChartCards, setShowModalChartCards] = useState(false)
    const { coords, calculatePosition } = useAnchorPosition()

    /** @param {ModalChartCardsProps} */
    const hancleOnModalChartCards = ({ icon, title, data }) => {
        setModalChartCards({ icon, title, data })
        setShowModalChartCards(true)
    }

    const chartProgress = useTransformModel({ source: data, byStatus: 'progress' })
    const chartCancel = useTransformModel({ source: data, byStatus: 'cancel' })
    const chartConclude = useTransformModel({ source: data, byStatus: 'conclude' })
    const chartTags = useTransformModel({ source: data, byAttr: 'tags' })

    const totalQuantity = data.goal?.length + data.assignment?.length

    const chartProgressQuantity = chartProgress.goal?.length + chartProgress.assignment?.length
    const chartConcludeQuantity = chartConclude.goal?.length + chartConclude.assignment?.length
    const chartCancelQuantity = chartCancel.goal?.length + chartCancel.assignment?.length
    const chartTagsQuantity = chartTags.goal?.length + chartTags.assignment?.length

    console.log('CORDS - ', coords)
    return (
        <div className='chart-cards'>
            <Cards
                type='progress'
                title='Progress'
                quantity={chartProgressQuantity}
                totalQuantity={totalQuantity}
                renderBody={true}
                onModalChartCards={() => hancleOnModalChartCards({ icon: 'progress', title: 'Progress', data: chartProgress })}
                anchorCalculatePosition={calculatePosition}
            />
            <Cards
                type='conclude'
                title='Conclude'
                quantity={chartConcludeQuantity}
                totalQuantity={totalQuantity}
                renderBody={true}
                onModalChartCards={() => hancleOnModalChartCards({ icon: 'check', title: 'Conclude', data: chartConclude })}
                anchorCalculatePosition={calculatePosition}
            />
            <Cards
                type='cancel'
                title='Cancel'
                quantity={chartCancelQuantity}
                totalQuantity={totalQuantity}
                renderBody={true}
                onModalChartCards={() => hancleOnModalChartCards({ icon: 'cancel', title: 'Canceled', data: chartCancel })}
                anchorCalculatePosition={calculatePosition}
            />
            <Cards
                type='tag'
                title='Tags'
                quantity={chartTagsQuantity}
                totalQuantity={totalQuantity}
                renderBody={true}
                onModalChartCards={() => hancleOnModalChartCards({ icon: 'tag', title: 'With tags', data: chartTags })}
                anchorCalculatePosition={calculatePosition}
            />
            {showModalChartCards && (
                <ModalChartCards
                    style={{
                        position: 'absolute',
                        left: `${coords.x}px`,
                        top: `${coords.y}px`,
                        transform: coords.placement === 'top' ? 'translateY(-160%)' : 'none',
                    }}
                    data-placement={coords.placement}
                    icon={modalChartCards.icon}
                    title={modalChartCards.title}
                    data={modalChartCards.data}
                    onShowModalChartCards={setShowModalChartCards}
                />
            )}
        </div>
    )
}

export default ChartCards