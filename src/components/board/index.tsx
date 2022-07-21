import { Group, ScrollArea } from "@mantine/core"
import { useEffect, useState } from "react"
import { DragDropContext, DropResult } from "react-beautiful-dnd"
import { UseWebs } from "../../hooks/UseWebs"
import Column from "./column"

export const Board = (() => {
	const { webs } = UseWebs()
	const [columns, setColumns] = useState(webs)

	useEffect(() => {
		// TODO actualizar localstorage
		console.log(columns)
	}, [columns])


	const onDragEnd = ((result: DropResult) => {
		const { source, destination, draggableId } = result
		// Si hace drop en una zona no permitida
		if (!destination) {
			return
		}
		else {
			// Si hace drop en la posición original
			if (destination.droppableId === source.droppableId && destination.index === source.index)
				return

			// La web ha sido droppeada en la misma categoría
			// Solo cambiar index de la web
			if (destination.droppableId === source.droppableId) {
				const newColumn = Array.from(columns[source.droppableId])
				const web = newColumn[source.index] // Almacenar web modificada
				newColumn.splice(source.index, 1) // Eliminar antiguo index
				newColumn.splice(destination.index, 0, web) // Mover web modificada a nuevo index

				const newState = {
					...columns,
					[source.droppableId]: newColumn
				}
				setColumns(newState)
			}

			// La web ha sido droppeada en otra categoría
			// Mover web a otra categoría
			if (destination.droppableId !== source.droppableId) {
				const oldColumn = Array.from(columns[source.droppableId])
				const newColumn = Array.from(columns[destination.droppableId])
				const web = oldColumn[source.index]
				oldColumn.splice(source.index,1)
				newColumn.splice(destination.index, 0, web)

				const newState = {
					...columns,
					[source.droppableId]: oldColumn,
					[destination.droppableId]: newColumn
				}
				setColumns(newState)
			}
		}
	})


	return (
		<ScrollArea>
			<DragDropContext onDragEnd={onDragEnd}>
				<Group sx={{ flexWrap: "nowrap" }} grow spacing="xs" align="top">
					{
						Object.getOwnPropertyNames(columns).map((category) => {
							return (
								<Column key={category} name={category} webs={columns[category]} />
							)
						})
					}
				</Group>
			</DragDropContext>
		</ScrollArea>
	)
})
