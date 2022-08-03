import { createStyles, Text, UnstyledButton, useMantineTheme } from "@mantine/core"

const useStyles = createStyles((theme) => ({
	button: {
		marginTop: theme.spacing.sm,
		paddingTop: theme.spacing.md,
		paddingBottom: theme.spacing.md,
		textAlign: "center",
		borderRadius: theme.radius.sm,
		"&:hover": {
			backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2],
		}
	}
}))


const AddWebButton = () => {
	const { classes } = useStyles()
	const theme = useMantineTheme()

	return(
		<UnstyledButton className={classes.button}>
			<Text color={theme.colors.gray[7]}>
				Add a web
			</Text>
		</UnstyledButton>
	)
}

export default AddWebButton
