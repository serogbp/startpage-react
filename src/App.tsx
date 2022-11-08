import { ModalsProvider } from '@mantine/modals';
import './App.css'
import { Board } from './components/board'
import EmptyState from './components/EmptyState';
import CategoryModal from './components/modals/CategoryModal';
import ModalSettings from './components/modals/ModalSettings';
import WebModal from './components/modals/WebModal';
import { Spotlight } from './components/spotlight/Spotlight';
import StyleProvider from './components/StyleProvider';
import { BoardProvider, useBoard } from './hooks/useBoard/UseBoard';
import { SettingsProvider, useSettings } from './hooks/UseSettings';
import { AppShell, useMantineTheme } from '@mantine/core';
import { NavbarMinimal } from './components/navbar/Navbar';



function App() {
	return (
		<SettingsProvider>
			<BoardProvider>
				<StyleProvider>
					<ModalsProvider modals={{ webForm: WebModal, categoryForm: CategoryModal, settings: ModalSettings }}>
						<Spotlight>
							<MainContent />
						</Spotlight>
					</ModalsProvider>
				</StyleProvider>
			</BoardProvider>
		</SettingsProvider>
	)
}

export default App


function MainContent() {
	const board = useBoard()
	const settings = useSettings()

	const hasWebs = Object.keys(board.state.webs).length > 0
	const hasCategories = board.state.categoryOrder.length > 0 && !settings.hideEmptyColumns
	return (
		<AppShell
			padding={0}
			navbar={<NavbarMinimal />}
			styles={(theme) => ({
				root: {
					height: "100vh",
					width: "100vw"
				},
				body: {
					height: "100%",
					width: "100%"
				},
				main: {
					backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
					width: "auto",
					height: "100%",
					minHeight: 0
				},
			})}
		>
			{(hasWebs || hasCategories) ? <Board /> : <EmptyState />}
		</AppShell>
	)
}
