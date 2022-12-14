import { JsonContent, Web } from "../../Types"
import onlyUnique, { removeLastSlash, sleep } from "../../utils/utils"

export interface BoardWeb {
	add: (web: Web, category: string) => void
	update: (updatedWeb: Web, destinationCategory: string, originCategory: string) => void
	remove: (web: Web, category: string) => void
	isDuplicate: (url: string) => Web | undefined
	getUniqueTags: () => string[]
	open: (web: Web, category: string) => void
}


export function boardWeb(state: JsonContent, setState: (val: JsonContent | ((prevState: JsonContent) => JsonContent)) => void): BoardWeb {


	const add = (web: Web, category: string) => {
		web.id = Object.keys(state.webs).length
		web.url = removeLastSlash(web.url)

		const newWebs = {
			...state.webs,
			[web.id]: web
		}

		const newWebIds = (state.categories[category]) ? [...state.categories[category].webIds, web.id] : [web.id]

		const newCategories = {
			...state.categories,
			[category]: {
				...state.categories[category],
				webIds: newWebIds
			}
		}

		const newCategoryOrder = !(state.categoryOrder.includes(category)) ? [...state.categoryOrder, category] : [...state.categoryOrder]

		const newState: JsonContent = {
			...state,
			webs: newWebs,
			categories: newCategories,
			categoryOrder: newCategoryOrder
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
		const newWebs = { ...state.webs }
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


	const isDuplicate = (url: string) => Object.values(state.webs).find(web => web.url.toLowerCase() === url.toLowerCase())


	const getUniqueTags = () => Object.values(state.webs).map(web => web.tags).flat().filter(onlyUnique)


	const open = (web: Web, category: string) => {
		// Abrir enlace
		const link = document.createElement('a')
		link.target = '_blank'
		link.href = web.url
		link.rel = "noopener noreferrer nofollow"
		link.click()

		// Hack para que abra el enlace inmediatamente en vez de esperar a que haga el update de la web
		sleep(1).then(() => {
			// Actualizar stats de la web
			const newWeb: Web = {
				...web,
				stats: {
					...web.stats,
					timesClicked: web.stats.timesClicked + 1,
					lastClickTimestamp: Date.now()
				}
			}

			update(newWeb, category, category)
		})
	}


	return {
		add, update, remove, isDuplicate, getUniqueTags, open
	}
}
