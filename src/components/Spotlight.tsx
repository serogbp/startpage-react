import {Search, Home } from "tabler-icons-react";
import { SpotlightProvider, } from '@mantine/spotlight';
import type { SpotlightAction } from '@mantine/spotlight';
import { UseWebs } from "../hooks/UseWebs";


export function Spotlight(props:any) {
	const webs = Object.values(UseWebs().getWebs().webs)
	
	// TODO ordenar webs por numero de veces abiertos
	//const actions: SpotlightAction[] = context.webs.sort((a,b) => b.stats.timesClicked - a.stats.timesClicked).map(web => {
	const actions: SpotlightAction[] = webs.map(web => {
		return {
			title: web.name,
			description: web.id,
			onTrigger: () => openWeb(web.id),
			icon: <Home size={18} />,
		}
	})


	const openWeb = (url: string) => {
		const link = document.createElement('a');
		link.target = '_blank';
		link.href = url;
		link.rel = "noopener noreferrer nofollow";
		link.click()
	}


	return (
		<SpotlightProvider
			actions={actions}
			searchIcon={<Search size={18} />}
			searchPlaceholder="Search..."
			shortcut={['mod + P', 'mod + K', '/']}
			nothingFoundMessage="Nothing found..."
			highlightQuery>
				{props.children}
		</SpotlightProvider>
	)
}