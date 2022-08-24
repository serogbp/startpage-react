import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core'
import { useColorScheme, useHotkeys, useLocalStorage } from '@mantine/hooks';
import { ModalsProvider } from '@mantine/modals';
import { useEffect, useState } from 'react';
import signalJs from 'signal-js';
import './App.css'
import { Board } from './components/board'
import ModalSettings from './components/modals/ModalSettings';
import WebModal from './components/modals/WebModal';
import { Spotlight } from './components/Spotlight';
import StyleProvider from './components/StyleProvider';
import { SettingsProvider } from './hooks/UseSettings';



function App() {
	return (
		<SettingsProvider>
			<StyleProvider>
				<ModalsProvider modals={{ webForm: WebModal, settings: ModalSettings }}>
					<Spotlight>
						<Board />
					</Spotlight>
				</ModalsProvider>
			</StyleProvider>
		</SettingsProvider>
	)
}

export default App
