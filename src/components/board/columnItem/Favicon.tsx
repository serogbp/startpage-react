import { Image, createStyles } from "@mantine/core"
import { useState } from "react"
import { useSettings } from "../../../hooks/UseSettings"
import { getDomain } from "../../../utils/utils"

interface Props {
	url: string,
}


const useStyles = createStyles((theme, getRef) => ({
	image: {
		flexGrow: 0
	}
}))


export default function Favicon(props: Props) {
	const settings = useSettings()
	const { classes } = useStyles()
	const [error, setError] = useState(false)

	const { url } = props
	const size = settings.webFaviconSize

	return error ? <></> : <Image
		radius='sm'
		width={size}
		height={size}
		src={`https://breezy-maroon-swordfish.faviconkit.com/${getDomain(url)}/`}
		withPlaceholder
		onError={() => setError(true)}
		className={classes.image}
	/>
}
