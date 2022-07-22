import { Stack } from "@mantine/core"
import { useState, memo } from "react"
import { Web } from "../../Types"
import { Draggable, Droppable } from "react-beautiful-dnd"
import ColumnItem from "./columnItem"
import DraggableElement from "../dnd/Draggable"

interface Props {
	name: string,
	webs: Web[],
	index: number
}

const Column = memo((props: Props) => {
	return (
		<Draggable draggableId={props.name} index={props.index}>
			{(provided) => (
				<div
					{...provided.draggableProps}
					ref={provided.innerRef}>
					<p {...provided.dragHandleProps}>{props.name}</p>

					<Droppable droppableId={props.name} direction="vertical" type="columnItem">
						{(provided) => (

							<Stack
								{...provided.droppableProps}
								ref={provided.innerRef}
								style={{minWidth:200, minHeight:100}}
							>
								{
									props.webs.map((web, index) => {
										return (
											<DraggableElement key={web.id} draggableId={web.id} index={index}>
												<ColumnItem web={web} />
											</DraggableElement>
										)
									})
								}
								{provided.placeholder}
							</Stack>

						)}
					</Droppable>
				</div>
			)}
		</Draggable>
	)
})


export default Column
