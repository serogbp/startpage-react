import { memo } from "react"
import { Draggable } from "react-beautiful-dnd"


interface Props {
	draggableId: string,
	index: number,
	children?: JSX.Element | JSX.Element[]
}

const DraggableElement = memo((props:Props) => {
	return (
		<Draggable draggableId={props.draggableId} index={props.index}>
			{(provided) => (
				<div
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
				>
					{props.children}
				</div>
			)}
		</Draggable>
	)
})

export default DraggableElement
