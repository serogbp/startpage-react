import { DragStart, DropResult, ResponderProvided } from "react-beautiful-dnd"
import { Category, JsonContent, Web } from "../../Types"
import { useLocalStorage } from "@mantine/hooks"
import { createContext, useContext } from "react"
import onlyUnique from "../../utils/utils"
import { boardWeb, BoardWeb, } from "./web"
import { BoardJson, boardJson } from "./json"
import { BoardCategory, boardCategory } from "./category"
import { BoardDnd, boardDnd } from "./dnd"


interface BoardHelper {
	state: JsonContent
	setState: (val: JsonContent | ((prevState: JsonContent) => JsonContent)) => void
	web: BoardWeb
	category: BoardCategory
	json: BoardJson
	dnd: BoardDnd
}


const BoardContext = createContext<BoardHelper | undefined>(undefined)


export function BoardProvider({ children }: { children: JSX.Element | JSX.Element[] }) {
	return <BoardContext.Provider value={boardHelper()}>{children}</BoardContext.Provider>
}


export function useBoard() {
	const context = useContext(BoardContext)
	if (context === undefined) throw new Error("useSettings must bed used within a SettingsProvider")
	return context
}


function boardHelper() {
	const [state, setState] = useLocalStorage({
		key: "webs",
		defaultValue: getInitialData()
	})

	const web= boardWeb(state, setState)
	const category = boardCategory(state, setState)
	const json = boardJson(state, setState)
	const dnd = boardDnd(state, setState)

	return {
		state,
		setState,
		web,
		category,
		json,
		dnd
	}
}


export const defaultJsonContent: JsonContent = {
	webs: [],
	categories: {},
	categoryOrder: [],
	jsonVersion: 1
}

export const defaultWeb: Web = {
	id: -1,
	name: "",
	url: "",
	tags: []
}

export const defaultCategory: Category = {
	id: "",
	webIds: []
}














const getInitialData = (() => {
	const miArray = [
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
