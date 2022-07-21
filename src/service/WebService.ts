import { WebFilter, Web, Category } from "../Types"


export type WebServiceType = {
	getWebs: () => Web[],
	saveWebs: (webs:Web[]) => void,
	removeWebs: () => void,
	getCategories: () => Category[],
	saveCategories: (categories:Category[]) => void,
	removeCategories: () => void,
	getFilter: () => WebFilter,
	saveFilter: (filter: WebFilter) => void,
}

const WEBS = 'webs'
const CATEGORIES = 'categories'
const FILTER = 'filter'

const WebService:WebServiceType = {
	getWebs: () => {
		//return JSON.parse(localStorage.getItem(WEBS) ?? '[]')
		return JSON.parse(miJsonLargo)
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
		return filter === '[]' ? {type:'', value:''} : JSON.parse(filter)
	},

	saveFilter: (filter: WebFilter) => {
		localStorage.setItem(FILTER, JSON.stringify(filter))
	}
}


export default WebService
