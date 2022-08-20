import { useMantineColorScheme } from "@mantine/core";
import { useColorScheme, useLocalStorage } from "@mantine/hooks";
import { useEffect } from "react";
import { Settings } from "../Types";


const defaultSettings: Settings = {
	colorScheme: "system",
	useSystemTheme: false,
	accentColor: "blue"
}

export default function UseSettings() {
	const [settings, setSettings] = useLocalStorage<Settings>({
		key: "settings",
		defaultValue: defaultSettings
	})
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();
	const preferredColorScheme = useColorScheme();


	useEffect(() => {
		if (settings.useSystemTheme === true) {
			if (colorScheme !== preferredColorScheme) toggleColorScheme()
		} else {
			if (colorScheme !== settings.colorScheme) toggleColorScheme()
		}
	}, [settings.colorScheme, settings.useSystemTheme])


	const setColorScheme = (value: string) => {
		// const newColorScheme = (value === "system") ? preferredColorScheme : value
		// if (newColorScheme !== settings.colorScheme) toggleColorScheme()
		setSettings({
			...settings,
			colorScheme: value,
			useSystemTheme: false,
		})
	}

	const setUseSystemTheme = (value: boolean) => setSettings({...settings, useSystemTheme: value})

	return ({
		settings,
		setSettings,
		setColorScheme,
		toggleColorScheme,
		setUseSystemTheme
	})
}
