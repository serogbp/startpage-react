import { useState } from "react"
import WebService from "../service/WebService"
import { WebsByCategory } from "../Types"

export const UseWebs = (() => {
	// const [webs, setWebs] = useState(_init())
	const webs = _init()


	// coger json aplanado y agruparlo por categorías en un objeto
	function _init () {
		const parsedJson = WebService.getWebs()
		let webs:WebsByCategory = {}
		parsedJson.forEach(web => {
			if (!webs.hasOwnProperty(web.category)) {
				webs[web.category] = []
			}
			webs[web.category].push(web)
		})
		return webs
	}

	return {
		webs
	}
})
