import { Group, Stack, Text } from "@mantine/core"

interface Props {
	title: string,
	children: JSX.Element | JSX.Element[]
	danger?: boolean
}

export default function MyPanel(props: Props) {
	if (props.danger) return <DangerPanel props={props} />
	else return <DefaultPanel props={props}/>
}


const DefaultPanel = (props: {props:Props}) => {
	return (
		<Group grow spacing="xs" position="apart" align="top" >
			<Text style={{flexGrow:0}}>{props.props.title}</Text>
			<Stack style={{flexGrow:1}}>
				{props.props.children}
			</Stack>
		</Group>
	)
}


const DangerPanel = (props: {props:Props}) => {
	return (
		<Group grow spacing="xs" position="apart" align="top" >
			<Text color="red">{props.props.title}</Text>
			<Stack>
				{props.props.children}
			</Stack>
		</Group>
	)
}
