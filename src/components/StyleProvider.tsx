import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core'
import { useColorScheme, useHotkeys } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import signalJs from 'signal-js';
import { useSettings } from '../hooks/UseSettings';
import Signals from '../Signals';


export default function StyleProvider({ children }: { children: JSX.Element | JSX.Element[] }) {
	const settings = useSettings()
	const [colorScheme, setColorScheme] = useState(settings.colorScheme)
	const preferredColorScheme = useColorScheme()

	useEffect(() => {
		settings.setColorScheme(colorScheme)
	}, [colorScheme])

	useEffect(() => {
		if (settings.useSystemTheme) setColorScheme(preferredColorScheme)
	}, [preferredColorScheme])

	const toggleColorScheme = (value?: ColorScheme) => {
		const newValue = value || (colorScheme === 'dark' ? 'light' : 'dark')

		if (settings.useSystemTheme) {
			if (colorScheme !== preferredColorScheme) setColorScheme(preferredColorScheme)
		}
		else {
			setColorScheme(newValue)
		}
	}

	const forceToggleColorScheme = () => {
		if (settings.useSystemTheme) settings.setUseSystemTheme(false)
		const newValue = colorScheme === 'dark' ? 'light' : 'dark'
		setColorScheme(newValue)
	}
	useHotkeys([['mod+J', () => forceToggleColorScheme()]]);

	signalJs.clear(Signals.toggleColorScheme)
	signalJs.on(Signals.toggleColorScheme, toggleColorScheme)

	return (
		<ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
			<MantineProvider
				withNormalizeCSS withGlobalStyles
				theme={{
					colorScheme: `${colorScheme}`,
					primaryColor: settings.accentColor.name.toLowerCase()
				}}>
				{children}
			</MantineProvider>
		</ColorSchemeProvider>
	)
}
