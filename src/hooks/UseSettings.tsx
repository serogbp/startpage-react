import { ColorScheme, useMantineColorScheme } from "@mantine/core";
import { useColorScheme, useLocalStorage } from "@mantine/hooks";
import { createContext, useContext, useEffect } from "react";
import signalJs from "signal-js";
import Signals from "../Signals";
import { Settings, SettingsJsonNames } from "../Types";


const defaultSettings: Settings = {
	colorScheme: "light" ,
	useSystemTheme: false,
	accentColor: "blue"
}


const SettingsContext = createContext<SettingsHelper | undefined>(undefined)


export function SettingsProvider({children} : {children: JSX.Element | JSX.Element[]}) {
	return <SettingsContext.Provider value={settingsHelper()}>{children}</SettingsContext.Provider>
}


export function useSettings() {
	const context = useContext(SettingsContext)
	if (context === undefined) throw new Error("useSettings must bed used within a SettingsProvider")
	return context
}

interface SettingsHelper {
	colorScheme: ColorScheme;
    setColorScheme: (val: ColorScheme | ((prevState: ColorScheme) => ColorScheme)) => void;
    useSystemTheme: boolean;
    setUseSystemTheme: (val: boolean | ((prevState: boolean) => boolean)) => void;
    accentColor: string;
    setAccentColor: (val: string | ((prevState: string) => string)) => void;
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
	})
}
