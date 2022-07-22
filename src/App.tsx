import { AppShell, useMantineTheme } from '@mantine/core'
import './App.css'
import { Board } from './components/board'


function App() {
	const theme = useMantineTheme();

	return (
		<AppShell
		fixed
			styles={{
				main: {
					background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
					minWidth: "100vw"
				},
			}}
		>
			<Board />
		</AppShell>
	)
}

export default App
