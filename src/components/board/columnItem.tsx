import { ActionIcon, Box, Card, Stack, Text, Tooltip, Badge, Group } from "@mantine/core"
import { memo, useEffect, useRef, useState } from "react"
import { Pencil } from "tabler-icons-react"
import { useBoard } from "../../hooks/useBoard/UseBoard"
import { useModal } from "../../hooks/UseModal"
import { useSettings } from "../../hooks/UseSettings"
import { useStyles } from "../../hooks/UseStyles"
import { Web } from "../../Types"


interface Props {
	web: Web
	category: string
}


const ColumnItem = memo((props: Props) => {
	const settings = useSettings()
	const board = useBoard()
	const modal = useModal
	const { classes } = useStyles()

	const [hover, setHover] = useState(false)
	const [urlIsLong, setUrlsIsLong] = useState(false)

	const urlRef = useRef(null)


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
			withBorder radius="sm" className={classes.columnItem_Card}
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
							color={settings.accentColor}
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
									<Text key={tag} size="xs" color={settings.accentColor} className={classes.wordBreak}>
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
