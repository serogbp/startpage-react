import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
	boardContainer: {
		flexWrap: "nowrap",
		height: "100%",
		minWidth: "100vw",
	},
	board: {
		flexWrap: "nowrap",
		height: "100%",
	},
	boardPadding: {
		padding: theme.spacing.xs,
	},

	columnTitle: {
		textAlign: "center",
		margin: 0,
		padding: "1em"
	},
	columnTitle_Container: {
		'&hover': {
			backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[2],
		}
	},
	columnTitle_Settings: {
		position: "absolute",
		top: 0,
		right: 0,
		padding: "1em",
	},
	columnFooter_Button: {
		paddingTop: theme.spacing.lg,
		paddingBottom: theme.spacing.lg,
		height: "auto",
		border: 0,
	},




	columnItemList: {
		marginLeft: ".5em",
		marginRight: ".5em",
	},

	wordBreak: {
		wordBreak: "break-all"
	},
}))
