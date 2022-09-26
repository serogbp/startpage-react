import { ActionIcon, Box, Card, Stack, Text, Tooltip, Badge, Group } from "@mantine/core"
import { memo, useState } from "react"
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
	const [hover, setHover] = useState(false)
	const { classes } = useStyles()
	const urlIsLong = props.web.url.length > 25
	const modal = useModal

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
							<Text size="sm" color="dimmed" className={classes.columnItem_Url}>
								{props.web.url}
							</Text>
						</Tooltip>
					</div>

					{props.web.tags.length > 0 &&
						<Group>
							{
								props.web.tags.map((tag: string) =>
									<Text key={tag} size="xs" color={settings.accentColor} >
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
