import signalJs from "signal-js"
import Signals from "../Signals"
import { WebFilter, Web, Category, JsonContent as JsonContent, JsonContentDeprecated } from "../Types"
import onlyUnique, { download } from "../utils/utils"


export type WebServiceType = {
	getWebs: () => JsonContent,
	saveWebs: (webs: Web[]) => void,
	removeWebs: () => void,
	getFilter: () => WebFilter,
	saveFilter: (filter: WebFilter) => void,
	exportJson: () => void,
	importJson: (json: File) => Promise<unknown>
}

const WEBS = 'webs'
const CATEGORIES = 'categories'
const FILTER = 'filter'

const WebService: WebServiceType = {
	getWebs: () => {
		//return JSON.parse(localStorage.getItem(WEBS) ?? '[]')
		//return JSON.parse(initialData)

		// return initialData

		// const jsonContent: JsonContent = {
		// 	webs: [],
		// 	categories: {},
		// 	categoryOrder: [],
		// 	jsonVersion: 1
		// }
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

	exportJson: () => {
		const date = new Date();
		// File name format yyyy-mm-dd-startpage.json
		const fileName = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + "-startpage.json";
		const data = localStorage.getItem(WEBS)
		download(data, fileName, "text/plain")
	},


	importJson: (json: File) => {
		return new Promise((resolve, reject) => {
			json.text().then((value) => {
				// Coger localhost actual, si no hay se coge un valor por defecto
				const lsWebs = localStorage.getItem(WEBS)
				let currentWebs: JsonContent = lsWebs ? JSON.parse(lsWebs) : defaultWeb()

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
					signalJs.emit(Signals.updateBoardState, newState)
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
						const newWeb = <Web>{
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
	},
}


export default WebService


function convertJsonToNewFormat(oldJson: JsonContentDeprecated[], maxIndex: number) {
	let newJson: JsonContent = {
		webs: [],
		categories: {},
		categoryOrder: [],
		jsonVersion: 1
	}

	newJson.webs = oldJson.map((web, index) => {
		return {
			id: index + 1 + maxIndex,
			url: web.url,
			name: web.name,
			tags: []
		}
	})

	newJson.categoryOrder = oldJson.map(web => web.category).flat().filter(onlyUnique)

	newJson.categoryOrder.forEach(category => {
		const websFromCategory = oldJson.filter(web => web.category === category)
		const webIds = newJson.webs.filter(x => websFromCategory.find(y => y.url === x.url)).map(web => web.id)
		newJson.categories[category] = {
			id: category,
			webIds: webIds
		}
	})

	return newJson
}


const getInitialData = (() => {
	const miArray = [
		{}
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


export const defaultWeb = (): JsonContent => {
	return {
		webs: [],
		categories: {},
		categoryOrder: [],
		jsonVersion: 1
	}
}
