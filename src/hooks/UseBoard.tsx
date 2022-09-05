import { DragStart, DropResult, ResponderProvided } from "react-beautiful-dnd"
import { JsonContent, JsonContentDeprecated, Web } from "../Types"
import { useLocalStorage } from "@mantine/hooks"
import { createContext, useContext } from "react"
import onlyUnique, { download } from "../utils/utils"


interface BoardHelper {
	state: JsonContent
	setState: (val: JsonContent | ((prevState: JsonContent) => JsonContent)) => void
	columnDragEnd: (result: DropResult) => void
	columnItemDragEnd: (result: DropResult) => void
	handleAddWeb: (web: Web, category: string) => void
	handleDeleteWeb: (web: Web, category: string) => void
	handleUpdateWeb: (updatedWeb: Web, destinationCategory: string, originCategory: string) => void
	handleUpdateCategoryName: (oldName: string, newName: string) => void,
	handlerDragEnd: (result: DropResult) => void
	handlerDragStart: (initial: DragStart, provided: ResponderProvided) => void
	deleteAllWebs: () => void,
	importJson: (json: File) => Promise<unknown>,
	exportJson: () => void,
	getUniqueTags: () => string[],
	isUrlDuplicated: (url: string) => Web | undefined,
	getCategory: (web: Web) => string,
}


const WEBS = 'webs'


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
		defaultValue: getInitialData()
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


	const handleUpdateCategoryName = (oldName: string, newName: string) => {
		const newCategories = {
			...state.categories,
			[newName]: {
				...state.categories[oldName],
				id: newName
			}
		}

		delete newCategories[oldName]

		setState({
			...state,
			categories:{ ...newCategories }
		})
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


	const deleteAllWebs = () => {
		setState(defaultJsonContent)
	}


	const exportJson = () => {
		const date = new Date()
		// File name format yyyy-mm-dd-startpage.json
		const fileName = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + "-startpage.json";
		const data = localStorage.getItem(WEBS)
		download(data, fileName, "text/plain")
	}


	const importJson = (json: File) => {
		return new Promise((resolve, reject) => {
			json.text().then((value) => {
				// Coger localhost actual, si no hay se coge un valor por defecto
				const lsWebs = localStorage.getItem(WEBS)
				let currentWebs: JsonContent = lsWebs ? JSON.parse(lsWebs) : defaultWeb

				const importedJson = JSON.parse(value)
				// Mirar si el json importado es de la version pre-react de startpage
				// const websToImport = Object.hasOwn(importedJson, "jsonVersion") ? importedJson : convertJsonToNewFormat(importedJson, maxIndex)

				// Es JSON de versión actual
				if (Object.hasOwn(importedJson, "jsonVersion")) {
					const websToImport = importedJson as JsonContent
					// Merge favoreciendo los datos de las webs que ya había
					const newState = {
						...currentWebs,
						webs: { ...currentWebs.webs, ...websToImport.webs },
						categories: { ...currentWebs.categories, ...websToImport.categories },
						categoryOrder: [...currentWebs.categoryOrder, ...websToImport.categoryOrder],
					}
					localStorage.setItem(WEBS, JSON.stringify(newState))
					setState(newState)
					resolve("")
				}
				// Es JSON versión pre-react
				else {
					// Número de index mayor del array de webs
					const maxIndex = Math.max(...currentWebs.webs.map(web => web.id))

					let websToImport = importedJson as JsonContentDeprecated[]
					// Quitar urls duplicados
					websToImport = websToImport.filter(x => !(x.url in currentWebs.webs.map(y => y.url)))

					// Añadir categorías del json deprecado, después filtrar valores únicos
					const newCategoryOrder = [...currentWebs.categoryOrder, ...websToImport.map(web => web.category)].filter(onlyUnique)

					const newCategories = { ...currentWebs.categories }
					// Añadir categorías del json deprecado que no existan en el actual
					newCategoryOrder.forEach(category => {
						if (!currentWebs.categories.hasOwnProperty(category)) {
							newCategories[category] = {
								id: category,
								webIds: []
							}
						}
					})

					const newWebs = [...currentWebs.webs]

					// Para cada nueva web:
					// Añadir el id al objeto correspondiente dentro de newCategories
					// Añadir la web al array de newWebs
					websToImport.forEach((web, i) => {
						const newWeb: Web = {
							...defaultWeb,
							id: i + 1 + maxIndex,
							url: web.url
						}
						newCategories[web.category].webIds.push(newWeb.id)
						newWebs.push(newWeb)
					})

				}
			})
		})
	}


	const getUniqueTags = () => {
		return Object.values(state.webs).map(web => web.tags).flat().filter(onlyUnique)
	}


	const isUrlDuplicated = (url: string) => {
		return Object.values(state.webs).find(web => web.url === url)
	}


	const getCategory = (web: Web) => {
		return Object.values(state.categories).find(category => web.id in category.webIds)?.id || ""
	}

	return {
		state,
		setState,
		columnDragEnd,
		columnItemDragEnd,
		handleAddWeb,
		handleDeleteWeb,
		handleUpdateWeb,
		handleUpdateCategoryName,
		handlerDragEnd,
		handlerDragStart,
		deleteAllWebs,
		importJson,
		exportJson,
		getUniqueTags,
		isUrlDuplicated,
		getCategory,
	}
}


const defaultJsonContent: JsonContent = {
	webs: [],
	categories: {},
	categoryOrder: [],
	jsonVersion: 1
}

const defaultWeb: Web = {
	id: -1,
	name: "",
	url: "",
	tags: []
}
















const getInitialData = (() => {
	const miArray = [
	]
	console.log("getInitialData")
	let cosa: JsonContent = {
		webs: [],
		categories: {},
		categoryOrder: [],
		jsonVersion: 1
	}

	cosa.webs = miArray.map((web, index) => {
		return {
			id: index,
			url: web.url,
			name: web.name,
			tags: web.tags
		}
	})

	cosa.categoryOrder = miArray.map(web => web.category).flat().filter(onlyUnique)

	cosa.categoryOrder.forEach(category => {
		const websDeEstaCategoria = miArray.filter(web => web.category === category)
		const webIds = cosa.webs.filter(web => websDeEstaCategoria.find(web2 => web2.url === web.url)).map(web => web.id)
		cosa.categories[category] = {
			id: category,
			webIds: webIds
		}
	})

	return cosa
})
