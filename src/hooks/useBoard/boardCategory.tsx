import { JsonContent, Web } from "../../Types"
import { arrayMove } from "../../utils/utils"
import { defaultCategory } from "./UseBoard"


export interface BoardCategory {
	add: (categoryName: string) => void
	update: (oldName: string, newName: string) => void
	remove: (name: string) => void
	getName: (web: Web) => string
	isDuplicate: (name: string) => boolean
}


export function boardCategory(state: JsonContent, setState: (val: JsonContent | ((prevState: JsonContent) => JsonContent)) => void): BoardCategory {
	const add = (categoryName: string) => {
		setState({
			...state,
			categories: {
				...state.categories,
				[categoryName]: {
					...defaultCategory,
					id: categoryName
				}
			},
			categoryOrder: [...state.categoryOrder, categoryName]
		})
	}

	const update = (oldName: string, newName: string) => {
		// Push categoría con el nombre nuevo
		const newCategories = {
			...state.categories,
			[newName]: {
				...state.categories[oldName],
				id: newName
			}
		}
		delete newCategories[oldName]

		// Sustituir el nombre antiguo por el nuevo manteniendo la misma posición
		const oldIndex = state.categoryOrder.findIndex(c => c == oldName)
		const newCategoryOrder = [...state.categoryOrder.filter(c => c !== oldName), newName]
		arrayMove(newCategoryOrder, newCategoryOrder.length - 1, oldIndex)

		setState({
			...state,
			categories: { ...newCategories },
			categoryOrder: newCategoryOrder
		})
	}


	const remove = (name: string) => {
		// Borrar las webs de la categoría
		const newWebs = {...state.webs}
		state.categories[name].webIds.forEach(id => delete newWebs[id])

		// Borrar la categoría
		const newCategories = {...state.categories}
		delete newCategories[name]

		// Borrar de la lista de categorías
		const newCategoryOrder = state.categoryOrder.filter(c => c !== name)

		setState({
			...state,
			webs: newWebs,
			categories: newCategories,
			categoryOrder: newCategoryOrder
		})
	}


	const getName = (web: Web) => Object.values(state.categories).find(category => category.webIds.includes(web.id))?.id || ""


	const isDuplicate = (name: string) => Object.values(state.categories).find(category => category.id.toLowerCase() === name.toLowerCase()) !== undefined


	return {
		add, update, remove, getName, isDuplicate
	}
}
