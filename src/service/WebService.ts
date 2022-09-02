import { defaultWebs } from "../hooks/UseBoard"
import { WebFilter, Web, Category, JsonContent as JsonContent } from "../Types"
import onlyUnique, { download } from "../utils/utils"


export type WebServiceType = {
	getWebs: () => JsonContent,
	saveWebs: (webs: Web[]) => void,
	removeWebs: () => void,
	getFilter: () => WebFilter,
	saveFilter: (filter: WebFilter) => void,
	exportWebs: () => void,
	importWebs: (json: File) => Promise<unknown>
}

const WEBS = 'webs'
const CATEGORIES = 'categories'
const FILTER = 'filter'

const WebService: WebServiceType = {
	getWebs: () => {
		//return JSON.parse(localStorage.getItem(WEBS) ?? '[]')
		//return JSON.parse(initialData)

		// return initialData

		const jsonContent: JsonContent = {
			webs: [],
			categories: {},
			categoryOrder: []
		}
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
	},

	exportWebs: () => {
		const date = new Date();
		// File name format yyyy-mm-dd-startpage.json
		const fileName = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + "-startpage.json";
		const data = localStorage.getItem(WEBS)
		download(data, fileName, "text/plain")
	},


	importWebs: (json:File) => {
		return new Promise((resolve, reject) => {
			json.text().then((value) => {
				// let currentWebs: JsonContent = JSON.parse(localStorage.getItem(WEBS) ?? '[]')
				const lsWebs = localStorage.getItem(WEBS)
				let currentWebs: JsonContent = lsWebs ? JSON.parse(lsWebs) : defaultWebs()
				let websToImport: JsonContent = JSON.parse(value)
				currentWebs = {
					webs: {...currentWebs.webs, ...websToImport.webs},
					categories: {...currentWebs.categories, ...websToImport.categories},
					categoryOrder: [...currentWebs.categoryOrder, ...websToImport.categoryOrder],
				}
				resolve("")
			})
		})
	}
}


export default WebService




const getInitialData = (() => {
	const miArray = [
		{}
	]
	console.log("getInitialData")
	let cosa: JsonContent = {
		webs: [],
		categories: {},
		categoryOrder: []
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
