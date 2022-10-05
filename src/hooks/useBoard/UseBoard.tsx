import { Category, JsonContent, Web, WebStats } from "../../Types"
import { useLocalStorage } from "@mantine/hooks"
import { createContext, useContext } from "react"
import { boardWeb, BoardWeb, } from "./boardWeb"
import { BoardJson, boardJson } from "./boardJson"
import { BoardCategory, boardCategory } from "./boardCategory"
import { BoardDnd, boardDnd } from "./boardDnd"
import { getInitialData } from "../../test"
import { LOCAL_STORAGE_USER_DATA } from "../../utils/utils"


interface BoardHelper {
	state: JsonContent
	setState: (val: JsonContent | ((prevState: JsonContent) => JsonContent)) => void
	defaultState: () => void
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
	if (context === undefined) throw new Error("useBoard must be used within a BoardProvider")
	return context
}


function boardHelper() {
	const [state, setState] = useLocalStorage({
		key: LOCAL_STORAGE_USER_DATA,
		defaultValue: getInitialData()
	})

	const defaultState = () => setState(defaultJsonContent)
	const web= boardWeb(state, setState)
	const category = boardCategory(state, setState)
	const json = boardJson(state, setState)
	const dnd = boardDnd(state, setState)


	return {
		state,
		setState,
		defaultState,
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

const defaultWebStats: WebStats = {
	timesClicked: 0,
	lastClickTimestamp: 0
}

export const defaultWeb: Web = {
	id: -1,
	name: "",
	url: "",
	tags: [],
	stats: defaultWebStats
}

export const defaultCategory: Category = {
	id: "",
	webIds: []
}
