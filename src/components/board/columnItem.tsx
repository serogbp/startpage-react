import { Card, createStyles, Stack, Text } from "@mantine/core";
import { memo, useState } from "react";
import { Web } from "../../Types";


interface Props {
	web: Web
}

const useStyles = createStyles((theme) => ({
	card: {
		backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
		padding: theme.spacing.md,
		width: 200,
		// height: 100,

		'&:hover': {
			backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2],
		},
	},

	body: {
		padding: theme.spacing.md,
	},

	name: {
		overflow: "hidden",
		whiteSpace: "normal",

	},

	url: {
		overflow: "hidden",
		whiteSpace: "nowrap",
		textOverflow: "ellipsis"
	},

	settings: {
		position: "absolute",
		top: 0,
		right: 0,
		padding: 8
	},
}));


const ColumnItem = memo((props: Props) => {
	const [web, setWeb] = useState<Web>(props.web)
	const [hover, setHover] = useState(false)
	const { classes } = useStyles()

	return (
		<Card
			withBorder radius="sm" className={classes.card}
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
		>
			<Card.Section>
				<Stack spacing="sm" p="sm">
					<Text weight={500}>
						{web.name}
					</Text>
					url: {web.id}
				</Stack>
			</Card.Section>
		</Card>
	)
})


export default ColumnItem
