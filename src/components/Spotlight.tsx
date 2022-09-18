import { Search, Plus, Settings, Link } from "tabler-icons-react";
import { SpotlightProvider, } from '@mantine/spotlight';
import type { SpotlightAction } from '@mantine/spotlight';
import { useBoard } from "../hooks/useBoard/UseBoard";
import { useModal } from "../hooks/UseModal";


export function Spotlight(props: any) {
	const board = useBoard()
	const modal = useModal

	const orderedWebs = Object.values(board.state.webs).sort((a,b) => b.stats.lastClickTimestamp - a.stats.lastClickTimestamp)
	
	const webActions: SpotlightAction[] = orderedWebs.map(web => {
		return {
			title: web.name,
			description: web.url,
			group:"Webs",
			onTrigger: () => openWeb(web.url),
			icon: <Link size={18} />,
		}
	})

	const fixedActions: SpotlightAction[] =
	[
		{
			id: "addWeb",
			title: "New web",
			group: "Actions",
			onTrigger: modal.webAdd,
			icon: <Plus size={18}/>
		},
		{
			id: "addColumn",
			title: "New category",
			group: "Actions",
			onTrigger: modal.category,
			icon: <Plus size={18}/>
		},
		{
			id: "settings",
			title: "Settings",
			group: "Actions",
			onTrigger: modal.settings,
			icon: <Settings size={18}/>
		},
	]

	// Colocar al final de la lista de acciones las fixed
	webActions.splice(7, 0, ...fixedActions)


	const openWeb = (url: string) => {
		const link = document.createElement('a');
		link.target = '_blank';
		link.href = url;
		link.rel = "noopener noreferrer nofollow";
		link.click()
	}


	return (
		<SpotlightProvider
			actions={webActions}
			searchIcon={<Search size={18} />}
			searchPlaceholder="Search..."
			shortcut={['mod + P', 'mod + K', '/']}
			nothingFoundMessage="Nothing found..."
			highlightQuery
			>
			{props.children}
		</SpotlightProvider>
	)
}
