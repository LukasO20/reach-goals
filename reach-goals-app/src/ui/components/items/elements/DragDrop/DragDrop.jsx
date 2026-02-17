import { DragDropContext, Droppable } from 'react-beautiful-dnd'

import PropTypes from 'prop-types'

const DragDrop = ({ onDragEnd, onDragUpdate, children }) => {
  const handleDragEnd = (result) => {
    if (!result.destination) return
    onDragEnd(result)
  }

  const handleDragUpdate = (result) => {
    if (!result.source && !result.destination) return
    onDragUpdate(result)
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd} onDragUpdate={handleDragUpdate}>
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
  onDragUpdate: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
}

DragDropDroppable.propTypes = {
  dragDropID: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}

export { DragDrop, DragDropDroppable }