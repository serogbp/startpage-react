import {Divider, Title, Text, List, Stack } from '@mantine/core';

export default function Changelog() {
	const changelogArray = [
		{
			title: "v1.0.0 (2022/08/8)",
			changes: [
				"First release 🥳"
			]
		},
		{
			title: "v1.0.1 (2022/08/22)",
			changes: [
				'Fix: change theme according to the device theme when the option "use system theme" is checked.'
			]
		},
		{
			title: "v1.0.2 (2022/11/2)",
			changes: [
				"Show favicon of each web in the card (Settings -> Appearance -> Webs).",
				"Improve web name suggestion when adding a new web."
			]
		},
		{
			title: "v1.1.0 (2022/11/8)",
			changes: [
				"Added a Navbar."
			]
		},
		{
			title: "v1.2.0 (2022/11/8)",
			changes: [
				"Added text favicons.",
				"Added preview when creating or modifying a web."
			]
		},

	]

	// Añadir (current) al última versión
	changelogArray[changelogArray.length - 1].title = changelogArray[changelogArray.length - 1].title + " (current)"
	// Ordenar por versiones mas recientes
	changelogArray.reverse()

	return (
		<Stack spacing='xl'>
			<Title order={2}>Changelog</Title>
			<Stack>
				{
					changelogArray.map(item => {
						return (
							<Stack key={item.title} mb='xl'>
								<Text size='xl' weight='bold'>{item.title}</Text>
								<Divider />
								<List>
									{
										item.changes.map((change, index) => {
											return <List.Item key={index}> {change} </List.Item>
										})
									}
								</List>
							</Stack>
						)
					})
				}
			</Stack>
		</Stack >
	)
}
