import { DragStart, DropResult, ResponderProvided } from "react-beautiful-dnd"
import { UseWebs } from "./UseWebs"
import { JsonContent, Web } from "../Types"
import { useLocalStorage } from "@mantine/hooks"
import { createContext, useContext } from "react"


interface BoardHelper {
	state: JsonContent;
	setState: (val: JsonContent | ((prevState: JsonContent) => JsonContent)) => void;
	columnDragEnd: (result: DropResult) => void;
	columnItemDragEnd: (result: DropResult) => void;
	handleAddWeb: (web: Web, category: string) => void;
	handleDeleteWeb: (web: Web, category: string) => void;
	handleUpdateWeb: (updatedWeb: Web, destinationCategory: string, originCategory: string) => void;
	handlerDragEnd: (result: DropResult) => void;
	handlerDragStart: (initial: DragStart, provided: ResponderProvided) => void;

}


const BoardContext = createContext<BoardHelper | undefined>(undefined)


export function BoardProvider({ children }: { children: JSX.Element | JSX.Element[] }) {
	return <BoardContext.Provider value={boardHelper()}>{children}</BoardContext.Provider>
}


export function useBoard() {
	const context = useContext(BoardContext)
	if (context === undefined) throw new Error("useSettings must bed used within a SettingsProvider")
	return context
}


function boardHelper() {
	const [state, setState] = useLocalStorage({
		key: "webs",
		defaultValue: UseWebs().getWebs()
	})


	const handleAddWeb = (web: Web, category: string) => {
		web.id = Object.keys(state.webs).length

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
		const newState: JsonContent = {
			...state,
			webs: newWebs,
			categories: newCategories
		}
		setState(newState)
	}


	const handleUpdateWeb = (updatedWeb: Web, destinationCategory: string, originCategory: string) => {
		let newCategories = {
			...state.categories
		}

		// Mover de columna
		if (destinationCategory !== originCategory) {
			const oldColumn = state.categories[originCategory]
			oldColumn.webIds = oldColumn.webIds.filter(item => item !== updatedWeb.id)

			const newColumn = state.categories[destinationCategory]
			newColumn.webIds = [...newColumn.webIds, updatedWeb.id]

			newCategories = {
				...state.categories,
				[originCategory]: oldColumn,
				[destinationCategory]: newColumn,
			}
		}

		const newState = {
			...state,
			categories: newCategories,
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

		const newState: JsonContent = {
			...state,
			webs: newWebs,
			categories: newCategories,
			categoryOrder: state.categoryOrder
		}

		setState(newState)
	}


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


	const columnItemDragEnd = (result: DropResult) => {
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
				const oldColumn = state.categories[source.droppableId]
				oldColumn.webIds.splice(source.index, 1)

				const newColumn = state.categories[destination.droppableId]
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
	}


	const columnDragEnd = (result: DropResult) => {
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
	}


	return {
		state,
		setState,
		columnDragEnd,
		columnItemDragEnd,
		handleAddWeb,
		handleDeleteWeb,
		handleUpdateWeb,
		handlerDragEnd,
		handlerDragStart,
	}
}
