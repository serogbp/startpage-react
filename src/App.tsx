import { AppShell, ColorScheme, ColorSchemeProvider, MantineProvider, useMantineTheme } from '@mantine/core'
import { useHotkeys, useLocalStorage } from '@mantine/hooks';
import './App.css'
import { Board } from './components/board'
import { UseWebs } from './hooks/UseWebs';


function App() {
	const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
		key: 'mantine-color-scheme',
		defaultValue: 'light',
	});
	const toggleColorScheme = (value?: ColorScheme) =>
		setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
	useHotkeys([['mod+J', () => toggleColorScheme()]]);


	return (
		<ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
			<MantineProvider
				withNormalizeCSS withGlobalStyles
				theme={{ colorScheme: `${colorScheme}` }}>

				{/* <ModalsProvider>
						<Spotlight> */}
				<Board webs={UseWebs().getWebs()} />

				{/* </Spotlight>
					</ModalsProvider> */}
			</MantineProvider>
		</ColorSchemeProvider >


	)
}

export default App
