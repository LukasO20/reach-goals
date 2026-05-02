import { useRef } from 'react'
import { useOutsideClick } from '../../../../hooks/useOutsideClick.js'

import { iconMap } from '../../../../utils/mapping/mappingIcons.jsx'

import { cx } from '../../../../utils/utils.js'

import ButtonAction from '../../items/elements/button-action/index.jsx'
import ModelSwitcher from '../../items/models/model-switcher/index.jsx'

import './style.scss'

/** @typedef {import('./types.js').ModalChartCardsProps & React.HTMLAttributes<HTMLDivElement>} Props */

/**
 * @param {Props} props
 */
const ModalChartCards = ({ data, icon, title, onShowModalChartCards, ...rest }) => {
    const dataRender = Object.entries(data).map(([key, itens]) => ({
        type: key,
        data: itens.map((item) => item)
    }))

    const modalRef = useRef(null)

    const displayModesProps = {
        type: ['card-mini'],
        actions: []
    }

    useOutsideClick(modalRef, () => onShowModalChartCards(false))

    const hasMoreChartCards = dataRender.flatMap((item) => item.data).length > 8

    const chartCardsModalBodyClass = cx(`
        body
        ${hasMoreChartCards && 'scrollable'}
    `)

    return (
        <div className='container-chart-cards-modal' ref={modalRef} {...rest}>
            <div className='head'>
                <span className='title'>
                    {iconMap[icon]}
                    <span>
                        {title}
                    </span>
                </span>
                <ButtonAction classBtn='circle close' icon='close' onClick={() => onShowModalChartCards(false)} />
            </div>
            <div className={chartCardsModalBodyClass}>
                {dataRender.map((model) => {
                    const propsReference = {
                        display: displayModesProps,
                        source: model.data
                    }

                    return <ModelSwitcher key={model.type} type={model.type} propsReference={propsReference} />
                })}
            </div>
        </div>
    )
}

export default ModalChartCards