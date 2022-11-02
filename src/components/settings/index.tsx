import { Tabs, ScrollArea } from "@mantine/core"
import { Database, Help, Keyboard, Photo} from "tabler-icons-react"
import AppSettingsAbout from "./panels/AppSettingsAbout"
import AppSettingsAppearance from "./panels/AppSettingsAppearance"
import AppSettingsData from "./panels/AppSettingsData"
import AppSettingsKeyboardShortcuts from "./panels/AppSettingsKeyboardShortcuts"

export default function AppSettings() {
	return (
		<Tabs orientation="vertical" defaultValue={"appearance"}>
			<Tabs.List>
				<Tabs.Tab value="appearance" icon={<Photo size={16} />}>Appearance</Tabs.Tab>
				<Tabs.Tab value="data" icon={<Database size={16} />}>Data</Tabs.Tab>
				<Tabs.Tab value="shortcuts" icon={<Keyboard size={16} />}>Keyboard shortcuts</Tabs.Tab>
				<Tabs.Tab value="about" icon={<Help size={16} />}>About</Tabs.Tab>
			</Tabs.List>

			<Tabs.Panel value="appearance">
				<SameHeightPanel>
					<AppSettingsAppearance />
				</SameHeightPanel>
			</Tabs.Panel>

			<Tabs.Panel value="data">
				<SameHeightPanel>
					<AppSettingsData />
				</SameHeightPanel>
			</Tabs.Panel>

			<Tabs.Panel value="shortcuts">
				<SameHeightPanel>
					<AppSettingsKeyboardShortcuts />
				</SameHeightPanel>
			</Tabs.Panel>

			<Tabs.Panel value="about">
				<SameHeightPanel>
					<AppSettingsAbout />
				</SameHeightPanel>
			</Tabs.Panel>
		</Tabs>
	)
}

const SameHeightPanel = ({children}: {children: JSX.Element | JSX.Element[] | string}) => {
	return(
		<ScrollArea style={{ padding:"0 1em", height:'80vh'}}>
			{children}
		</ScrollArea>
	)
}
