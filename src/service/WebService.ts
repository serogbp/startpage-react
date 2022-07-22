import { WebFilter, Web, Category, jsonContent } from "../Types"


export type WebServiceType = {
	getWebs: () => jsonContent,
	saveWebs: (webs: Web[]) => void,
	removeWebs: () => void,
	getCategories: () => Category[],
	saveCategories: (categories: Category[]) => void,
	removeCategories: () => void,
	getFilter: () => WebFilter,
	saveFilter: (filter: WebFilter) => void,
}

const WEBS = 'webs'
const CATEGORIES = 'categories'
const FILTER = 'filter'

const WebService: WebServiceType = {
	getWebs: () => {
		//return JSON.parse(localStorage.getItem(WEBS) ?? '[]')
		// return JSON.parse(initialData)
		return initialData
	},


	saveWebs: (webs: Web[]) => {
		localStorage.setItem(WEBS, JSON.stringify(webs))
	},


	removeWebs: () => {
		localStorage.removeItem(WEBS)
	},


	getCategories: () => {
		return JSON.parse(localStorage.getItem(CATEGORIES) ?? '[]')
	},


	saveCategories: (categories: Category[]) => {
		localStorage.setItem(CATEGORIES, JSON.stringify(categories))
	},


	removeCategories: () => {
		localStorage.removeItem(CATEGORIES)
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


const initialData: jsonContent = {
	webs: {
		'task-1': { id: 'task-1', name: 'Take out the garbage' },
		'task-2': { id: 'task-2', name: 'Watch my favorite show' },
		'task-3': { id: 'task-3', name: 'Charge my phone' },
		'task-4': { id: 'task-4', name: 'Cook dinner' },
		'task-5': { id: 'task-5', name: 'olee' },
		'task-6': { id: 'task-6', name: 'aaaaaaa' },
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
