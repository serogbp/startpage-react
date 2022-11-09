import { Text, Tooltip, createStyles } from "@mantine/core"
import { useEffect, useRef, useState } from "react";
import { useSettings } from "../../../hooks/UseSettings";
import { Web } from "../../../Types";

interface Props {
	web: Web
	hover: boolean
}

const useStyles = createStyles((theme, getRef) => ({
	container: {
		flexGrow: 1,
		width: '0px' // hack para que no haga overflow
	},
	name: {
		overflowWrap: "break-word"
	},
	url: {
		overflow: "hidden",
		whiteSpace: "nowrap",
		textOverflow: "ellipsis",
	},
}))

export default function Body(props: Props) {
	const settings = useSettings()
	const { classes } = useStyles()

	const [urlIsLong, setUrlsIsLong] = useState(false)
	const urlRef = useRef(null)


	useEffect(() => {
		handleUrlTooltip()
	}, [props.hover])


	// Mirar si la url tiene overflow (termina el elipsis ...) para activar el tooltip
	const handleUrlTooltip = () => {
		if (urlRef.current) {
			// @ts-ignore
			setUrlsIsLong(urlRef.current.offsetWidth < urlRef.current.scrollWidth)
		}
	}


	return (
		<div className={classes.container}>
			<Text weight={500} size="sm" className={classes.name}>
				{props.web.name}
			</Text>

			<Tooltip
				label={props.web.url}
				color={settings.accentColor.name}
				position="bottom"
				withArrow
				openDelay={200}
				events={{ hover: urlIsLong, focus: urlIsLong, touch: false }}
				withinPortal={true}
			>
				<Text size="xs" color="dimmed" className={classes.url} ref={urlRef}>
					{props.web.url}
				</Text>
			</Tooltip>
		</div>
	)
}
