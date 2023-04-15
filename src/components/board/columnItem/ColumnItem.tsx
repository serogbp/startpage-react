import { ActionIcon, Box, Card, Group, useMantineTheme, createStyles } from "@mantine/core"
import { memo, useState } from "react"
import { IconPencil } from "@tabler/icons"
import { useBoard } from "../../../hooks/useBoard/UseBoard"
import { useModal } from "../../../hooks/UseModal"
import { useSettings } from "../../../hooks/UseSettings"
import { Web, WebIconType } from "../../../Types"
import Body from "./Body"
import Favicon from "./Favicon"
import StringIcon from "./StringIcon"
import Tags from "./Tags"


interface Props {
	web: Web
	category: string
}

interface PropsStyle {
	backgroundColor: string
	border: string
	backgroundColorHover: string
}

const useStyles = createStyles((theme, { backgroundColor, border, backgroundColorHover }: PropsStyle, getRef) => ({
	card: {
		backgroundColor: backgroundColor,
		border: border,
		padding: theme.spacing.md,
		width: "auto",
		minHeight: 10,
		marginBottom: 8,
		'&:hover': {
			backgroundColor: backgroundColorHover
		},
	},
	card_container: {
		flexWrap: "nowrap",
	},
	text: {

	},
	text_name: {
		overflowWrap: "break-word"
	},
	text_url: {
		overflow: "hidden",
		whiteSpace: "nowrap",
		textOverflow: "ellipsis",
	},
	text_tags: {
		overflow: "hidden",
		whiteSpace: "nowrap",
		textOverflow: "ellipsis",
	},
	settings: {
		position: "absolute",
		top: 0,
		right: 0,
		padding: 8
	},
}))

const ColumnItem = memo((props: Props) => {
	const settings = useSettings()
	const board = useBoard()
	const modal = useModal
	const [hover, setHover] = useState(false)

	const theme = useMantineTheme()
	const backgroundColor = (() => {
		const dark = 6
		let color = theme.colorScheme === 'dark' ? theme.colors.dark[dark] : theme.white
		if (settings.accentColorElements) {
			color = theme.colorScheme === 'dark' ? theme.colors.dark[dark] : theme.colors[settings.accentColor.name][0]
		}
		return color
	})()
	const border = (() => {
		let border = theme.colorScheme === 'dark' ? `1px solid ${theme.colors.gray[8]}` : `1px solid ${theme.colors.gray[2]}`
		if (settings.accentColorElements) {
			border = theme.colorScheme === 'dark' ? `1px solid ${theme.colors.gray[8]}` : `1px solid ${theme.colors[settings.accentColor.name][2]}`
		}
		return border
	})()
	const backgroundColorHover = (() => {
		let color = theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
		if (settings.accentColorElements) {
			color = theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors[settings.accentColor.name][2]
		}
		return color
	})()
	const { classes } = useStyles({ backgroundColor, border, backgroundColorHover })


	const handleClick = () => {
		board.web.open(props.web, props.category)
	}


	const handleClickSettings = (event: any) => {
		event.preventDefault()
		event.stopPropagation()
		setHover(false)
		modal.webEdit(props.web, props.category)
	}


	return (
		<Card
			radius="sm"
			p='xs'
			className={classes.card}
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
			onClick={() => handleClick()}
		>

			<Group spacing="xs" style={{
				flexWrap: "nowrap",

			}}>
				{/* {
					settings.useWebFavicon && <Favicon url={props.web.url}/>
				} */}
				{/* {
					settings.useWebFavicon && props.iconType === WebIconType.favicon && <StringIcon name={props.web.name} />
				} */}

				<Icon web={props.web} />

				<Body web={props.web} hover={hover} />
			</Group>

			<Card.Section><Tags web={props.web} /></Card.Section>

			<Box hidden={!hover} className={classes.settings}>
				<ActionIcon onClick={handleClickSettings} variant="light" >
					<IconPencil size={16} />
				</ActionIcon>
			</Box>

		</Card >
	)
})

ColumnItem.displayName = "ColumnItem"
export default ColumnItem

interface IconProps {
	web: Web
}

function Icon(props: IconProps) {
	const { web } = props
	if (!web.iconType) return <></>
	if (useSettings().useWebFavicon === false) return <></>

	switch (web.iconType) {
		case WebIconType.stringIcon:
			return <StringIcon {...web.stringIcon} />
		case WebIconType.favicon:
			return <Favicon url={web.url} />
		default:
			return <></>
	}
}
