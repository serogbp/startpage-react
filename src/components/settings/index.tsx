import { Checkbox, Select, Tabs, Text } from "@mantine/core"
import { Database, MessageCircle, Photo, Settings } from "tabler-icons-react"
import UseSettings from "../../hooks/UseSettings"
import AppSettingsAppearance from "./AppSettingsAppearance"


// export default function ModalSettings({ context, id, innerProps }: ContextModalProps<{ props: Props }>) {
export default function AppSettings() {
	const useSettings = UseSettings()

	return (
		<Tabs orientation="vertical" defaultValue={"appearance"}>
			<Tabs.List grow>
				<Tabs.Tab value="appearance" icon={<Photo size={16} />}>Appearance</Tabs.Tab>
				<Tabs.Tab value="data" icon={<Database size={16} />}>Data</Tabs.Tab>
				<Tabs.Tab value="settings" icon={<Settings size={16} />}>Settings</Tabs.Tab>
			</Tabs.List>

			<Tabs.Panel value="appearance" pl="xl">
				<AppSettingsAppearance useSettings={useSettings}/>
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
