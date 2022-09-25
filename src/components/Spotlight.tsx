import { Search, Plus, Settings, Link } from "tabler-icons-react";
import { SpotlightProvider } from '@mantine/spotlight';
import type { SpotlightAction } from '@mantine/spotlight';
import {useBoard } from "../hooks/useBoard/UseBoard";
import { useModal } from "../hooks/UseModal";
import { CustomAction } from "./CustonAction";
import fuzzysort from "fuzzysort";


export function Spotlight(props: any) {
	const board = useBoard()
	const modal = useModal
	const LIMIT_OF_ACTIONS_ON_SCREEN = 8

	const orderedWebs = Object.values(board.state.webs).sort((a, b) => b.stats.lastClickTimestamp - a.stats.lastClickTimestamp)

	const webActions: SpotlightAction[] = orderedWebs.map(web => {
		const category = board.category.getName(web)
		return {
			title: web.name,
			description: `${web.url} ${web.tags}`,
			group: "Recent opened webs",
			onTrigger: () => board.web.open(web, category),
			icon: <Link size={18} />,
			web: web,
			category: category,
		}
	})

	const fixedActions: SpotlightAction[] =
		[
			{
				id: "addWeb",
				title: "New web",
				group: "Actions",
				onTrigger: modal.webAdd,
				icon: <Plus size={18} />,
			},
			{
				id: "addColumn",
				title: "New category",
				group: "Actions",
				onTrigger: modal.category,
				icon: <Plus size={18} />,
			},
			{
				id: "settings",
				title: "Settings",
				group: "Actions",
				onTrigger: modal.settings,
				icon: <Settings size={18} />,
			},
		]

	// Colocar al final de la lista las fixedActions
	webActions.splice(LIMIT_OF_ACTIONS_ON_SCREEN - fixedActions.length, 0, ...fixedActions)
	

	// Filtrar usando fuzzy search y ordenar por el fuzzy search score
	// Si es web, filtra por nombre, url, categoría y tags
	// Si es una acción de la app, filtra por title y description
	// TODO highlight de mantine no funciona con fuzzy search, solo con búsqueda normal
	function customBasicFilter(query: string, actions: SpotlightAction[]) {
		if (query === "") return actions
		return fuzzysort.go(query, actions, {limit: LIMIT_OF_ACTIONS_ON_SCREEN, keys: ["title", "description", "category", "web.tags"]}).map(result => result.obj)
	}


	// Lo mismo que customBasicFilter añadiendo filtrado por categorías y tags usando un carácter especial para cada uno (@ y # respectivamente)
	// TODO Por ahora WIP
	// function customAdvanceFilter(query: string, actions: SpotlightAction[]) {
	// 	if (query === "") return actions

	// 	const categories: string[] = []
	// 	const tags: string[] = []
	// 	const alphas: string[] = []

	// 	query.split(" ").forEach(q => {
	// 		if (q.length === 1){
	// 			alphas.push(q)
	// 			return
	// 		}

	// 		const first = q[0]
	// 		const word = q.substring(1).toLowerCase()

	// 		if (first === "@") categories.push(word)
	// 		else if (first === "#") tags.push(word)
	// 		else alphas.push(word)
	// 	})

	// 	let filteredActions = actions

	// 	if (categories.length > 0) {
	// 		// filteredActions = filteredActions.filter(action => {
	// 		// 	return action.category ? categories.includes(action.category.toLowerCase()) : false
	// 		// })
	// 		const result = fuzzysort.go(categories.join(" "), filteredActions, {limit: 10, keys: ["category"]})
	// 		filteredActions = result.map(r => r.obj)
	// 	}

	// 	if (tags.length > 0) {
	// 		const result = fuzzysort.go(categories.join(" "), filteredActions, {limit: 10, keys: ["web.tags"]})
	// 		filteredActions = result.map(r => r.obj)
	// 	}

	// 	if (alphas.length > 0) {
	// 		const result = fuzzysort.go(alphas.join(" "), filteredActions, {limit: 10, keys: ["title", "description"]})
	// 		filteredActions = result.map(r => r.obj)
	// 	}

	// 	return filteredActions
	// }


	return (
		<SpotlightProvider
			actions={webActions}
			actionComponent={CustomAction}
			searchIcon={<Search size={18} />}
			searchPlaceholder="Search..."
			shortcut={['mod + P', 'mod + K', '/']}
			nothingFoundMessage="Nothing found..."
			highlightQuery
			centered
			limit = {LIMIT_OF_ACTIONS_ON_SCREEN}
			filter={(query, actions) => customBasicFilter(query, actions)}
		>
			{props.children}
		</SpotlightProvider>
	)
}
