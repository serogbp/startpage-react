import { Checkbox, CheckIcon, ColorScheme, ColorSwatch, DefaultMantineColor, Divider, Group, MantineColor, Radio, Select, Space, Stack, Text, useMantineTheme } from "@mantine/core";
import { useEffect, useState } from "react";
import { useSettings } from "../../../hooks/UseSettings";
import { capitalizeFirstLetter } from "../../../utils/utils";
import MyDivider from "../common/MyDivider";
import MyPanel from "../common/MyPanel";


export default function AppSettingsAppearance() {
	return (
		<>
			<Theme />
			<MyDivider />
			<AccentColor />
			<MyDivider />
			<BackgroundColor/>
		</>
	)
}


const Theme = () => {
	const settings = useSettings()
	return (
		<MyPanel title={"Theme"}>
			<Select disabled={settings.useSystemTheme} value={settings.colorScheme} onChange={(value) => settings.setColorScheme(value as ColorScheme)} label="Color scheme"
				data={[
					{ value: 'light', label: 'Light' },
					{ value: 'dark', label: 'Dark' },
				]}
			/>
			<Text size="xs" color="dimmed">You can change the color scheme with the Ctrl + J shortcut.</Text>
			<Checkbox label="Use system theme" checked={settings.useSystemTheme} onChange={(event) => settings.setUseSystemTheme(event.currentTarget.checked)} />
		</MyPanel>
	)
}


const AccentColor = () => {
	const settings = useSettings()
	const [toggleColor, setToggleColor] = useState(settings.accentColor)
	const theme = useMantineTheme()
	const colors = [
		{ toggle: false, name: "Gray", color: theme.colors.gray[5] },
		{ toggle: false, name: "Red", color: theme.colors.red[5] },
		{ toggle: false, name: "Pink", color: theme.colors.pink[5] },
		{ toggle: false, name: "Grape", color: theme.colors.grape[5] },
		{ toggle: false, name: "Violet", color: theme.colors.violet[5] },
		{ toggle: false, name: "Indigo", color: theme.colors.indigo[5] },
		{ toggle: false, name: "Blue", color: theme.colors.blue[5] },
		{ toggle: false, name: "Cyan", color: theme.colors.cyan[5] },
		{ toggle: false, name: "Teal", color: theme.colors.teal[5] },
		{ toggle: false, name: "Green", color: theme.colors.green[5] },
		{ toggle: false, name: "Lime", color: theme.colors.lime[5] },
		{ toggle: false, name: "Yellow", color: theme.colors.yellow[5] },
		{ toggle: false, name: "Orange", color: theme.colors.orange[5] },
	]


	useEffect(() => {
		settings.setAccentColor(toggleColor)
	}, [toggleColor])


	return (
		<MyPanel title={"Accent color"}>
			<Group spacing="xs">
				{
					colors.map(color => (
						<ColorSwatch
							key={color.name}
							component="button"
							color={color.color}
							size={20}
							onClick={() => setToggleColor(color.name.toLowerCase())}
							sx={{ color: '#fff', cursor: 'pointer' }}
						>
							{color.name.toLowerCase() === toggleColor && <CheckIcon width={10} />}
						</ColorSwatch>
					))
				}
			</Group>
			<Text size="xs" color="dimmed">{capitalizeFirstLetter(toggleColor)}</Text>
		</MyPanel >
	)
}


const BackgroundColor = () => {
	const settings = useSettings()
	const [toggleColor, setToggleColor] = useState(settings.backgroundColor)
	const theme = useMantineTheme()
	const colors = [
		{ toggle: false, name: "White", color: theme.colors.gray[0] },
		{ toggle: false, name: "Red", color: theme.colors.red[3] },
		{ toggle: false, name: "Pink", color: theme.colors.pink[3] },
		{ toggle: false, name: "Grape", color: theme.colors.grape[3] },
		{ toggle: false, name: "Violet", color: theme.colors.violet[3] },
		{ toggle: false, name: "Indigo", color: theme.colors.indigo[3] },
		{ toggle: false, name: "Blue", color: theme.colors.blue[3] },
		{ toggle: false, name: "Cyan", color: theme.colors.cyan[3] },
		{ toggle: false, name: "Teal", color: theme.colors.teal[3] },
		{ toggle: false, name: "Green", color: theme.colors.green[3] },
		{ toggle: false, name: "Lime", color: theme.colors.lime[3] },
		{ toggle: false, name: "Yellow", color: theme.colors.yellow[3] },
		{ toggle: false, name: "Orange", color: theme.colors.orange[3] },
	]

	useEffect(() => {
		settings.setBackgroundColor(toggleColor)
	}, [toggleColor])

	return (
		<MyPanel title={"Background color"}>
			<Group spacing="xs">
				{
					colors.map(color => (
						<ColorSwatch
							key={color.name}
							component="button"
							color={color.color}
							onClick={() => setToggleColor(color.color)}
							size={20}
							sx={{ color: '#fff', cursor: 'pointer' }}
						>
							{color.color === toggleColor && <CheckIcon width={10} />}
						</ColorSwatch>
					))
				}
			</Group>
			<Text size="xs" color="dimmed">{capitalizeFirstLetter(colors.find(color => color.color == toggleColor)?.name ?? "")}</Text>
		</MyPanel >
	)
}
