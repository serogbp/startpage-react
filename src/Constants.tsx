import { useMantineTheme } from "@mantine/core"
import { useSettings } from "./hooks/UseSettings"

export const backgroundColorColumn = (() => {
	const theme = useMantineTheme()
	const settings = useSettings()

	const columnLightBackground = theme.colors.gray[1]
	const columnLightAccentBackground = theme.colors[settings.accentColor.name][1]
	const columnDarkBackground = theme.colors.dark[7]

	let color = theme.colorScheme === 'dark' ? columnDarkBackground : columnLightBackground
	if (settings.accentColorElements) {
		color = theme.colorScheme === 'dark' ? columnDarkBackground : columnLightAccentBackground
	}
	return color
})
