import { Tabs } from "@mantine/core"
import { Database, Photo, Settings } from "tabler-icons-react"
import AppSettingsAppearance from "./panels/AppSettingsAppearance"
import AppSettingsData from "./panels/AppSettingsData"


export default function AppSettings() {
	return (
		<Tabs orientation="vertical" defaultValue={"appearance"}>
			<Tabs.List>
				<Tabs.Tab value="appearance" icon={<Photo size={16} />}>Appearance</Tabs.Tab>
				<Tabs.Tab value="data" icon={<Database size={16} />}>Data</Tabs.Tab>
				<Tabs.Tab value="settings" icon={<Settings size={16} />}>Settings</Tabs.Tab>
			</Tabs.List>

			<Tabs.Panel value="appearance" pl="xl">
				<SameHeightPanel>
					<AppSettingsAppearance />
				</SameHeightPanel>
			</Tabs.Panel>

			<Tabs.Panel value="data" pl="xl">
				<SameHeightPanel>
					<AppSettingsData />
				</SameHeightPanel>
			</Tabs.Panel>

			<Tabs.Panel value="settings" pl="xl">
				<SameHeightPanel>
					Settings tab content
				</SameHeightPanel>
			</Tabs.Panel>
		</Tabs>
	)
}

const SameHeightPanel = ({children}: {children: JSX.Element | JSX.Element[] | string}) => {
	return(
		<div style={{minHeight:500}}>
			{children}
		</div>
	)
}
