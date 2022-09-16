import { Checkbox, CheckIcon, ColorScheme, ColorSwatch, Group, Select, Text, useMantineTheme } from "@mantine/core";
import { useEffect, useState } from "react";
import { useSettings } from "../../../hooks/UseSettings";
import { capitalizeFirstLetter } from "../../../utils/utils";
import MyDivider from "../common/MyDivider";
import MyPanel from "../common/MyPanel";


export default function AppSettingsAppearance() {
	const settings = useSettings()
	return (
		<>
			<Theme />
			<MyDivider />
			{(settings.colorScheme === "light" as ColorScheme) && <BackgroundColorLight />}
			{(settings.colorScheme === "dark" as ColorScheme) && <BackgroundColorDark />}
			<MyDivider />
			<AccentColor />
			<MyDivider />
			<Columns />
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


const BackgroundColorLight = () => {
	const settings = useSettings()
	const [toggleColor, setToggleColor] = useState(settings.backgroundColorLight)
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
		settings.setBackgroundColorLight(toggleColor)
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


const BackgroundColorDark = () => {
	const settings = useSettings()
	const [toggleColor, setToggleColor] = useState(settings.backgroundColorDark)
	const theme = useMantineTheme()
	const colors = [
		{ toggle: false, name: "Black", color: theme.colors.dark[7] },
		{ toggle: false, name: "Red", color: theme.colors.red[9] },
		{ toggle: false, name: "Pink", color: theme.colors.pink[9] },
		{ toggle: false, name: "Grape", color: theme.colors.grape[9] },
		{ toggle: false, name: "Violet", color: theme.colors.violet[9] },
		{ toggle: false, name: "Indigo", color: theme.colors.indigo[9] },
		{ toggle: false, name: "Blue", color: theme.colors.blue[9] },
		{ toggle: false, name: "Cyan", color: theme.colors.cyan[9] },
		{ toggle: false, name: "Teal", color: theme.colors.teal[9] },
		{ toggle: false, name: "Green", color: theme.colors.green[9] },
		{ toggle: false, name: "Lime", color: theme.colors.lime[9] },
		{ toggle: false, name: "Yellow", color: theme.colors.yellow[9] },
		{ toggle: false, name: "Orange", color: theme.colors.orange[9] },
	]

	useEffect(() => {
		settings.setBackgroundColorDark(toggleColor)
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


const Columns = () => {
	const settings = useSettings()
	return (
		<MyPanel title="Columns">
			<Select value={settings.columnWidth.toString()} onChange={(value: string) => settings.setColumnWidth(parseInt(value))} label="Column width"
				data={[
					{ value: "200", label: 'Small' },
					{ value: "250", label: 'Default' },
					{ value: "300", label: 'Medium' },
					{ value: "350", label: 'Large' },
					{ value: "400", label: 'XLarge' },
				]}
			/>

		<Checkbox label="Hide empty columns" checked={settings.hideEmptyColumns} onChange={(event) => settings.setHideEmptyColumns(event.currentTarget.checked)} />
		</MyPanel>

	)
}
