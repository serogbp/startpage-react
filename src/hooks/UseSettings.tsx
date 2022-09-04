import { ColorScheme } from "@mantine/core"
import { useLocalStorage } from "@mantine/hooks"
import { createContext, useContext, useEffect } from "react"
import signalJs from "signal-js"
import Signals from "../Signals"


enum SettingsJsonNames {
	colorScheme = "color-scheme",
	accentColor = "accent-color",
	backgroundColor = "background-color",
	useSystemTheme = "use-system-theme",
	keepWebsWhenImport = "keep-webs-when-import"
}


interface SettingsHelper {
	colorScheme: ColorScheme
    setColorScheme: (val: ColorScheme | ((prevState: ColorScheme) => ColorScheme)) => void
    useSystemTheme: boolean
    setUseSystemTheme: (val: boolean | ((prevState: boolean) => boolean)) => void
    accentColor: string
    setAccentColor: (val: string | ((prevState: string) => string)) => void
    backgroundColor: string
    setBackgroundColor: (val: string | ((prevState: string) => string)) => void
    keepWebsWhenImport: boolean
    setKeepWebsWhenImport: (val: boolean | ((prevState: boolean) => boolean)) => void
}



const defaultSettings = {
	colorScheme: "light",
	useSystemTheme: false,
	accentColor: "blue",
	backgroundColor: "#74c0fc",
	keepWebsWhenImport: true,
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

	const [backgroundColor, setBackgroundColor] = useLocalStorage<string>({
		key: SettingsJsonNames.backgroundColor,
		defaultValue: defaultSettings.backgroundColor
	})

	const [keepWebsWhenImport, setKeepWebsWhenImport] = useLocalStorage<boolean>({
		key: SettingsJsonNames.keepWebsWhenImport,
		defaultValue: defaultSettings.keepWebsWhenImport
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
		backgroundColor,
		setBackgroundColor,
		keepWebsWhenImport,
		setKeepWebsWhenImport,
	})
}
