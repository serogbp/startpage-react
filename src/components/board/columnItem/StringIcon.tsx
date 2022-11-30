import { Avatar, Text, MantineNumberSize, useMantineTheme } from "@mantine/core"
import { useSettings } from "../../../hooks/UseSettings"
import { WebStringIcon } from "../../../Types"

export default function Favicon(props: WebStringIcon) {
	const settings = useSettings()

	let avatarSize: MantineNumberSize = 'sm'
	switch (settings.webFaviconSize) {
		case 64:
			avatarSize = 'lg'
			break;
		case 32:
			avatarSize = 'md'
			break;
		case 16:
			avatarSize = 'sm'
			break;
	}

	return (
		<Avatar
			src={null}
			size={avatarSize}
			color={props.backgroundColor}
			variant="filled">
			<Text sx={{color: props.textColor}}>
				{props.text}
			</Text>
		</Avatar>
	)
}
