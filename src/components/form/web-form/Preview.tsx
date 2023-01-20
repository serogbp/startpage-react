import { Box, Overlay, Text } from "@mantine/core"
import { Web } from "../../../Types"
import ColumnItem from "../../board/columnItem/ColumnItem"

interface Props {
	web: Web
}

export default function Preview(props: Props) {
	const { web } = props
	return (
		<>
			<Text mt='xl'>Preview</Text>
			<Box sx={{ height: '100px', position: 'relative' }}>
				<Overlay opacity={0.1} />
				<ColumnItem web={web} category={""} />
			</Box>
		</>
	)
}
