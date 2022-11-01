import { Group, Text, createStyles } from "@mantine/core"
import { useSettings } from "../../hooks/UseSettings"
import { Web } from "../../Types"

interface Props {
	web: Web
}

const useStyles = createStyles((theme, getRef) => ({
	tags: {
		overflow: "hidden",
		whiteSpace: "nowrap",
		textOverflow: "ellipsis",
	},
}))

export default function Tags(props: Props) {
	const { web } = props
	const settings = useSettings()
	const { classes } = useStyles()

	if (web.tags.length === 0) return <></>
	else return (
		<Group spacing='xs' p='xs' style={{paddingBottom:0}}>
			{
				web.tags.map((tag: string) =>
					<Text key={tag} size="xs" color={settings.accentColor.value} className={classes.tags}>
						{"#" + tag}
					</Text>
				)
			}
		</Group>
	)
}
