import { ColorScheme } from "@mantine/core"
import { useLocalStorage } from "@mantine/hooks"
import { createContext, useContext, useEffect } from "react"
import signalJs from "signal-js"
import Signals from "../Signals"
import { MyColor } from "../Types"


interface SettingsHelper {
	colorScheme: ColorScheme
	setColorScheme: (val: ColorScheme | ((prevState: ColorScheme) => ColorScheme)) => void
	useSystemTheme: boolean
	setUseSystemTheme: (val: boolean | ((prevState: boolean) => boolean)) => void
	keepWebsWhenImport: boolean
	setKeepWebsWhenImport: (val: boolean | ((prevState: boolean) => boolean)) => void
	accentColorElements: boolean
	setAccentColorElements: (val: boolean | ((prevState: boolean) => boolean)) => void
	accentColor: MyColor
	setAccentColor: (val: MyColor | ((prevState: MyColor) => MyColor)) => void
	backgroundColorLight: MyColor
	setBackgroundColorLight: (val: MyColor | ((prevState: MyColor) => MyColor)) => void
	backgroundColorDark: MyColor
	setBackgroundColorDark: (val: MyColor | ((prevState: MyColor) => MyColor)) => void
	columnWidth: number
	setColumnWidth: (val: number | ((prevState: number) => number)) => void
	hideEmptyColumns: boolean
	setHideEmptyColumns: (val: boolean | ((prevState: boolean) => boolean)) => void
	hideCreateColumnButton: boolean
	setHideCreateColumnButton: (val: boolean | ((prevState: boolean) => boolean)) => void
}


const SettingsContext = createContext<SettingsHelper | undefined>(undefined)


export function SettingsProvider({ children }: { children: JSX.Element | JSX.Element[] }) {
	return <SettingsContext.Provider value={settingsHelper()}>{children}</SettingsContext.Provider>
}


export function useSettings() {
	const context = useContext(SettingsContext)
	if (context === undefined) throw new Error("useSettings must be used within a SettingsProvider")
	return context
}


enum SettingsJsonNames {
	colorScheme = "color-scheme",
	accentColorElements = "accent-color-elements",
	accentColor = "accent-color",
	backgroundColorLight = "background-color-light",
	backgroundColorDark = "background-color-dark",
	useSystemTheme = "use-system-theme",
	keepWebsWhenImport = "keep-webs-when-import",
	columnWidth = "column-width",
	hideEmptyColumns = "hide-empty-columns",
	hideCreateColumnButton = "hide-create-column-button"
}


const defaultSettings = {
	colorScheme: "light",
	useSystemTheme: false,
	accentColorElements: false,
	accentColor: {name: "blue", value: "#339af0"},
	backgroundColorLight: {name: "blue", value: "#74c0fc"},
	backgroundColorDark: {name: "dark", value: "#141517"},
	keepWebsWhenImport: false,
	columnWidth: 250,
	hideEmptyColumns: false,
	hideCreateColumnButton: false
}


function settingsHelper() {
	const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
		key: SettingsJsonNames.colorScheme,
		defaultValue: defaultSettings.colorScheme as ColorScheme
	})

	const [useSystemTheme, setUseSystemTheme] = useLocalStorage<boolean>({
		key: SettingsJsonNames.useSystemTheme,
		defaultValue: defaultSettings.useSystemTheme
	})

	const [accentColorElements, setAccentColorElements] = useLocalStorage<boolean>({
		key: SettingsJsonNames.accentColorElements,
		defaultValue: defaultSettings.accentColorElements
	})

	const [accentColor, setAccentColor] = useLocalStorage<MyColor>({
		key: SettingsJsonNames.accentColor,
		defaultValue: defaultSettings.accentColor
	})

	const [backgroundColorLight, setBackgroundColorLight] = useLocalStorage<MyColor>({
		key: SettingsJsonNames.backgroundColorLight,
		defaultValue: defaultSettings.backgroundColorLight
	})

	const [backgroundColorDark, setBackgroundColorDark] = useLocalStorage<MyColor>({
		key: SettingsJsonNames.backgroundColorDark,
		defaultValue: defaultSettings.backgroundColorDark
	})

	const [keepWebsWhenImport, setKeepWebsWhenImport] = useLocalStorage<boolean>({
		key: SettingsJsonNames.keepWebsWhenImport,
		defaultValue: defaultSettings.keepWebsWhenImport
	})

	const [columnWidth, setColumnWidth] = useLocalStorage<number>({
		key: SettingsJsonNames.columnWidth,
		defaultValue: defaultSettings.columnWidth
	})

	const [hideEmptyColumns, setHideEmptyColumns] = useLocalStorage<boolean>({
		key: SettingsJsonNames.hideEmptyColumns,
		defaultValue: defaultSettings.hideEmptyColumns
	})

	const [hideCreateColumnButton, setHideCreateColumnButton] = useLocalStorage<boolean>({
		key: SettingsJsonNames.hideCreateColumnButton,
		defaultValue: defaultSettings.hideCreateColumnButton
	})


	useEffect(() => {
		signalJs.emit(Signals.toggleColorScheme, colorScheme)
	}, [colorScheme])

	useEffect(() => {
		// Solo cambiar de tema si pone en check Checkbox
		// Si quita el check, dejar el tema seleccionado en el Select
		if (useSystemTheme) signalJs.emit(Signals.toggleColorScheme, colorScheme)
	}, [useSystemTheme])


	return ({
		colorScheme,
		setColorScheme,
		useSystemTheme,
		setUseSystemTheme,
		accentColorElements,
		setAccentColorElements,
		accentColor,
		setAccentColor,
		backgroundColorLight: backgroundColorLight,
		setBackgroundColorLight: setBackgroundColorLight,
		backgroundColorDark: backgroundColorDark,
		setBackgroundColorDark: setBackgroundColorDark,
		keepWebsWhenImport,
		setKeepWebsWhenImport,
		columnWidth,
		setColumnWidth,
		hideEmptyColumns,
		setHideEmptyColumns,
		hideCreateColumnButton,
		setHideCreateColumnButton
	})
}
