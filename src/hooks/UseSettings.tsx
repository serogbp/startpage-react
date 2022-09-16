import { ColorScheme } from "@mantine/core"
import { useLocalStorage } from "@mantine/hooks"
import { createContext, useContext, useEffect } from "react"
import signalJs from "signal-js"
import Signals from "../Signals"


enum SettingsJsonNames {
	colorScheme = "color-scheme",
	accentColor = "accent-color",
	backgroundColorLight = "background-color-light",
	backgroundColorDark = "background-color-dark",
	useSystemTheme = "use-system-theme",
	keepWebsWhenImport = "keep-webs-when-import",
	columnWidth = "column-width",
	hideEmptyColumns = "hide-empty-columns"
}


interface SettingsHelper {
	colorScheme: ColorScheme
	setColorScheme: (val: ColorScheme | ((prevState: ColorScheme) => ColorScheme)) => void
	useSystemTheme: boolean
	setUseSystemTheme: (val: boolean | ((prevState: boolean) => boolean)) => void
	keepWebsWhenImport: boolean
	setKeepWebsWhenImport: (val: boolean | ((prevState: boolean) => boolean)) => void
	accentColor: string
	setAccentColor: (val: string | ((prevState: string) => string)) => void
	backgroundColorLight: string
	setBackgroundColorLight: (val: string | ((prevState: string) => string)) => void
	backgroundColorDark: string
	setBackgroundColorDark: (val: string | ((prevState: string) => string)) => void
	columnWidth: number
	setColumnWidth: (val: number | ((prevState: number) => number)) => void
	hideEmptyColumns: boolean
	setHideEmptyColumns: (val: boolean | ((prevState: boolean) => boolean)) => void
}



const defaultSettings = {
	colorScheme: "light",
	useSystemTheme: false,
	accentColor: "blue",
	backgroundColorLight: "#74c0fc",
	backgroundColorDark: "#141517",
	keepWebsWhenImport: true,
	columnWidth: 250,
	hideEmptyColumns: false
}


const SettingsContext = createContext<SettingsHelper | undefined>(undefined)


export function SettingsProvider({ children }: { children: JSX.Element | JSX.Element[] }) {
	return <SettingsContext.Provider value={settingsHelper()}>{children}</SettingsContext.Provider>
}


export function useSettings() {
	const context = useContext(SettingsContext)
	if (context === undefined) throw new Error("useSettings must bed used within a SettingsProvider")
	return context
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

	const [accentColor, setAccentColor] = useLocalStorage<string>({
		key: SettingsJsonNames.accentColor,
		defaultValue: defaultSettings.accentColor
	})

	const [backgroundColorLight, setBackgroundColorLight] = useLocalStorage<string>({
		key: SettingsJsonNames.backgroundColorLight,
		defaultValue: defaultSettings.backgroundColorLight
	})

	const [backgroundColorDark, setBackgroundColorDark] = useLocalStorage<string>({
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
		setHideEmptyColumns
	})
}
