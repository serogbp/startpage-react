import { Text, Container, Center, Stack, createStyles, useMantineTheme, Kbd, List, Alert, Space } from "@mantine/core"
import { useModal } from "../hooks/UseModal"
import { useSettings } from "../hooks/UseSettings"
import { getOSModifier } from "../utils/utils"

const styles = createStyles((theme, _params, getRef) => ({
	container: {
		width: "100vw",
		height: "100vh",

	},
	emoji: {
		fontSize: "4rem",
		lineHeight: "normal"
	},
	title: {
		fontSize: "2rem",
		fontWeight: "bold",
		marginBottom: "1em"
	},
	icon: {
		fontSize: "1.2rem"
	}
}))

export default function EmptyState() {
	const { classes } = styles()
	const settings = useSettings()
	const theme = useMantineTheme()

	const handleClick = () => {
		useModal.webAdd()
	}

	return (
		<Center
			onClick={handleClick}
			style={{ backgroundColor: theme.colorScheme === 'dark' ? settings.backgroundColorDark.value : settings.backgroundColorLight.value }}
			className={classes.container}
		>
			<Container size="xs" >
				<Text align="center" className={classes.emoji}>🐪🐫</Text>
				<Text align="center" className={classes.title}>It{"'"}s empty here...</Text>

				<Stack>
					<Alert icon={<Text className={classes.icon}>💡</Text>} title="The beginning">
						Open the Command Bar or press anywhere on the screen to add your first web.
					</Alert>

					<Alert icon={<Text className={classes.icon}>💡</Text>} title="Command bar">
						{/* <Text>With the search bar you can open your saved webs, add new ones or access the settings.</Text> */}
						<Text>The Command Bar is a widget that let you do many things:</Text>
						<List  size="sm" withPadding>
							<List.Item>Add new bookmarks and categories</List.Item>
							<List.Item>Search and open your saved bookmarks</List.Item>
							<List.Item>Open the settings </List.Item>
						</List>
						<Space h="md" />
						<Text>To open the Command Bar use one of the following shortcuts:</Text>
						<List spacing="sm" size="sm" withPadding pb="xs">
							<List.Item>
								<Kbd>/</Kbd>
							</List.Item>
							<List.Item>
								<Kbd>{getOSModifier()}</Kbd> + <Kbd>K</Kbd>
							</List.Item>
							<List.Item>
								<Kbd>{getOSModifier()}</Kbd> + <Kbd>P</Kbd>
							</List.Item>
						</List>
					</Alert>

				</Stack>
			</Container>
		</Center>
	)
}
