import { Tabs } from "@mantine/core"
import { Database, Photo, Settings } from "tabler-icons-react"
import AppSettingsAppearance from "./AppSettingsAppearance"


export default function AppSettings() {
	return (
		<Tabs orientation="vertical" defaultValue={"appearance"}>
			<Tabs.List>
				<Tabs.Tab value="appearance" icon={<Photo size={16} />}>Appearance</Tabs.Tab>
				<Tabs.Tab value="data" icon={<Database size={16} />}>Data</Tabs.Tab>
				<Tabs.Tab value="settings" icon={<Settings size={16} />}>Settings</Tabs.Tab>
			</Tabs.List>

			<Tabs.Panel value="appearance" pl="xl">
				<AppSettingsAppearance />
			</Tabs.Panel>

			<Tabs.Panel value="data" pl="xl">
				Opciones de los datos
			</Tabs.Panel>

			<Tabs.Panel value="settings" pl="xl">
				Settings tab content
			</Tabs.Panel>
		</Tabs>
	)
}
