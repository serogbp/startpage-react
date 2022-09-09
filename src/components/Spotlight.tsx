import { Search, Home } from "tabler-icons-react";
import { SpotlightProvider, } from '@mantine/spotlight';
import type { SpotlightAction } from '@mantine/spotlight';
import { useBoard } from "../hooks/UseBoard";
import { WebFormMode } from "../Types";
import { useModal } from "../hooks/UseModal";


export function Spotlight(props: any) {
	const board = useBoard()
	const modal = useModal

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
				modal.webAdd(WebFormMode.add, props.category, props.web)
			}
		},
		{
			id: "addColumn",
			title: "Add new column",
			onTrigger: () => {
				modal.category()
			}
		},
		{
			id: "settings",
			title: "Settings",
			description: "Open the app settings",
			onTrigger: () => {
				modal.settings()
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
