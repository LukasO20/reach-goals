import { DragDropContext, Droppable } from '@adaptabletools/react-beautiful-dnd'

import PropTypes from 'prop-types'

const DragDrop = ({ onDragEnd, onDragUpdate, children }) => {
  const handleDragEnd = (result) => {
    if (!result.destination) return
    onDragEnd(result)
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      {children}
    </DragDropContext>
  )
}

const DragDropDroppable = ({ dragDropID, children, className }) => {
  return (
    <Droppable droppableId={dragDropID}>
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef} className={className}>
          {children}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}

DragDrop.propTypes = {
  onDragEnd: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
}

DragDropDroppable.propTypes = {
  dragDropID: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}

export { DragDrop, DragDropDroppable }