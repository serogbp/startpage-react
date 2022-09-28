import { Kbd, List, Table } from "@mantine/core";
import { getOSModifier } from "../../../utils/utils";
import { useId } from '@mantine/hooks'

export default function AppSettingsKeyboardShortcuts() {
	const elements = [
		{
			"name": "Change theme",
			"shortcuts": [(<><Kbd>{getOSModifier()}</Kbd> + <Kbd>J</Kbd></>)]
		},
		{
			"name": "Open SpotLight",
			"shortcuts": [
				(<><Kbd>/</Kbd></>),
				(<><Kbd>{getOSModifier()}</Kbd> + <Kbd>K</Kbd></>),
				(<><Kbd>{getOSModifier()}</Kbd> + <Kbd>P</Kbd></>),
			]
		}
	]

	const thead = (
		<tr>
			<th>Name</th>
			<th>Shortcut</th>
		</tr>
	)

	const rows = elements.map(element => (
		<tr key={element.name}>
			<td>{element.name}</td>
			<td>
				<List spacing="xl" size="xl" >
				{element.shortcuts.map(shortcut => (
						<List.Item key={useId()}>
							{shortcut}
						</List.Item>
					))}
				</List>
			</td>
		</tr>
	))

	return (
		<Table>
			<thead>{thead}</thead>
			<tbody>{rows}</tbody>
		</Table>
	)
}
