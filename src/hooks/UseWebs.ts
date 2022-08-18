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
		return Object.values(webs.webs).map(web => web.tags).flat().filter(onlyUnique)
	}


	function isUrlDuplicated(url: string) {
		return Object.values(webs.webs).find(web => web.url === url)
	}


	function getCategory(web: Web) {
		return Object.values(webs.categories).find(category => web.id in category.webIds)?.id || ""
	}


	return {
		getWebs,
		getUniqueTags,
		isUrlDuplicated,
		getCategory
	}
})
