import { Button, Text, useMantineTheme, Group, Alert } from "@mantine/core"
import { Dropzone } from "@mantine/dropzone"
import { useState } from "react"
import { IconAlertTriangle, IconDownload, IconUpload, IconX } from "@tabler/icons"
import { useBoard } from "../../../hooks/useBoard/UseBoard"
import { useSettings } from "../../../hooks/UseSettings"
import { DeleteButtonTooltip } from "../../form/DeleteButtonToolTip"
import MyDivider from "../common/MyDivider"
import MyPanel from "../common/MyPanel"


export default function AppSettingsData() {
	return (
		<>
			<Export />
			<MyDivider />
			<Import />
			<MyDivider />
			<DeleteAll />
		</>
	)
}


const Export = () => {
	const board = useBoard()
	const theme = useMantineTheme()

	const handleClick = () => {
		board.json.exportFile()
	}
	return (
		<MyPanel title={"Export"}>
			{/* <Select value={"japan"} label="Format"
				data={[
					{ value: "0", label: 'yyyy-mm-dd.json' },
					{ value: "1", label: 'yyyy-mm-dd-startpage.json' },
				]}
			/> */}
			<Button leftIcon={<IconDownload />} onClick={() => handleClick()}>
				Export webs
			</Button>
			<Text size="xs" color="dimmed">Export your webs in .json format</Text>
			<Alert color="yellow" icon={<IconAlertTriangle color={theme.colors.yellow[6]} />} title="Make frequent backups">
				The webs are saved in the localStorage of the browser. It is very easy to lose data in this type of storage (e.g. by clearing the browser cache). So it is advisable to make frequent backups.
			</Alert>
		</MyPanel>
	)
}


const Import = () => {
	const board = useBoard()
	const theme = useMantineTheme()
	const settings = useSettings()
	const [loading, setLoading] = useState(false)

	const handleDrop = (files: File[]) => {
		setLoading(true)
		if (!settings.keepWebsWhenImport)
			board.defaultState()
		board.json.importFile(files[0])
			.then(() => setLoading(false))
	}

	return (
		<MyPanel title={"Import"}>
			<Dropzone
				loading={loading}
				onDrop={(files) => handleDrop(files)}
				onReject={(files) => console.log('rejected files', files)}
				accept={["application/json"]}
				sx={(theme) => ({
					borderColor: settings.accentColor.value
				})}
			>
				<Group position="center" style={{ pointerEvents: 'none' }}>
					<Dropzone.Accept>
						<IconUpload
							size={24}
							color={theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]}
						/>
					</Dropzone.Accept>
					<Dropzone.Reject>
						<IconX
							size={24}
							color={theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]}
						/>
					</Dropzone.Reject>
					<Dropzone.Idle>
						<IconUpload size={24} />
					</Dropzone.Idle>

					<div>
						<Text size="sm">
							Drag or click to select a file
						</Text>
						<Text size="xs" color="dimmed">Compatible with exported .json files</Text>
					</div>

				</Group>
			</Dropzone>
			{/* TODO decidir que hacer con esto */}
			{/* <Checkbox label="Keep your current webs" checked={settings.keepWebsWhenImport} onChange={(event) => settings.setKeepWebsWhenImport(event.currentTarget.checked)} /> */}
			<Text size="xs" color="dimmed">{settings.keepWebsWhenImport ? "Your saved webs will not be deleted" : "Your saved webs will be replaced with the imported ones"}</Text>
		</MyPanel>
	)
}


const DeleteAll = () => {
	const board = useBoard()

	const handleClick = () => {
		board.defaultState()
	}

	return (
		<MyPanel title="Danger zone" danger={true}>
			<DeleteButtonTooltip clicksRemaining={2} handleDelete={handleClick} text={"Delete all webs and categories"} variant={"filled"} />
			<Text size="xs" color="dimmed">This action cannot be undone</Text>
		</MyPanel>
	)
}
