import { Image, createStyles } from "@mantine/core"
import { useState } from "react"
import { Web } from "../../Types"
import { getDomain } from "../../utils/utils"

interface Props {
	url: string,
	size: number
}

const useStyles = createStyles((theme, getRef) => ({
	image: {
		flexGrow: 0
	}
}))


export default function Favicon(props: Props) {
	const { url } = props
	const size = props.size
	const [error, setError] = useState(false)
	const { classes } = useStyles()

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
