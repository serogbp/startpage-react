import { Checkbox, ColorScheme, Select, Space, Text } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { Settings } from "../../Types";


interface Props {
	settings: any
}


export default function AppSettingsAppearance(props:Props) {




	return (
		<>
			<Select disabled={props.settings.useSystemTheme} value={props.settings.colorScheme} onChange={props.settings.setColorScheme} label="Theme"
				data={[
					{ value: 'light', label: 'Light' },
					{ value: 'dark', label: 'Dark' },
				]}
			/>
			<Text size="xs" color="dimmed">You can change between Light and Dark themes with the Ctrl + J shortcut.</Text>

			<Space h="sm"/>

			<Checkbox label="Use system theme" checked={props.settings.useSystemTheme} onChange={(event) => props.settings.setUseSystemTheme(event.currentTarget.checked)}  />

			<Space h="sm"/>
		</>
	)
}
