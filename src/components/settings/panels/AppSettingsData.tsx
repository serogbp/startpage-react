import { Button, Checkbox, Text, useMantineTheme, Group } from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import { useState } from "react";
import { Download, Upload, X } from "tabler-icons-react";
import { useBoard } from "../../../hooks/useBoard/UseBoard";
import { useSettings } from "../../../hooks/UseSettings";
import { DeleteButtonTooltip } from "../../form/DeleteButtonToolTip";
import MyDivider from "../common/MyDivider";
import MyPanel from "../common/MyPanel";


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
			<Button leftIcon={<Download />} onClick={() => handleClick()}>
				Export webs
			</Button>
			<Text size="xs" color="dimmed">Export your webs in .json format</Text>
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
			board.web.removeAll()
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
			>
				<Group position="center" style={{ pointerEvents: 'none' }}>
					<Dropzone.Accept>
						<Upload
							size={24}
							color={theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]}
						/>
					</Dropzone.Accept>
					<Dropzone.Reject>
						<X
							size={24}
							color={theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]}
						/>
					</Dropzone.Reject>
					<Dropzone.Idle>
						<Upload size={24} />
					</Dropzone.Idle>

					<div>
						<Text size="sm">
							Drag or click to select a file
						</Text>
						<Text size="xs" color="dimmed">Compatible with exported .json files</Text>
					</div>

				</Group>
			</Dropzone>

			<Checkbox label="Keep your current webs" checked={settings.keepWebsWhenImport} onChange={(event) => settings.setKeepWebsWhenImport(event.currentTarget.checked)} />
			<Text size="xs" color="dimmed">{settings.keepWebsWhenImport ? "Your webs will not be deleted" : "Your webs will be replaced with the imported ones"}</Text>

		</MyPanel>
	)
}


const DeleteAll = () => {
	const board = useBoard()
	return (
		<MyPanel title="Danger zone" danger={true}>
			<DeleteButtonTooltip clicksRemaining={2} handleDelete={() => board.web.removeAll()} text={"Delete all webs"} variant={"filled"}/>
			<Text size="xs" color="dimmed">This action cannot be undone</Text>
		</MyPanel>
	)
}
