import { Group, ScrollArea, useMantineTheme } from "@mantine/core"
import { useEffect, useState } from "react"
import { Droppable, DragDropContext, DropResult, DragStart, ResponderProvided } from "react-beautiful-dnd"
import { jsonContent } from "../../Types"
import Column from "./column"
import ColumnVirtual from "./column-virtual"

interface Props {
	webs: jsonContent
}

export const Board = ((props: Props) => {
	const [state, setState] = useState<jsonContent>(props.webs)
	const theme = useMantineTheme();

	useEffect(() => {
		// TODO actualizar localstorage
	}, [state])

	const handlerDragStart = (initial: DragStart, provided: ResponderProvided) => {
		console.log("DRAG START")
		console.log(initial)
		console.log(provided)
	}

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
				const newColumn = state.categories[source.droppableId]
				newColumn.webIds.splice(source.index, 1) // Eliminar antiguo index
				newColumn.webIds.splice(destination.index, 0, draggableId) // Mover web modificada a nuevo index

				const newState = {
					...state,
					categories: {
						...state.categories,
						[source.droppableId]: newColumn
					}
				}
				setState(newState)
			}

			// La web ha sido droppeada en otra categoría
			// Mover web a otra categoría
			if (destination.droppableId !== source.droppableId) {
				console.log(state.categories)
				const oldColumn = state.categories[source.droppableId]
				const newColumn = state.categories[destination.droppableId]
				oldColumn.webIds.splice(source.index, 1)
				newColumn.webIds.splice(destination.index, 0, draggableId)

				const newState = {
					...state,
					categories: {
						...state.categories,
						[source.droppableId]: oldColumn,
						[destination.droppableId]: newColumn
					}
				}
				setState(newState)
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

			const newCategoryOrder = state.categoryOrder
			newCategoryOrder.splice(source.index, 1)
			newCategoryOrder.splice(destination.index, 0, draggableId)

			const newState = {
				...state,
				columnOrder: newCategoryOrder
			}
			setState(newState)
		}
	})

	return (
		<DragDropContext onDragEnd={handlerDragEnd} onDragStart={handlerDragStart}>
			<Droppable droppableId="board" direction="horizontal" type="column">
				{(provided) => (
					<Group grow spacing="xs" align="top" {...provided.droppableProps} ref={provided.innerRef}
						style={{
							flexWrap: "nowrap",
							height: "100%",
							background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
						}}>
						{
							state.categoryOrder.map((categoryId, index) => {
								const category = state.categories[categoryId]
								const webs = category.webIds.map(webId => state.webs[webId])
								return (
									// <Column key={categoryId} name={category.id} webs={webs} index={index}/>
									<ColumnVirtual key={categoryId} name={category.id} webs={webs} index={index} />
								)
							})
						}
						{provided.placeholder}
					</Group>
				)}
			</Droppable>
		</DragDropContext>
	)
})
