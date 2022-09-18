import { Tabs, ScrollArea } from "@mantine/core"
import { Database, Photo } from "tabler-icons-react"
import AppSettingsAppearance from "./panels/AppSettingsAppearance"
import AppSettingsData from "./panels/AppSettingsData"


export default function AppSettings() {
	return (
		<Tabs orientation="vertical" defaultValue={"appearance"}  >
			<Tabs.List>
				<Tabs.Tab value="appearance" icon={<Photo size={16} />}>Appearance</Tabs.Tab>
				<Tabs.Tab value="data" icon={<Database size={16} />}>Data</Tabs.Tab>
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

		</Tabs>
	)
}

const SameHeightPanel = ({children}: {children: JSX.Element | JSX.Element[] | string}) => {
	return(
		<ScrollArea style={{ padding:"0 1em", minHeight:640}}>
			{children}
		</ScrollArea>
	)
}
