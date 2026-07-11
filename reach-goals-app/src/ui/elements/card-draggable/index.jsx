import { Draggable } from '@adaptabletools/react-beautiful-dnd'
import CardSwitchRender from '../card-switch-render'

/** @typedef {import('./types.js').CardDraggableProps} Props */

/**
 * @param {Props} props
 */
const CardDraggable = ({ itemID, index, cardProps }) => (
    <Draggable draggableId={String(itemID)} index={index} key={String(itemID)}>
        {(provided) => <CardSwitchRender {...cardProps} dragProvided={provided} />}
    </Draggable>
)

export default CardDraggable