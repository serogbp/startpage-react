import { JsonContent, JsonContentLegacy, Web } from "../../Types"
import onlyUnique, { download, LOCAL_STORAGE_USER_DATA, removeLastSlash } from "../../utils/utils"
import { defaultJsonContent, defaultWeb } from "./UseBoard"


export interface BoardJson {
	exportFile: () => void
	importFile: (json: File) => Promise<unknown>
}


export function boardJson(state: JsonContent, setState: (val: JsonContent | ((prevState: JsonContent) => JsonContent)) => void): BoardJson {
	const exportFile = () => {
		const date = new Date()
		// File name format yyyy-mm-dd-startpage.json
		const fileName = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + "-startpage-react.json"
		const data = localStorage.getItem(LOCAL_STORAGE_USER_DATA) ?? ""
		download(data, fileName, "text/plain")
	}


	const importFile = (json: File) => {
		return new Promise((resolve, reject) => {
			json.text().then((newJsonContent) => {
				try {
					const lsWebs = localStorage.getItem(LOCAL_STORAGE_USER_DATA)
					const currentJsonContent: JsonContent = lsWebs ? JSON.parse(lsWebs) : defaultJsonContent

					const importedJson: JsonContent | JsonContentLegacy[] = JSON.parse(newJsonContent)
					// Mirar si el json importado es de la version pre-react de startpage
					// Es JSON de versión actual
					if (Object.hasOwn(importedJson, "jsonVersion")) {
						setState(importedJson as JsonContent)
					}
					// Es JSON versión pre-react
					else {
						setState(importLegacyJson(importedJson as JsonContentLegacy[], currentJsonContent))
					}

					resolve("")
				} catch (error) {
					reject(error)
				}
			})
		})
	}
	return {
		exportFile, importFile
	}
}


function importLegacyJson(importedJson: JsonContentLegacy[], currentJsonContent: JsonContent) {
	let websToImport = importedJson
	// Quitar urls duplicados
	websToImport = websToImport.filter(x => !(Object.values(currentJsonContent.webs).map(y => y.url).includes(x.url)))

	// Añadir categorías del json deprecado y después filtrar valores únicos
	const newCategoryOrder = [...currentJsonContent.categoryOrder, ...websToImport.map(web => web.category)].filter(onlyUnique)

	const newCategories = { ...currentJsonContent.categories }
	// Añadir categorías del json deprecado que no existan en el actual
	newCategoryOrder.forEach(category => {
		if (!Object.hasOwn(currentJsonContent.categories, category)) {
			newCategories[category] = {
				id: category,
				webIds: []
			}
		}
	})

	const len = Object.keys(currentJsonContent.webs).length
	// Número de index mayor del array de webs
	const maxIndex = len > 0 ? Math.max(...Object.values(currentJsonContent.webs).map(web => web.id)) : 0

	const newWebs = { ...currentJsonContent.webs }
	// Para cada nueva web:
	// Añadir el id al objeto correspondiente dentro de newCategories
	// Añadir la web al array de newWebs
	websToImport.forEach((web, i) => {
		const id = i + maxIndex
		const newWeb: Web = {
			...defaultWeb,
			id: id,
			url: web.url,
			name: web.name
		}
		newCategories[web.category].webIds.push(id)
		newWebs[id] = newWeb
	})

	const newState = {
		...defaultJsonContent,
		webs: newWebs,
		categories: newCategories,
		categoryOrder: newCategoryOrder
	}

	return newState
}
