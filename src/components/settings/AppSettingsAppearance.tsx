import { Checkbox, ColorScheme, Select, Space, Text } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { Settings } from "../../Types";


interface Props {
	useSettings: any
}


export default function AppSettingsAppearance(props:Props) {
	const [checked, setChecked] = useState(props.useSettings.useSystemTheme)

	useEffect(()=> {
		props.useSettings.setUseSystemTheme(checked)
	}, [checked])

	return (
		<>
			<Select disabled={checked} value={props.useSettings.settings.colorScheme} onChange={props.useSettings.setColorScheme} label="Theme"
				data={[
					{ value: 'light', label: 'Light' },
					{ value: 'dark', label: 'Dark' },
				]}
			/>
			<Text size="xs" color="dimmed">You can change between Light and Dark themes with the Ctrl + J shortcut.</Text>

			<Space h="sm"/>

			<Checkbox label="Use system theme" checked={checked} onChange={(event) => setChecked(event.currentTarget.checked)}  />
		</>
	)
}
