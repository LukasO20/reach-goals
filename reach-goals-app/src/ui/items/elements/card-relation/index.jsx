import { Draggable } from '@adaptabletools/react-beautiful-dnd'

import { displayModesMap } from '../../../../utils/mapping/mappingUtils.js'

import { cx } from '../../../../utils/utils.js'

import Icons from '../icons'
import Card from '../card'
import CardMini from '../card-mini'

import './style.scss'

/** @typedef {import('./types.js').CardRelationProps} Props */

/**
 * @param {Props} props
 */
const CardRelation = ({
    type,
    display = displayModesMap,
    typeRelation,
    checkboxState,
    showTags,
    status,
    model,
    pendingState,
    clickFunction,
    draggable,
}) => {

    const isCard = display.type.includes('card')
    const isCardMini = display.type.includes('card-mini')

    const componentsMap = {
        card: Card,
        cardMini: CardMini,
    }

    const Render = isCard ? componentsMap.card : isCardMini ? componentsMap.cardMini : null

    return model
        .filter((item) => !status || status.includes(item.status))
        .filter((item) => !!item.goalID)
        .sort((a, b) => a.order - b.order)
        .map((item, index) => {
            const itemID = item.id
            const dataAssignment = [item]
            const dataGoal = item.goal
            const iconTypeRelation = `icon-${typeRelation.split('-')[1]}`

            const isPending = !!(pendingState?.removing && item.id === pendingState?.removingVariables)

            const cardClass = cx(
                `${type}
                ${isPending && 'pending'}
                card-relation
                `
            )

            const renderCard = (dragProvided) => (
                <div
                    className={cardClass}
                    id={itemID}
                    key={!draggable ? itemID : null}
                    onClick={(e) => clickFunction.card(item, e)}
                    ref={dragProvided?.innerRef}
                    {...dragProvided?.draggableProps}
                    {...dragProvided?.dragHandleProps}
                >
                    <div className='head'>
                        <label>
                            <Icons icon={iconTypeRelation} />
                            <span>{dataGoal.name}</span>
                        </label>
                    </div>
                    <div className='body'>
                        <Render
                            type='assignment'
                            display={display}
                            model={dataAssignment}
                            pendingState={pendingState}
                            showTags={showTags}
                            status={status}
                            checkboxState={checkboxState}
                            clickFunction={clickFunction}
                        />
                    </div>
                </div>
            )

            return draggable ? (
                <Draggable draggableId={String(itemID)} index={index} key={String(itemID)}>
                    {(provided) => renderCard(provided)}
                </Draggable>
            ) : (
                renderCard()
            )
        })
}

export default CardRelation