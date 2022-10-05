import { Checkbox, CheckIcon, ColorScheme, ColorSwatch, Group, Select, Text, useMantineTheme } from "@mantine/core";
import { useEffect, useState } from "react";
import { useSettings } from "../../../hooks/UseSettings";
import { MyColor } from "../../../Types";
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
	const [toggleColor, setToggleColor] = useState<MyColor>(settings.accentColor)
	const theme = useMantineTheme()
	const colors = [
		{ toggle: false, name: "Gray", value: theme.colors.gray[5] },
		{ toggle: false, name: "Red", value: theme.colors.red[5] },
		{ toggle: false, name: "Pink", value: theme.colors.pink[5] },
		{ toggle: false, name: "Grape", value: theme.colors.grape[5] },
		{ toggle: false, name: "Violet", value: theme.colors.violet[5] },
		{ toggle: false, name: "Indigo", value: theme.colors.indigo[5] },
		{ toggle: false, name: "Blue", value: theme.colors.blue[5] },
		{ toggle: false, name: "Cyan", value: theme.colors.cyan[5] },
		{ toggle: false, name: "Teal", value: theme.colors.teal[5] },
		{ toggle: false, name: "Green", value: theme.colors.green[5] },
		{ toggle: false, name: "Lime", value: theme.colors.lime[5] },
		{ toggle: false, name: "Yellow", value: theme.colors.yellow[5] },
		{ toggle: false, name: "Orange", value: theme.colors.orange[5] },
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
							color={color.value}
							size={20}
							onClick={() => setToggleColor({ name: color.name.toLowerCase(), value: color.value })}
							sx={{ value: '#fff', cursor: 'pointer' }}
						>
							{color.value === toggleColor.value && <CheckIcon width={10} />}
						</ColorSwatch>
					))
				}
			</Group>
			<Text size="xs" color="dimmed">{capitalizeFirstLetter(toggleColor.name)}</Text>
			<AccentColorElements/>
		</MyPanel >
	)
}


const BackgroundColorLight = () => {
	const settings = useSettings()
	const [toggleColor, setToggleColor] = useState<MyColor>(settings.backgroundColorLight)
	const theme = useMantineTheme()
	const colors = [
		{ toggle: false, name: "White", value: theme.colors.gray[0] },
		{ toggle: false, name: "Red", value: theme.colors.red[3] },
		{ toggle: false, name: "Pink", value: theme.colors.pink[3] },
		{ toggle: false, name: "Grape", value: theme.colors.grape[3] },
		{ toggle: false, name: "Violet", value: theme.colors.violet[3] },
		{ toggle: false, name: "Indigo", value: theme.colors.indigo[3] },
		{ toggle: false, name: "Blue", value: theme.colors.blue[3] },
		{ toggle: false, name: "Cyan", value: theme.colors.cyan[3] },
		{ toggle: false, name: "Teal", value: theme.colors.teal[3] },
		{ toggle: false, name: "Green", value: theme.colors.green[3] },
		{ toggle: false, name: "Lime", value: theme.colors.lime[3] },
		{ toggle: false, name: "Yellow", value: theme.colors.yellow[3] },
		{ toggle: false, name: "Orange", value: theme.colors.orange[3] },
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
							color={color.value}
							onClick={() => setToggleColor({ name: color.name.toLowerCase(), value: color.value })}
							size={20}
							sx={{ value: '#fff', cursor: 'pointer' }}
						>
							{color.value === toggleColor.value && <CheckIcon width={10} />}
						</ColorSwatch>
					))
				}
			</Group>
			<Text size="xs" color="dimmed">{capitalizeFirstLetter(toggleColor.name)}</Text>
		</MyPanel >
	)
}


const BackgroundColorDark = () => {
	const settings = useSettings()
	const [toggleColor, setToggleColor] = useState<MyColor>(settings.backgroundColorDark)
	const theme = useMantineTheme()
	const colors = [
		{ toggle: false, name: "Black", value: theme.colors.dark[8] },
		{ toggle: false, name: "Red", value: theme.colors.red[9] },
		{ toggle: false, name: "Pink", value: theme.colors.pink[9] },
		{ toggle: false, name: "Grape", value: theme.colors.grape[9] },
		{ toggle: false, name: "Violet", value: theme.colors.violet[9] },
		{ toggle: false, name: "Indigo", value: theme.colors.indigo[9] },
		{ toggle: false, name: "Blue", value: theme.colors.blue[9] },
		{ toggle: false, name: "Cyan", value: theme.colors.cyan[9] },
		{ toggle: false, name: "Teal", value: theme.colors.teal[9] },
		{ toggle: false, name: "Green", value: theme.colors.green[9] },
		{ toggle: false, name: "Lime", value: theme.colors.lime[9] },
		{ toggle: false, name: "Yellow", value: theme.colors.yellow[9] },
		{ toggle: false, name: "Orange", value: theme.colors.orange[9] },
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
							color={color.value}
							onClick={() => setToggleColor({ name: color.name.toLowerCase(), value: color.value })}
							size={20}
							sx={{ value: '#fff', cursor: 'pointer' }}
						>
							{color.value === toggleColor.value && <CheckIcon width={10} />}
						</ColorSwatch>
					))
				}
			</Group>
			<Text size="xs" color="dimmed">{capitalizeFirstLetter(toggleColor.name)}</Text>
		</MyPanel >
	)
}


const Columns = () => {
	const settings = useSettings()
	return (
		<MyPanel title="Categories">
			<Select value={settings.columnWidth.toString()} onChange={(value: string) => settings.setColumnWidth(parseInt(value))} label="Category width"
				data={[
					{ value: "200", label: 'Small' },
					{ value: "250", label: 'Default' },
					{ value: "300", label: 'Medium' },
					{ value: "350", label: 'Large' },
					{ value: "400", label: 'XLarge' },
				]}
			/>

		<Checkbox label="Hide empty categories" checked={settings.hideEmptyColumns} onChange={(event) => settings.setHideEmptyColumns(event.currentTarget.checked)} />
		<Checkbox label="Hide create category button " checked={settings.hideCreateColumnButton} onChange={(event) => settings.setHideCreateColumnButton(event.currentTarget.checked)} />
		</MyPanel>

	)
}


const AccentColorElements = () => {
	const settings = useSettings()
	return (
		<Checkbox label="Webs and categories with accent color (light theme only)" checked={settings.accentColorElements} onChange={(event) => settings.setAccentColorElements(event.currentTarget.checked)} />
	)
}
