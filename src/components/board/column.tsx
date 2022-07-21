import { Stack } from "@mantine/core"
import { useState, memo } from "react"
import { Web } from "../../Types"
import { Draggable, Droppable } from "react-beautiful-dnd"
import ColumnItem from "./columnItem"
import DraggableElement from "../dnd/Draggable"

interface Props {
	name: string,
	webs: Web[]
}

const Column = memo((props: Props) => {
	return (
		<Droppable droppableId={props.name} direction="vertical" type="web">
			{(provided) => (
				<Stack
					{...provided.droppableProps}
					ref={provided.innerRef}
				>
					<p>{props.name}</p>
					{
						props.webs.map((web, index) => {
							return (
								<DraggableElement key={web.url} draggableId={web.url} index={index}>
									<ColumnItem web={web} />
								</DraggableElement>
							)
						})
					}
					{provided.placeholder}
				</Stack>
			)}
		</Droppable>
	)
})


export default Column
