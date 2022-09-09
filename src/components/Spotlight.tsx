import { Search, Home } from "tabler-icons-react";
import { SpotlightProvider, } from '@mantine/spotlight';
import type { SpotlightAction } from '@mantine/spotlight';
import { openContextModal } from "@mantine/modals";
import { useBoard } from "../hooks/UseBoard";
import { WebFormMode } from "../Types";


export function Spotlight(props: any) {
	const board = useBoard()

	// TODO ordenar webs por numero de veces abiertos
	//const actions: SpotlightAction[] = context.webs.sort((a,b) => b.stats.timesClicked - a.stats.timesClicked).map(web => {
	const actions: SpotlightAction[] = Object.values(board.state.webs).map(web => {
		return {
			title: web.name,
			description: web.url,
			onTrigger: () => openWeb(web.url),
			icon: <Home size={18} />,
		}
	})

	const fixedActions: SpotlightAction[] = [
		{
			id: "addWeb",
			title: "Add new web",
			onTrigger: () => {
				openContextModal({
					title: "New web",
					modal: "webForm",
					centered: true,
					trapFocus: true,
					innerProps: {
						props: {
							mode: WebFormMode.add,
							category: props.category,
							web: props.web
						}
					}
				})
			}
		},
		{
			id: "addColumn",
			title: "Add new column",
			onTrigger: () => {
				openContextModal({
					title: "New Category",
					modal: "categoryForm",
					trapFocus: true,
					innerProps: {}
				})
			}
		},
		{
			id: "settings",
			title: "Settings",
			description: "Open the app settings",
			onTrigger: () => {
				openContextModal({
					title: "Settings",
					modal: "settings",
					centered: true,
					trapFocus: true,
					innerProps: {},
					size: "xl"
				})
			}
		},
	]


	const openWeb = (url: string) => {
		const link = document.createElement('a');
		link.target = '_blank';
		link.href = url;
		link.rel = "noopener noreferrer nofollow";
		link.click()
	}


	return (
		<SpotlightProvider
			actions={fixedActions}
			searchIcon={<Search size={18} />}
			searchPlaceholder="Search..."
			shortcut={['mod + P', 'mod + K', '/']}
			nothingFoundMessage="Nothing found..."
			highlightQuery>
			{props.children}
		</SpotlightProvider>
	)
}
