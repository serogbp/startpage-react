import { Card, createStyles, Stack, Text } from "@mantine/core";
import { memo, useState } from "react";
import { Web } from "../../Types";
import { sleep } from "../../utils/utils";


interface Props {
	web: Web
}

const useStyles = createStyles((theme) => ({
	card: {
		backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
		padding: theme.spacing.md,
		width: "auto",
		minHeight: 100,
		marginBottom: 8,

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
	const [hover, setHover] = useState(false)
	const { classes } = useStyles()

	const handleClick = () => {
		// Abrir enlace
		const link = document.createElement('a');
		link.target = '_blank';
		link.href = props.web.id;
		link.rel = "noopener noreferrer nofollow";
		link.click()

		// TODO update stats
	}

	return (
		<Card
			withBorder radius="sm" className={classes.card}
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
			onClick={() => handleClick()}
		>
			<Card.Section>
				<Stack spacing="sm" p="sm">
					<Text weight={500}>
						{props.web.name}
					</Text>
					url: {props.web.id}
				</Stack>
			</Card.Section>
		</Card>
	)
})


export default ColumnItem
