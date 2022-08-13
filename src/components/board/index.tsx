import { createStyles, Group, ScrollArea, useMantineTheme } from "@mantine/core"
import { useEffect, useState } from "react"
import { Droppable, DragDropContext, DropResult, DragStart, ResponderProvided } from "react-beautiful-dnd"
import signalJs from 'signal-js'
import Signals from "../../Signals"
import { jsonContent, Web } from "../../Types"
import AddWebButton from "./AddWebButton"
import Column from "./Column"
import ColumnItemList from "./ColumnItemList"

interface Props {
	webs: jsonContent
}


const useStyles = createStyles((theme) => ({
	board: {
		flexWrap: "nowrap",
		height: "100%",
		background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.blue[3],
		padding: theme.spacing.md,

	}
}))

// Virtuoso's resize observer can this error,
// which is caught by DnD and aborts dragging.
window.addEventListener("error", (e) => {
	if (
		e.message ===
		"ResizeObserver loop completed with undelivered notifications." ||
		e.message === "ResizeObserver loop limit exceeded"
	) {
		e.stopImmediatePropagation();
	}
});


export const Board = ((props: Props) => {
	const [state, setState] = useState<jsonContent>(props.webs)
	const { classes } = useStyles()

	signalJs.on(Signals.addWeb, (web, category) => handleAddWeb(web, category))
	signalJs.on(Signals.updateWeb, (newWeb, oldWeb, newCategory, oldCategory) => handleUpdateWeb(newWeb, oldWeb, newCategory, oldCategory))
	signalJs.on(Signals.deleteWeb, (web, category) => handleDeleteWeb(web, category))


	signalJs.on('basic', arg => console.log(arg))

	useEffect(() => {
		// TODO actualizar localstorage
	}, [state])

	const handlerDragStart = (initial: DragStart, provided: ResponderProvided) => {
		console.log("DRAG START")
		console.log(initial)
		console.log(provided)
	}

	const handleAddWeb = (web: Web, category: string) => {
		web.id = state.webs.length
		console.log(web.id)
		const newWebs = {
			...state.webs,
			[web.id]: web
		}
		const newWebIds = [...state.categories[category].webIds, web.id]
		const newCategories = {
			...state.categories,
			[category]: {
				...state.categories[category],
				webIds: newWebIds
			}
		}
		const newState: jsonContent = {
			...state,
			webs: newWebs,
			categories: newCategories
		}
		setState(newState)
	}


	const handleUpdateWeb = (updatedWeb: Web, oldWeb: Web, newCategory: string, oldCategory: string) => {
		if (newCategory !== oldCategory) {
			// TODO mover id de columna
		}

		const newState = {
			...state,
			webs: {
				...state.webs,
				[updatedWeb.id]: updatedWeb
			}
		}
		setState(newState)
	}


	const handleDeleteWeb = (web: Web, category: string) => {
		const newWebs = state.webs
		delete newWebs[web.id]

		const newCategories = {
			...state.categories,
			[category]: {
				...state.categories[category],
				webIds: state.categories[category].webIds.filter(id => id !== web.id)
			}
		}

		const newState: jsonContent = {
			...state,
			webs: newWebs,
			categories: newCategories,
			categoryOrder: state.categoryOrder
		}

		setState(newState)
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
				newColumn.webIds.splice(destination.index, 0, parseInt(draggableId)) // Mover web modificada a nuevo index

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
				newColumn.webIds.splice(destination.index, 0, parseInt(draggableId))

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
					<Group className={classes.board} grow spacing="xs" align="top" {...provided.droppableProps} ref={provided.innerRef}>
						{
							// Dibujar columnas
							state.categoryOrder.map((categoryId, index) => {
								const category = state.categories[categoryId]
								const webs = category.webIds.map(webId => state.webs[webId])
								return (

									<Column key={categoryId} name={categoryId} index={index}>
										<ColumnItemList droppableId={categoryId} webs={webs} />
										<AddWebButton category={categoryId} />
										{/* TODO usar component composition  para pasar el form a addwebutton
											usar signal-js para cerrar el popover cuando emita el form
										*/}
									</Column>
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
