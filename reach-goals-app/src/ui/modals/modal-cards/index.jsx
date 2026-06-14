import { cx } from '../../../utils/utils.js'

import ButtonAction from '../../items/elements/button-action'
import Icons from '../../items/elements/icons'
import ModelSwitcher from '../../items/models/model-switcher'

import './style.scss'

/** @typedef {import('./types.js').ModalChartCardsProps & React.HTMLAttributes<HTMLDivElement>} Props */

/**
 * @param {Props} props
 */
const ModalCards = ({ data, icon, title, onShowModalCards, ...rest }) => {
    const dataRender = Object.entries(data).map(([key, itens]) => ({
        type: key,
        data: itens.map((item) => item)
    }))

    const displayModesProps = {
        type: ['card-mini'],
        actions: []
    }

    const hasMoreChartCards = dataRender.flatMap((item) => item.data).length >= 7

    const chartCardsModalBodyClass = cx(`
        body
        ${hasMoreChartCards && 'scrollable'}
    `)

    return (
        <div className='container-chart-cards-modal' {...rest}>
            <div className='head'>
                <span className='title'>
                    <Icons icon={`icon-${icon}`} />
                    <span>
                        {title}
                    </span>
                </span>
                <ButtonAction classBtn='circle close' icon='close' onClick={() => onShowModalCards(false)} />
            </div>
            <div className={chartCardsModalBodyClass}>
                {dataRender.map((model) => {
                    const propsReference = {
                        display: displayModesProps,
                        source: model.data,
                    }
                    return <ModelSwitcher key={model.type} type={model.type} propsReference={propsReference} />
                })}
            </div>
        </div>
    )
}

export default ModalCards