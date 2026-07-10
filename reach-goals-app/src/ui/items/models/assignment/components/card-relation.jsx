import { Draggable } from '@adaptabletools/react-beautiful-dnd'
import CardDraggable from '../../../elements/card-draggable'
import CardSwitchRender from '../../../elements/card-switch-render'
import Icons from '../../../elements/icons'

import { cx } from '../../../../../utils/utils.js'

import '../style.scss'

/** @typedef {import('../types.js').CardRenderProps} Props */

/**
 * @param {Props} props
 */
const CardRelation = ({
    type,
    draggable,
    item,
    dragProvided,
    itemID,
    index,
    ...props
}) => {
    const cardRelationClass = cx(
        `${type}
        card-relation
        `
    )

    const hasGoalRelation = item.goalID

    const canDragCard = draggable && !hasGoalRelation
    const canDragRelation = draggable && hasGoalRelation

    const card = (
        canDragCard ?
            (<CardDraggable
                cardProps={{
                    type,
                    draggable,
                    item,
                    dragProvided,
                    ...props
                }}
                itemID={itemID}
                index={index}
            />)
            : (<CardSwitchRender
                type={type}
                item={item}
                dragProvided={dragProvided}
                {...props}
            />)
    )

    const cardRelationRender =
        canDragRelation ?
            (<Draggable
                draggableId={String(itemID)}
                index={index}
                key={String(itemID)}
            >
                {(provided) => (
                    <Content className={cardRelationClass} item={item} provided={provided}>
                        {card}
                    </Content>
                )}
            </Draggable>)
            :
            (<Content className={cardRelationClass} item={item}>
                {card}
            </Content>)

    if (!hasGoalRelation) return card

    return cardRelationRender
}

const Content = ({ className, item, provided, children }) => (
    <div
        className={className}
        ref={provided?.innerRef}
        {...provided?.draggableProps}
        {...provided?.dragHandleProps}
    >
        <div className='head'>
            <Icons icon='icon-goal' />
            <label>{item?.goal?.name}</label>
        </div>
        <div className='body'>
            {children}
        </div>
    </div>
)

export default CardRelation