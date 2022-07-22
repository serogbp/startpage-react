// Example of Droppable. Not in use

interface Props {
	droppableId: string,
	direction: "vertical" | "horizontal"
	type: string
	mode: "standard" | "virtual"
	renderClone?: JSX.Element
	children?: JSX.Element | JSX.Element[]
}

const Droppable = ((props: any) => {
	return (
		<Droppable droppableId={props.droppableId} direction={props.direction} mode={props.mode}
			renderClone={(provided:any, snapshot:any, rubric:any) => (
				<div
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}>
					{props.renderClone}
				</div>
			)}
		>
			{(provided:any) => (
				<div
					{...provided.droppableProps}
					ref={provided.innerRef}
				>
					{props.children}
				</div>
			)}
		</Droppable>
	)
})

export default Droppable
