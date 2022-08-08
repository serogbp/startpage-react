import { WebFilter, Web, Category, jsonContent as JsonContent } from "../Types"


export type WebServiceType = {
	getWebs: () => JsonContent,
	saveWebs: (webs: Web[]) => void,
	removeWebs: () => void,
	getFilter: () => WebFilter,
	saveFilter: (filter: WebFilter) => void,
}

const WEBS = 'webs'
const CATEGORIES = 'categories'
const FILTER = 'filter'

const WebService: WebServiceType = {
	getWebs: () => {
		const jsonContent: JsonContent = {
			webs: {},
			categories: {},
			categoryOrder: []
		}
		//return JSON.parse(localStorage.getItem(WEBS) ?? '[]')
		// return JSON.parse(initialData)
		return getInitialData()
	},


	saveWebs: (webs: Web[]) => {
		localStorage.setItem(WEBS, JSON.stringify(webs))
	},


	removeWebs: () => {
		localStorage.removeItem(WEBS)
	},


	getFilter: () => {
		// return JSON.parse(localStorage.getItem('filter') ?? '[]')
		const filter = localStorage.getItem(FILTER) ?? '[]'
		return filter === '[]' ? { type: '', value: '' } : JSON.parse(filter)
	},

	saveFilter: (filter: WebFilter) => {
		localStorage.setItem(FILTER, JSON.stringify(filter))
	}
}


export default WebService


const initialData: JsonContent = {
	webs: {
		'task-1': { id: 'task-1', name: 'Take out the garbage', tags: ["tag1", "tag2"] },
		'task-2': { id: 'task-2', name: 'Watch my favorite show', tags: ["tag1"] },
		'task-3': { id: 'task-3', name: 'Charge my phone', tags: ["tag1"] },
		'task-4': { id: 'task-4', name: 'Cook dinner', tags: ["tag1"] },
		'task-5': { id: 'task-5', name: 'olee', tags: ["tag1"] },
		'task-6': { id: 'task-6', name: 'aaaaaaa', tags: ["tag1"] },
	},
	categories: {
		'column-1': {
			id: 'column-1',
			webIds: ['task-1', 'task-2'],
		},
		'column-2': {
			id: 'column-2',
			webIds: ['task-3', 'task-4'],
		},
		'column-3': {
			id: 'column-3',
			webIds: ['task-5', 'task-6'],
		},
	},
	categoryOrder: ['column-1', 'column-2', 'column-3'],
}

const getInitialData = (() => {
	console.log("getInitialData")
	let cosa: JsonContent = {
		webs: {},
		categories: {},
		categoryOrder: []
	}

	const CATEGORIES = 20
	const WEBS = 100

	for (var i = 0; i < CATEGORIES * WEBS; i++) {
		cosa.webs[`task-${i}`] = {
			id: `task-${i}`,
			name: `task-${i}`,
			tags: ["hula"]
		}
	}

	const getTaskIds = (index: number) => {
		let ids: string[] = []
		for (var i = WEBS * index; i < WEBS * index + WEBS; i++) {
			ids.push(`task-${i}`)
		}
		return ids
	}

	for (var i = 0; i < CATEGORIES; i++) {
		cosa.categories[`category-${i}`] = {
			id: `category-${i}`,
			webIds: getTaskIds(i)
		}
		cosa.categoryOrder.push(`category-${i}`)
	}
	return cosa
})
