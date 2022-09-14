import { ActionIcon, Box, Card, Stack, Text, Tooltip } from "@mantine/core"
import { memo, useState } from "react"
import { Pencil } from "tabler-icons-react"
import { useModal } from "../../hooks/UseModal"
import { useSettings } from "../../hooks/UseSettings"
import { useStyles } from "../../hooks/UseStyles"
import { Web, WebFormMode } from "../../Types"


interface Props {
	web: Web
	category: string
}


const ColumnItem = memo((props: Props) => {
	const settings = useSettings()
	const [hover, setHover] = useState(false)
	const { classes } = useStyles()
	const urlIsLong = props.web.url.length > 25
	const modal = useModal

	const handleClick = () => {
		// Abrir enlace
		const link = document.createElement('a')
		link.target = '_blank'
		link.href = props.web.url
		link.rel = "noopener noreferrer nofollow"
		link.click()

		// TODO update stats
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

					<Text weight={500} size="sm">
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
