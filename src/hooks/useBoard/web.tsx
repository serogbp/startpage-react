import { JsonContent, Web } from "../../Types"
import onlyUnique from "../../utils/utils"
import { defaultJsonContent } from "./UseBoard"


export interface BoardWeb {
	add: (web: Web, category: string) => void
    update: (updatedWeb: Web, destinationCategory: string, originCategory: string) => void
    remove: (web: Web, category: string) => void
    removeAll: () => void
    isUrlDuplicated: (url: string) => Web | undefined
    getUniqueTags: () => string[]
}


export function boardWeb (state: JsonContent, setState: (val: JsonContent | ((prevState: JsonContent) => JsonContent)) => void) : BoardWeb {
	const add = (web: Web, category: string) => {
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


	const update = (updatedWeb: Web, destinationCategory: string, originCategory: string) => {
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


	const remove = (web: Web, category: string) => {
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


	const removeAll = () => setState(defaultJsonContent)


	const isUrlDuplicated = (url: string) => Object.values(state.webs).find(web => web.url === url)


	const getUniqueTags = () => Object.values(state.webs).map(web => web.tags).flat().filter(onlyUnique)


	return {
		add, update, remove, removeAll, isUrlDuplicated, getUniqueTags
	}
}
