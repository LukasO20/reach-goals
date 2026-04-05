import { DragDropContext, Droppable } from '@adaptabletools/react-beautiful-dnd'

export const DragDropMap = {
  onDragEnd: () => {},
  children: null
}

/**
 * Certifies to remove React.StrictMode component during development for test this component, since the library is not fully compatible with it yet.
 * @param {Object} DragDropMap
 * @param {Function} DragDropMap.onDragEnd
 * @param {any} DragDropMap.children
 */



const DragDrop = ({ onDragEnd, children } = DragDropMap) => {
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

export { DragDrop, DragDropDroppable }