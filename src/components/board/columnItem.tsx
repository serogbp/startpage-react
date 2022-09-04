import { ActionIcon, Box, Card, createStyles, Stack, Text, Tooltip } from "@mantine/core"
import { openContextModal } from "@mantine/modals"
import { memo, useState } from "react"
import { Dots, Pencil } from "tabler-icons-react"
import { useSettings } from "../../hooks/UseSettings"
import { Web, WebFormMode } from "../../Types"



interface Props {
	web: Web
	category: string
}

const useStyles = createStyles((theme) => ({
	card: {
		backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.white,
		padding: theme.spacing.md,
		width: "auto",
		minHeight: 10,
		marginBottom: 8,

		'&:hover': {
			backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2],
		},
	},

	body: {
		padding: theme.spacing.md,
	},

	name: {
		overflow: "hidden",
		whiteSpace: "normal",

	},

	url: {
		overflow: "hidden",
		whiteSpace: "nowrap",
		textOverflow: "ellipsis"
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
	const [hover, setHover] = useState(false)
	const { classes } = useStyles()
	const urlIsLong = props.web.url.length > 25

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
		openContextModal({
			title: "Edit web",
			modal: "webForm",
			centered: true,
			trapFocus: true,
			innerProps: {
				props: {
					mode: WebFormMode.update,
					category: props.category,
					web: props.web
				}
			}
		})
	}

	return (
		<Card
			withBorder radius="sm" className={classes.card}
			shadow="xs"
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

						<Text size="sm" color="dimmed" className={classes.url}>
							{props.web.url}
						</Text>

					</Tooltip>

					<Box hidden={!hover} className={classes.settings}>
						<ActionIcon onClick={handleClickSettings} variant="light" >
							<Pencil size={16} />
						</ActionIcon>
					</Box>

				</Stack>
			</Card.Section>
		</Card>
	)
})


export default ColumnItem
