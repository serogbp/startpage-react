import { useState } from "react"
import WebService from "../service/WebService"
import { JsonContent, Web, WebsByCategory } from "../Types"
import onlyUnique from "../utils/utils"

export const UseWebs = (() => {
	const webs = WebService.getWebs()
	// // const [webs, setWebs] = useState(_init())
	// const webs = _init()

	function getWebs() {
		// const parsedJson = WebService.getWebs()
		return webs
		// let webs:WebsByCategory = {}
		// parsedJson.forEach(web => {
		// 	if (!webs.hasOwnProperty(web.category)) {
		// 		webs[web.category] = []
		// 	}
		// 	webs[web.category].push(web)
		// })
		// return webs
	}

	function getUniqueTags() {
		return webs.webs.map(web => web.tags).flat().filter(onlyUnique)
	}


	function isWebDuplicated(web: Web) {
		return Object.values(webs.webs).filter(web => web.url === web.url)
	}


	function getCategory(web: Web) {
		Object.values(webs.categories).forEach(category => {
			if (web.id in category.webIds) return category.id
		})
		return null
	}

	return {
		getWebs,
		getUniqueTags
	}
})
