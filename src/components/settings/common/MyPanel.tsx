import { Group, Stack, Text } from "@mantine/core"

interface Props {
	title: string,
	children: JSX.Element | JSX.Element[]
}

export default function MyPanel(props: Props) {
	return (
		<Group position="apart" align="top">
			<Text>{props.title}</Text>
			<Stack>
				{props.children}
			</Stack>
		</Group>
	)
}
