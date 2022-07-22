import { Group, ScrollArea } from "@mantine/core"
import { useEffect, useState } from "react"
import { Droppable, DragDropContext, DropResult } from "react-beautiful-dnd"
import { UseWebs } from "../../hooks/UseWebs"
import Column from "./column"

export const Board = (() => {
	const { webs } = UseWebs()
	const [columns, setColumns] = useState(webs)
	

	useEffect(() => {
		// TODO actualizar localstorage
		console.log(columns)
	}, [columns])


	const handlerDragEnd = (result: DropResult) => {
		switch (result.type) {
			case "columnItem":
				columnItemDragEnd(result)
				break
			case "column":
				columnDragEnd(result)
				break
			default:
				break
		}
	}

	const columnItemDragEnd = ((result: DropResult) => {
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

	const columnDragEnd = ((result: DropResult) => {
		const { source, destination, draggableId } = result
		// Si hace drop en una zona no permitida
		if (!destination) {
			return
		}
		else {
			// Si hace drop en la posición original
			if (destination.index === source.index)
				return

			const newColumns = Object.entries(columns)
			console.log(newColumns)
			const column = newColumns[source.index]
			newColumns.splice(source.index, 1)
			newColumns.splice(destination.index, 0, column)

			console.log(newColumns)
			console.log(newColumns.reduce((category, webs) => ({[category.toString()]:webs}), {}))

			// setColumns(newColumns)
		}
	})

	return (
		<ScrollArea>
			<DragDropContext onDragEnd={handlerDragEnd}>
				<Droppable droppableId="board" direction="horizontal" type="column">
					{(provided) => (
						<Group sx={{ flexWrap: "nowrap" }} grow spacing="xs" align="top"
							{...provided.droppableProps}
							ref={provided.innerRef}
						>
							{
								Object.getOwnPropertyNames(columns).map((category, index) => {
									return (
										<Column key={category} name={category} webs={columns[category]} index={index} />
									)
								})
							}
							{provided.placeholder}
						</Group>
					)}
				</Droppable>
			</DragDropContext>
		</ScrollArea>
	)
})
