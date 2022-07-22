import { useState } from "react"
import WebService from "../service/WebService"
import { WebsByCategory } from "../Types"

export const UseWebs = (() => {
	// // const [webs, setWebs] = useState(_init())
	// const webs = _init()

	function getWebs () {
		return WebService.getWebs()
		// const parsedJson = WebService.getWebs()
		// let webs:WebsByCategory = {}
		// parsedJson.forEach(web => {
		// 	if (!webs.hasOwnProperty(web.category)) {
		// 		webs[web.category] = []
		// 	}
		// 	webs[web.category].push(web)
		// })
		// return webs
	}

	return {
		getWebs
	}
})
