import { ActionIcon, Box, Card, Stack, Text, Tooltip, Group, useMantineTheme, createStyles } from "@mantine/core"
import { memo, useEffect, useRef, useState } from "react"
import { Pencil } from "tabler-icons-react"
import { useBoard } from "../../hooks/useBoard/UseBoard"
import { useModal } from "../../hooks/UseModal"
import { useSettings } from "../../hooks/UseSettings"
import { Web } from "../../Types"


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
	columnItem_Card: {
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
	columnItem_Name: {
		overflowWrap: "break-word"
	},
	columnItem_Url: {
		overflow: "hidden",
		whiteSpace: "nowrap",
		textOverflow: "ellipsis",
	},
	columItem_Tag: {
		overflow: "hidden",
		whiteSpace: "nowrap",
		textOverflow: "ellipsis",
	},
	columnItem_Settings: {
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
	const [urlIsLong, setUrlsIsLong] = useState(false)
	const urlRef = useRef(null)

	const theme = useMantineTheme()
	const backgroundColor = (()=> {
		const dark = 6
		let color = theme.colorScheme === 'dark' ? theme.colors.dark[dark] : theme.white
		if (settings.accentColorElements) {
			color = theme.colorScheme === 'dark' ? theme.colors.dark[dark] : theme.colors[settings.accentColor.name][0]
		}
		return color
	})()
	const border = (()=> {
		let border = theme.colorScheme === 'dark' ? `1px solid ${theme.colors.gray[8]}` :	 `1px solid ${theme.colors.gray[2]}`
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
	const { classes } = useStyles({backgroundColor, border, backgroundColorHover})


	useEffect(() => {
		handleUrlTooltip()
	}, [hover])


	// Mirar si la url tiene overflow (termina el elipsis ...) para activar el tooltip
	const handleUrlTooltip = () => {
		if (urlRef.current)
			// @ts-ignore
			setUrlsIsLong(urlRef.current.offsetWidth < urlRef.current.scrollWidth)
	}


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
			className={classes.columnItem_Card}
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
			onClick={() => handleClick()}
		>
			<Card.Section>
				<Stack spacing="sm" p="sm">
					<div>
						<Text weight={500} size="sm" className={classes.columnItem_Name}>
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
							<Text size="xs" color="dimmed" className={classes.columnItem_Url} ref={urlRef}>
								{props.web.url}
							</Text>
						</Tooltip>
					</div>

					{props.web.tags.length > 0 &&
						<Group spacing="xs">
							{
								props.web.tags.map((tag: string) =>
									<Text key={tag} size="xs" color={settings.accentColor.value} className={classes.columItem_Tag}>
										{"#" + tag}
									</Text>
								)
							}
						</Group>
					}

					<Box hidden={!hover} className={classes.columnItem_Settings}>
						<ActionIcon onClick={handleClickSettings} variant="light" >
							<Pencil size={16} />
						</ActionIcon>
					</Box>

				</Stack>
			</Card.Section>
		</Card>
	)
})

ColumnItem.displayName = "ColumnItem"
export default ColumnItem
